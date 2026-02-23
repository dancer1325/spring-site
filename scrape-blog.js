#!/usr/bin/env node

/**
 * Script to scrape spring.io blog posts and convert to markdown
 * Usage: node scrape-blog.js
 *
 * Features:
 * - Incremental scraping (processes posts immediately)
 * - Skips already scraped posts (resume capability)
 * - Restarts browser every 10 pages to prevent memory issues
 * - Robust error handling and retries
 *
 * Requirements:
 *   npm install puppeteer turndown
 */

const puppeteer = require('puppeteer');
const TurndownService = require('turndown');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const BASE_URL = 'https://spring.io';
const BLOG_URL = 'https://spring.io/blog';
const OUTPUT_DIR = path.join(__dirname, 'sagan-site/src/main/resources/templates/blog/posts');
const DELAY_MS = 2000;
const TIMEOUT = 60000;
const MAX_PAGES = 598;
const RESTART_BROWSER_EVERY = 10; // Restart browser every N pages

const visitedUrls = new Set();

// Configure Turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  hr: '---',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  preformattedCode: true,
});

// Ensure output directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDir(OUTPUT_DIR);

/**
 * Convert blog post URL to file path
 */
function blogUrlToFilepath(url) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(p => p);

  if (pathParts[0] === 'blog') {
    pathParts.shift();
  }

  const filename = pathParts.join('-') + '.md';
  return path.join(OUTPUT_DIR, filename);
}

/**
 * Check if a blog post file already exists
 */
function blogPostExists(url) {
  const filepath = blogUrlToFilepath(url);
  return fs.existsSync(filepath);
}

/**
 * Extract blog post links from a blog listing page
 */
async function extractBlogPostLinks(page) {
  return await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/blog/20"]'))
      .map(a => a.href)
      .filter(href => {
        return /\/blog\/\d{4}\/\d{2}\/\d{2}\//.test(href);
      })
      .map(href => href.split('#')[0].split('?')[0]);

    return [...new Set(links)];
  });
}

/**
 * Scrape a single blog post with retry logic
 */
