#!/usr/bin/env node

/**
 * Script to scrape spring.io pages with JavaScript support using Puppeteer
 * Usage: node scrape-spring-io-puppeteer.js
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
const OUTPUT_DIR = '/spring-site/sagan-site/src/main/resources/templates/docsMirror';
const DELAY_MS = 2000; // Increased delay
const MAX_DEPTH = 2;
const TIMEOUT = 60000; // Increased timeout to 60s

// URLs to scrape
const INITIAL_URLS = [
  '/',
  '/projects',
  '/guides',
  '/quickstart',
  '/why-spring',
  '/learn',
  '/community',
];

const visitedUrls = new Set();
const urlQueue = [];

// Configure Turndown with better options
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  hr: '---',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  preformattedCode: true,
});

// Add custom rules for better conversion
turndownService.addRule('preserveDiv', {
  filter: ['div'],
  replacement: function(content) {
    return content + '\n\n';
  }
});

turndownService.addRule('preserveSpan', {
  filter: ['span'],
  replacement: function(content) {
    return content;
  }
});

turndownService.addRule('preserveSections', {
  filter: ['section', 'aside'],
  replacement: function(content) {
    return '\n\n' + content + '\n\n';
  }
});

// Keep images with alt text
turndownService.keep(['img']);

// Ensure output directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDir(OUTPUT_DIR);

/**
 * Convert URL to file path
 */
function urlToFilepath(url) {
  const urlObj = new URL(url);
  let filepath = urlObj.pathname.replace(/^\/|\/$/g, '');

  if (!filepath) {
    filepath = 'index';
  }

  const parts = filepath.split('/');
  const filename = parts.pop() || 'index';
  const dir = parts.length > 0 ? path.join(OUTPUT_DIR, ...parts) : OUTPUT_DIR;

  ensureDir(dir);

  return path.join(dir, `${filename}.md`);
}

/**
 * Extract links from page
 */
async function extractLinks(page, baseUrl) {
  const links = await page.evaluate((baseUrl) => {
    const baseDomain = new URL(baseUrl).hostname;
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.href)
      .filter(href => {
        if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
            href.startsWith('javascript:') || href.startsWith('tel:')) {
          return false;
        }
        try {
          const url = new URL(href);
          return url.hostname === baseDomain;
        } catch {
          return false;
        }
      })
      .map(href => href.split('#')[0].split('?')[0]);

    return [...new Set(links)];
  }, BASE_URL);

  return links;
}

/**
 * Process a single URL
 */