async function scrapeBlogPost(browser, url, retries = 2) {
  // Skip if already scraped
  if (blogPostExists(url)) {
    console.log(`  [SKIP] Already exists: ${path.basename(blogUrlToFilepath(url))}`);
    return true;
  }

  if (visitedUrls.has(url)) {
    return true;
  }

  visitedUrls.add(url);
  console.log(`[${visitedUrls.size}] Scraping: ${url}`);

  let page;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      const response = await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded'],
        timeout: TIMEOUT,
      });

      if (!response.ok()) {
        console.log(`  ✗ HTTP ${response.status()}`);
        await page.close();
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        await page.waitForSelector('.blog-post, article', { timeout: 5000 });
      } catch {
        // Continue
      }

      const title = await page.title();

      const metadata = await page.evaluate(() => {
        const getMetaContent = (name) => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return meta ? meta.getAttribute('content') : '';
        };

        return {
          description: getMetaContent('description'),
          author: getMetaContent('author'),
          date: getMetaContent('article:published_time') || getMetaContent('date'),
        };
      });

      // Get blog post title and content
      const { html, postTitle, postMeta } = await page.evaluate(() => {
        const titleElement = document.querySelector('.blog-post h1');
        const postTitle = titleElement ? titleElement.textContent.trim() : '';

        const metaElement = document.querySelector('.blog-post .meta');
        const postMeta = metaElement ? metaElement.textContent.trim() : '';

        const markdownContent = document.querySelector('.markdown');

        return {
          html: markdownContent ? markdownContent.innerHTML : '',
          postTitle,
          postMeta,
        };
      });

      let markdown = turndownService.turndown(html);

      markdown = markdown
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^[\s\n]+/, '')
        .replace(/[\s\n]+$/, '\n');

      const timestamp = new Date().toISOString();
      const actualTitle = postTitle || title;
      let content = `---
title: ${actualTitle.replace(/'/g, "\\'")}
source: ${url}
scraped: ${timestamp}`;

      if (metadata.description) {
        content += `\ndescription: ${metadata.description.replace(/'/g, "\\'")}`;
      }
      if (postMeta) {
        content += `\nmeta: ${postMeta.replace(/'/g, "\\'")}`;
      }

      content += `\n---

# ${actualTitle}

${postMeta ? `_${postMeta}_\n\n` : ''}${markdown}`;

      const filepath = blogUrlToFilepath(url);
      fs.writeFileSync(filepath, content, 'utf8');

      console.log(`  ✓ Saved: ${path.basename(filepath)} (${content.length} chars)`);

      await page.close();
      return true;

    } catch (error) {
      attempt++;
      console.log(`  ✗ Attempt ${attempt} failed: ${error.message}`);

      try {
        if (page) await page.close();
      } catch {}

      if (attempt <= retries) {
        console.log(`  ↻ Retrying...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.log(`  ✗ Failed after ${retries + 1} attempts`);
        return false;
      }
    }
  }

  return false;
}

/**
 * Scrape all blog posts from paginated listing
 */
async function scrapeBlogListing(browser, pageNum = 1) {
  const url = pageNum === 1 ? BLOG_URL : `${BLOG_URL}/page-${pageNum}`;

  console.log(`\nFetching listing: ${url}`);

  let page;
  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const response = await page.goto(url, {
      waitUntil: ['load', 'domcontentloaded'],
      timeout: TIMEOUT,
    });

    if (!response.ok()) {
      console.log(`  ✗ HTTP ${response.status()}`);
      await page.close();
      return [];
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const postLinks = await extractBlogPostLinks(page);
    console.log(`  Found ${postLinks.length} posts`);

    await page.close();
    return postLinks;

  } catch (error) {
    console.log(`  ✗ Error: ${error.message}`);
    try {
      if (page) await page.close();
    } catch {}
    return [];
  }
}

/**
 * Launch a new browser instance
 */
async function launchBrowser() {
  return await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
  });
}

/**
 * Main function with incremental scraping and browser restart
 */
async function main() {
  console.log('Spring.io Blog Scraper');
  console.log('='.repeat(60));
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Max pages: ${MAX_PAGES}`);
  console.log(`Browser restart every: ${RESTART_BROWSER_EVERY} pages`);
  console.log(`Delay: ${DELAY_MS}ms\n`);

  let browser = await launchBrowser();
  let totalPostsScraped = 0;
  let totalPostsSkipped = 0;
  let totalPostsFailed = 0;

  try {
    for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Page ${pageNum}/${MAX_PAGES} | Scraped: ${totalPostsScraped} | Skipped: ${totalPostsSkipped} | Failed: ${totalPostsFailed}`);
      console.log(`${'='.repeat(60)}`);

      // Restart browser periodically
      if (pageNum > 1 && (pageNum - 1) % RESTART_BROWSER_EVERY === 0) {
        console.log(`\n♻️  Restarting browser...`);
        try {
          await browser.close();
        } catch {}
        await new Promise(resolve => setTimeout(resolve, 3000));
        browser = await launchBrowser();
        console.log(`✓ Browser restarted\n`);
      }

      // Get post links from this listing page
      const postLinks = await scrapeBlogListing(browser, pageNum);

      if (postLinks.length === 0) {
        console.log(`\nNo posts found, stopping.`);
        break;
      }

      // Scrape each post
      for (const postUrl of postLinks) {
        const result = await scrapeBlogPost(browser, postUrl);

        if (result === true && !blogPostExists(postUrl)) {
          totalPostsScraped++;
        } else if (blogPostExists(postUrl)) {
          totalPostsSkipped++;
        } else {
          totalPostsFailed++;
        }

        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }

      // Delay between listing pages
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✓ Complete!`);
    console.log(`  Scraped: ${totalPostsScraped} new posts`);
    console.log(`  Skipped: ${totalPostsSkipped} existing posts`);
    console.log(`  Failed: ${totalPostsFailed} posts`);
    console.log(`  Total files: ${totalPostsScraped + totalPostsSkipped}`);
    console.log(`  Saved to: ${OUTPUT_DIR}`);
    console.log(`${'='.repeat(60)}`);

  } catch (error) {
    console.log(`\n✗ Fatal error: ${error.message}`);
    console.log(`Scraped ${totalPostsScraped} posts before failure.`);
  } finally {
    try {
      await browser.close();
    } catch {}
  }
}

main().catch(console.error);