async function processUrl(browser, url, depth = 0) {
  if (visitedUrls.has(url) || depth > MAX_DEPTH) {
    return [];
  }

  visitedUrls.add(url);
  console.log(`[${visitedUrls.size}] Scraping: ${url} (depth: ${depth})`);

  const page = await browser.newPage();

  try {
    // Set viewport for better rendering
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to page with multiple wait strategies
    const response = await page.goto(url, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      timeout: TIMEOUT,
    });

    if (!response.ok()) {
      console.log(`  ✗ HTTP ${response.status()}`);
      await page.close();
      return [];
    }

    // Additional wait for JavaScript to execute
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Scroll to load lazy content
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Wait for content to load after scrolling
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Wait for main content
    try {
      await page.waitForSelector('main, article, .content', { timeout: 5000 });
    } catch {
      // Continue even if selector not found
    }

    // Get page title
    const title = await page.title();

    // Get main content HTML - IMPROVED VERSION
    const html = await page.evaluate(() => {
      // Remove unwanted elements first (from entire document)
      const unwantedGlobal = document.querySelectorAll(
        'nav, header, footer, .nav, .navigation, .header, .footer, ' +
        '.sidebar, .side-bar, script, style, noscript, ' +
        '.cookie-banner, .cookie-consent, .advertisement, .ad, ' +
        '.social-share, .comments, iframe, ' +
        '[role="navigation"], [role="banner"], [role="complementary"]'
      );
      unwantedGlobal.forEach(el => el.remove());

      // Try multiple selectors in order of preference
      const selectors = [
        'main',
        '[role="main"]',
        'article',
        '.main-content',
        '#main-content',
        '.content',
        '#content',
        'body'
      ];

      let content = null;
      for (const selector of selectors) {
        content = document.querySelector(selector);
        if (content && content.textContent.trim().length > 100) {
          break;
        }
      }

      if (!content) {
        content = document.body;
      }

      // Clone to avoid modifying the original
      const contentClone = content.cloneNode(true);

      // Additional cleanup on cloned content
      const unwanted = contentClone.querySelectorAll(
        'button, .button, .btn, ' +
        '.skip-link, .sr-only, .visually-hidden, ' +
        'svg.hidden, .icon-only'
      );
      unwanted.forEach(el => {
        // Keep buttons with meaningful text
        if (el.tagName === 'BUTTON' && el.textContent.trim().length > 2) {
          return;
        }
        el.remove();
      });

      return contentClone.innerHTML;
    });

    // Convert to markdown
    let markdown = turndownService.turndown(html);

    // Clean up markdown - remove excessive blank lines
    markdown = markdown
      .replace(/\n{3,}/g, '\n\n')  // Max 2 consecutive newlines
      .replace(/^[\s\n]+/, '')      // Remove leading whitespace
      .replace(/[\s\n]+$/, '\n');   // Clean trailing, keep one newline

    // Get additional metadata
    const description = await page.evaluate(() => {
      const metaDesc = document.querySelector('meta[name="description"]');
      return metaDesc ? metaDesc.getAttribute('content') : '';
    });

    const keywords = await page.evaluate(() => {
      const metaKeys = document.querySelector('meta[name="keywords"]');
      return metaKeys ? metaKeys.getAttribute('content') : '';
    });

    // Add comprehensive metadata
    const timestamp = new Date().toISOString();
    let content = `---
title: ${title.replace(/'/g, "\\'")}
source: ${url}
scraped: ${timestamp}`;

    if (description) {
      content += `\ndescription: ${description.replace(/'/g, "\\'")}`;
    }
    if (keywords) {
      content += `\nkeywords: ${keywords}`;
    }

    content += `\n---

${markdown}`;

    // Save to file
    const filepath = urlToFilepath(url);
    fs.writeFileSync(filepath, content, 'utf8');

    const lines = content.split('\n').length;
    const words = content.split(/\s+/).length;
    console.log(`  ✓ Saved: ${filepath}`);
    console.log(`    Content: ${content.length} chars, ${lines} lines, ${words} words`);

    // Extract links for next depth
    let newLinks = [];
    if (depth < MAX_DEPTH) {
      const links = await extractLinks(page, url);
      newLinks = links
        .filter(link => !visitedUrls.has(link))
        .map(link => ({ url: link, depth: depth + 1 }));
    }

    await page.close();
    return newLinks;

  } catch (error) {
    console.log(`  ✗ Error: ${error.message}`);
    await page.close();
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Spring.io Markdown Scraper (with Puppeteer)');
  console.log('='.repeat(60));
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Max depth: ${MAX_DEPTH}`);
  console.log(`Delay: ${DELAY_MS}ms\n`);

  // Launch browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Initialize queue
    for (const urlPath of INITIAL_URLS) {
      urlQueue.push({ url: BASE_URL + urlPath, depth: 0 });
    }

    // Process queue
    while (urlQueue.length > 0) {
      const { url, depth } = urlQueue.shift();

      if (visitedUrls.has(url)) {
        continue;
      }

      const newLinks = await processUrl(browser, url, depth);
      urlQueue.push(...newLinks);

      // Delay between requests
      if (urlQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }

    console.log(`\n✓ Complete! Scraped ${visitedUrls.size} pages.`);
    console.log(`Files saved to: ${OUTPUT_DIR}`);

  } finally {
    await browser.close();
  }
}

// Run
main().catch(console.error);
