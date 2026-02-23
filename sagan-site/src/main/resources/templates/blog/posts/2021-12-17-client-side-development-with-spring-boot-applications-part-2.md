---
title: Client Side Development with Spring Boot Applications - Part 2
source: https://spring.io/blog/2021/12/17/client-side-development-with-spring-boot-applications-part-2
scraped: 2026-02-23T13:00:18.554Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  December 17, 2021 | 5 Comments
---

# Client Side Development with Spring Boot Applications - Part 2

_Engineering | Dave Syer |  December 17, 2021 | 5 Comments_

[Part 1](/2021/12/17/client-side-development-with-spring-boot-applications)

## [](#plain-javascript-with-sse-stream)Plain Javascript with SSE Stream

Vue isn’t really adding a lot of value in this simple HTML replacement use case, and it would add no value at all to the SSE example, so we will go ahead and implement that in vanilla Javascript. Here’s a stream tab:

```
Copy<div class="tab-pane fade" id="stream" role="tabpanel">
	<div class="container">
		<div id="load"></div>
	</div>
</div>
```

and some Javascript to populate it:

```
Copy<script type="module">
	var events = new EventSource("/stream");
	events.onmessage = e => {
		document.getElementById("load").innerHTML = e.data;
	}
</script>
```

## [](#dynamic-content-with-react)Dynamic Content with React

Most people who use React probably do more than just a bit of logic and end up with all of the layout and rendering in Javascript. You don’t have to do that, and it’s quite easy to use just a bit of React to get a feel for it. You could leave it at that and use it as a utility library, or you could evolve to a full Javascript client-side component approach.

We can get started and try it out without changing too much. The sample code will end up looking like the `react-webjars` sample if you want to peek. First the dependencies in `pom.xml`:

```
Copy<dependency>
	<groupId>org.webjars.npm</groupId>
	<artifactId>react</artifactId>
	<version>17.0.2</version>
</dependency>
<dependency>
	<groupId>org.webjars.npm</groupId>
	<artifactId>react-dom</artifactId>
	<version>17.0.2</version>
</dependency>
```

and the module map in `index.html`:

```
Copy<script type="importmap">
	{
		"imports": {
			...
			"react": "/npm/react/umd/react.development.js",
			"react-dom": "/npm/react-dom/umd/react-dom.development.js"
		}
	}
</script>
```

React is not packaged as an ESM bundle (yet, anyway), so there is no "module" metadata and we have to hard code the resource paths like this. The "umd" in the resource path refers to "Universal Module Definition" which is an older attempt at modular Javascript. It’s close enough that if you squint you can use it in a similar way.

With those in place you can import the functions and objects they define:

```
Copy<script type="module">
	import * as React from 'react';
	import * as ReactDOM from 'react-dom';
</script>
```

Because they are not really ESM modules you can do this at the "global" level in a `<script/>` in the HTML `<head/>`, e.g. where we import `bootstrap`. Then you can define some content by creating a `React.Component`. Here’s a really basic static example:

```
Copy<script type="module">
	const e = React.createElement;
	class RootComponent extends React.Component {
		constructor(props) {
			super(props);
		}
		render() {
			return e(
				'h1',
				{},
				'Hello, world!'
			);
		}
	}
	ReactDOM.render(e(RootComponent), document.querySelector('#root'));
</script>
```

The `render()` method returns a function that creates a new DOM element (an `<h1/>` with content "Hello, world!"). It is attached by `ReactDOM` to an element with `id="root"`, so we’d better add one of those as well, for example in the "test" tab:

```
Copy<div class="tab-pane fade" id="test" role="tabpanel">
	<div class="container" id="root"></div>
</div>
```

If you run that it should work and it should say "Hello World" in that tab.

### [](#html-in-javascript-xjs)HTML in Javascript: XJS

Most React apps use HTML embedded in the Javascript via a templating language called "XJS" (which can be used in other ways but is actually part of React now). The hello world sample above looks like this:

```
Copy<script type="text/babel">
	class Hello extends React.Component {
		render() {
			return <h1>Hello, {this.props.name}!</h1>;
		}
	}
	ReactDOM.render(
		<Hello name="World"/>,
		document.getElementById('root')
	);
</script>
```

The component defines a custom element `<Hello/>` that match the class name of the component, and conventionally starts with a capital letter. The `<Hello/>` fragment is an XJS template, and the component also has a `render()` function that returns an XJS template. Braces are used for interpolation, and `props` is a map including all the attributes of the custom element (so "name" in this case). Finally there is that `<script type="text/babel">` which is needed to transpile the XJS into actual Javascript that the browser will understand. The script above will do nothing until the browser is taught to recognize this script. We do that by importing another module:

```
Copy<script type="importmap">
{
  "imports": {
    ...
    "react": "/npm/react/umd/react.development.js",
    "react-dom": "/npm/react-dom/umd/react-dom.development.js",
    "@babel/standalone": "/npm/@babel/standalone"
  }
}
</script>
<script type="module">
...
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@babel/standalone';
</script>
```

The React user guide advises against using `@babel/standalone` in a large application because it has to do a lot of work in the browser, and the same work can be done once at build time which is more efficient. But it’s good for trying stuff out, and for apps with small amounts of React code, like this one.

### [](#basic-event-and-user-input-handling)Basic Event and User Input Handling

We are now in a position where we can migrate the main "message" tab to React. So let’s modify the `Hello` component and attach it to a different element. The message tab can be stripped down to an empty element ready to accept the React content:

```
Copy<div class="tab-pane fade show active" id="message" role="tabpanel">
	<div class="container" id="hello"></div>
</div>
```

We can anticipate that we will need a second component to render the authenticated user name, so let’s start with this to attach some code to the element in the tab above:

```
CopyReactDOM.render(
	<div className="container" id="hello">
		<Auth/>
		<Hello/>
	</div>,
	document.getElementById('hello')
);
```

Then we can define the `Auth` component like this:

```
Copyclass Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: 'Unauthenticated' };
	};
	componentDidMount() {
		let hello = this;
		fetch("/user").then(response => {
			response.json().then(data => {
				hello.setState({user: `Logged in as: ${data.name}`});
			});
		});
	};
	render() {
		return <div id="auth">{this.state.user}</div>;
	}
};
```

The lifecycle callback in this case is `componentDidMount` which is called by React when the component is activated, so that’s where we put our initialization code.

The other component is the one that transfers the "name" input to a greeting:

```
Copyclass Hello extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '', message: '' };
		this.greet = this.greet.bind(this);
		this.change = this.change.bind(this);
	};
	greet() {
		this.setState({message: `Hello ${this.state.name}!`})
	}
	change(event) {
		console.log(event)
		this.setState({name: event.target.value})
	}
	render() {
		return <div>
			<div id="greeting">{this.state.message}</div>
			<input id="name" name="value" type="text" value={this.state.name} onChange={this.change}/>
			<button className="btn btn-primary" onClick={this.greet}>Greet</button>
		</div>;
	}
}
```

A `render()` method has to return a single element, so we have to wrap the content in a `<div>`. The other thing that is worth pointing out is that the transfer of state from the HTML to the Javascript is not automtatic - there’s no "two-way model" in React, and you have to add change listeners to inputs to explicitly update the state. Also we have to call `bind()` on all the component methods that we want to use as listeners (`greet` and `change` in this case).

### [](#chart-chooser)Chart Chooser

To migrate the rest of the Stimulus content to React we need to write a new chart chooser. So we can start with an empty "chart" tab:

```
Copy<div class="tab-pane fade" id="chart" role="tabpanel" data-controller="chart">
	<div class="container">
		<canvas id="canvas"></canvas>
	</div>
	<div class="container" id="chooser"></div>
</div>
```

and attach a `ReactDOM` element to the "chooser":

```
CopyReactDOM.render(
	<ChartChooser/>,
	document.getElementById('chooser')
);
```

`ChartChooser` is a list of buttons encapsulated in a component:

```
Copyclass ChartChooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.clear = this.clear.bind(this);
		this.bar = this.bar.bind(this);
	};
	bar() {
		let chart = this;
		this.clear();
		fetch("/pops").then(response => {
			response.json().then(data => {
				data.type = "bar";
				chart.setState({ active: new Chart(document.getElementById("canvas"), data) });
			});
		});
	};
	clear() {
		if (this.state.active) {
			this.state.active.destroy();
		}
	};
	render() {
		return <div>
			<button className="btn btn-primary" onClick={this.clear}>Clear</button>
			<button className="btn btn-primary" onClick={this.bar}>Bar</button>
		</div>;
	}
}
```

We also need the chart module setup from the Vue sample (it won’t work in a `<script type="text/babel">`):

```
Copy<script type="module">
	import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title, Legend } from 'chart.js';
	Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, Legend);
	window.Chart = Chart;
</script>
```

Chart.js isn’t shipped in a form you can import into a Babel script. We import it in a separate module, and `Chart` has to be defined as a global so we can still use it in our React component.

### [](#server-side-fragments)Server Side Fragments

To render the "test" tab with React we can start with the tab itself, empty again to accept content from React:

```
Copy<div class="tab-pane fade" id="test" role="tabpanel">
	<div class="container" id="root"></div>
</div>
```

with a binding to the "root" element in React:

```
CopyReactDOM.render(
	<Content />,
	document.getElementById('root')
);
```

Then we can implement the `<Content/>` as a component that fetches HTML from the `/test` endpoint:

```
Copyclass Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { html: '' };
		this.fetch = this.fetch.bind(this);
	};
	fetch() {
		let hello = this;
		fetch("/test").then(response => {
			response.text().then(data => {
				hello.setState({ html: data });
			});
		});
	}
	render() {
		return <div>
			<div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
			<button className="btn btn-primary" onClick={this.fetch}>Fetch</button>
		</div>;
	}
}
```

The `dangerouslySetInnerHTML` attribute is delibrately named by React to discourage people from using it with content that is collected directly from users (XSS issues). But we get that content from the server so we can put our trust in the XSS protection there and ignore the warning.

If we use that `<Content/>` component and the SSE loader from the sample above then we can get rid of Hotwired altogether from this sample.

## [](#building-and-bundling-with-nodejs)Building and Bundling with Node.js

Webjars are great, but sometimes you need something closer to the Javascript. One problem with Webjars for some people is the size of the jars - the Bootstrap jar is nearly 2MB, most of which will never be used at runtime - and Javascript tooling has a strong focus on reducing that overhead, by not packaging the whole NPM module in your app, and also by bundling assets together so they can be downloaded efficiently. There are also some issues with Java tooling - regarding [Sass](https://github.com/sass/dart-sass) in particular there is a lack of good tooling, as we found with the [Petclinic recently](https://github.com/spring-projects/spring-petclinic/pull/868). So maybe we should take a look at options for building with a Node.js toolchain.

The first thing you will need is Node.js. There are many ways of obtaining it, and you can use whatever tools you want. We will show how to do it with the [Frontend Plugin](https://github.com/eirslett/frontend-maven-plugin).

### [](#install-nodejs)Install Node.js

Let’s add the plugin to the `turbo` sample. (The final result is the `nodejs` sample if you want to peek) in `pom.xml`:

```
Copy<plugins>
	<plugin>
		<groupId>com.github.eirslett</groupId>
		<artifactId>frontend-maven-plugin</artifactId>
		<version>1.12.0</version>
		<executions>
			<execution>
				<id>install-node-and-npm</id>
				<goals>
					<goal>install-node-and-npm</goal>
				</goals>
				<configuration>
					<nodeVersion>v16.13.1</nodeVersion>
				</configuration>
			</execution>
			<execution>
				<id>npm-install</id>
				<goals>
					<goal>npm</goal>
				</goals>
				<configuration>
					<arguments>install</arguments>
				</configuration>
			</execution>
			<execution>
				<id>npm-build</id>
				<goals>
					<goal>npm</goal>
				</goals>
				<configuration>
					<arguments>run-script build</arguments>
				</configuration>
				<phase>generate-resources</phase>
			</execution>
		</executions>
	</plugin>
	...
</plugins>COPY
```

Here we have 3 executions: `install-node-and-npm` installs Node.js and NPM locally, `npm-install` runs `npm install` and `npm-build` runs a script to build the Javascript and possibly CSS. We will need a minimal `package.json` to run them all. If you have `npm` installed you could `npm init` to generate a new one, or just create it manually:

```
Copy$ cat > package.json
{
	"scripts": { "build": "echo Building"}
}
```

Then we can build

```
Copy$ ./mvnw generate-resources
```

You will see the result is a new directory:

```
Copy$ ls -d node*
node
```

It is useful to have an quick way to run `npm` from the command line, when it is installed locally like this. So once you have Node.js you can make it easy by creating a script locally:

```
Copy$ cat > npm
#!/bin/sh
cd $(dirname $0)
PATH="$PWD/node/":$PATH
node "node/node_modules/npm/bin/npm-cli.js" "$@"
```

Make it executable and try it out:

```
Copy$ chmod +x npm
$ ./npm install

up to date, audited 1 package in 211ms

found 0 vulnerabilities
```

### [](#adding-npm-packages)Adding NPM Packages

Now we are ready to build something, let’s set up `package.json` with all the dependencies that we had in Webjars until now:

```
Copy{
    "name": "js-demo",
    "version": "0.0.1",
    "dependencies": {
        "@hotwired/stimulus": "^3.0.1",
        "@hotwired/turbo": "^7.1.0",
        "@popperjs/core": "^2.10.1",
        "bootstrap": "^5.1.3",
        "chart.js": "^3.6.0",
        "@springio/utils": "^1.0.5",
        "es-module-shims": "^1.3.0"
    },
    "scripts": {
        "build": "echo Building"
    }
}
```

Running `./npm install` (or `./mvnw generate-resources`) will download those dependencies into `node_modules`:

```
Copy$ ./npm install

added 7 packages, and audited 8 packages in 8s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ ls node_modules/
@hotwired  @popperjs  @springio  bootstrap  chart.js  es-module-shims
```

It’s OK to add all the downloaded and generated code to your `.gitignore` (i.e. `node/`, `node_modules/`, and `package-lock.json`).

### [](#building-with-rollup)Building with Rollup

The Bootstrap maintainers use [Rollup](https://rollupjs.org/guide/en/) to bundle their code, so that seems like a decent choice. One thing it does really well is "tree shaking" to reduce the amount of Javscript you need to ship with your application. Feel free to experiment with other tools. To get started with Rollup we will need some development dependencies in `package.json` and a new build script:

```
Copy{
    ...
    "devDependencies": {
        "rollup": "^2.60.2",
        "rollup-plugin-node-resolve": "^2.0.0"
    },
    "scripts": {
        "build": "rollup -c"
    }
}
```

Rollup has its own config file, so here’s one that will bundle a local Javascript source into the app and serve the Javsacript up from `/index.js` at runtime. This is `rollup.config.js`:

```
Copyimport resolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/main/js/index.js',
	output: {
	  file: 'target/classes/static/index.js',
	  format: 'esm'
	},
	plugins: [
		resolve({
			esm: true,
			main: true,
			browser: true
		  })
	]
};
```

So if we move all the Javascript into `src/main/js/index.js` we would have just one `<script>` in `index.html`, for instance at the end of the `<body>`:

```
Copy<script type="module">
import '/index.js';
</script>
```

We will keep the CSS for now, and we can deal with a local build for that later. So in `index.js` we have all the `<script>` tag contents mushed together (or we could have split it up into modules and imported them):

```
Copyimport 'bootstrap';
import '@hotwired/turbo';
import '@springio/utils';
import { Application, Controller } from '@hotwired/stimulus';
import { Chart, BarController, BarElement, PieController, ArcElement, LinearScale, ategoryScale, Title, Legend } from 'chart.js';

Turbo.connectStreamSource(new EventSource("/stream"))
window.Stimulus = Application.start();

Chart.register(BarController, BarElement, PieController, ArcElement, LinearScale, CategoryScale, itle, Legend);

Stimulus.register("hello", class extends Controller {
	...
});

Stimulus.register("chart", class extends Controller {
	...
});
```

If we build and run the app it should all work, and Rollup creates a new `index.js` in `target/classes/static` where it will be picked up by the executable JAR. Because of the action of the "resolve" plugin in Rollup, the new `index.js` has all of the code that is needed to run our application. If any dependencies are packaged as a proper ESM bundle, Rollup will be able to shake the unused parts of them out. This works for Hotwired Stimulus at least, and most of the others get included wholesale, but the result is still only 750K (most of it Bootstrap):

```
Copy$ ls -l target/classes/static/index.js
-rw-r--r-- 1 dsyer dsyer 768778 Dec 14 09:34 target/classes/static/index.js
```

The browser has to download this once, which is an advantage when the server is HTTP 1.1 (HTTP 2 changes things a bit), and it means the executable JAR isn’t bloated with stuff that never gets used. There are other plugin options with Rollup to compress the Javascript, and we’ll see some of those in the next section.

### [](#building-css-with-sass)Building CSS with Sass

So far we have used plain CSS bundled in some NPM libraries. Most applications need their own stylesheets and developers prefer to work with some form of templating library and build time tooling to compile to CSS. The most prevalent such tool (but not the only one) is [Sass](https://www.npmjs.com/package/sass). Bootstrap uses it, and indeed packages its source files in the NPM bundle, so you can extend and adapt the Bootstrap styles to your own requirements.

We can see how that works by building the CSS for our application, even if we don’t do much customization. Start with some tooling dependencies in NPM:

```
Copy$ ./npm install --save-dev rollup-plugin-scss rollup-plugin-postcss sass
```

which leads to some new entries in `package.json`:

```
Copy{
    ...
    "devDependencies": {
        "rollup": "^2.60.2",
        "rollup-plugin-node-resolve": "^2.0.0",
        "rollup-plugin-postcss": "^0.2.0",
        "rollup-plugin-scss": "^3.0.0",
        "sass": "^1.44.0"
    },
    ...
}
```

This means we can update our `rollup.config.js` to use the new tools:

```
Copyimport resolve from "rollup-plugin-node-resolve";
import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main/js/index.js",
  output: {
    file: "target/classes/static/index.js",
    format: "esm",
  },
  plugins: [
    resolve({
      esm: true,
      main: true,
      browser: true,
    }),
    scss(),
    postcss(),
  ],
};
```

The CSS processors look in the same place as the main input file, so we can just create a `style.scss` in `src/main/js` and import the Bootstrap code:

```
Copy@import 'bootstrap/scss/bootstrap';
```

Customizations in SCSS would follow that if we were doing it for real. Then in `index.js` we add imports for this and the Spring utils library:

```
Copyimport './style.scss';
import '@springio/utils/style.css';
...
```

and re-build. This will lead to a new `index.css` being created (the same file name as the main input Javascript) which we can then link to in the `<head>` of `index.html`:

```
Copy<head>
	...
	<link rel="stylesheet" type="text/css" href="index.css" />
</head>COPY
```

That’s it. We have one `index.js` script driving all the Javascript and CSS for our Turbo sample, and we can now remove all remaining Webjars dependencies in the `pom.xml`.

## [](#bundling-a-react-app-with-nodejs)Bundling a React App with Node.js

To finish up we can apply the same ideas to the `react-webjars` sample, removing Webjars and extracting Javascript and CSS into separate source files. This way, we can also finally get rid of the slightly problematic `@babel/standalone`. We can start from the `react-webjars` sample and add the Frontend Plugin as above (or otherwise acquire Node.js), and create a `package.json` either manually or via the `npm` CLI. We will need the React dependencies, and also the build time tooling for Babel. Here’s what we end up with:

```
Copy{
    "name": "js-demo",
    "version": "0.0.1",
    "dependencies": {
        "@popperjs/core": "^2.10.1",
        "@springio/utils": "^1.0.4",
        "bootstrap": "^5.1.3",
        "chart.js": "^3.6.0",
        "react": "^17.0.2",
        "react-dom": "^17.0.2"
    },
    "devDependencies": {
        "@babel/core": "^7.16.0",
        "@babel/preset-env": "^7.16.0",
        "@babel/preset-react": "^7.16.0",
        "@rollup/plugin-babel": "^5.3.0",
        "@rollup/plugin-commonjs": "^21.0.1",
        "@rollup/plugin-node-resolve": "^13.0.6",
        "@rollup/plugin-replace": "^3.0.0",
        "postcss": "^8.4.5",
        "rollup": "^2.60.2",
        "rollup-plugin-postcss": "^4.0.2",
        "rollup-plugin-scss": "^3.0.0",
        "sass": "^1.44.0",
        "styled-jsx": "^4.0.1"
    },
    "scripts": {
        "build": "rollup -c"
    }
}
```

We need the `commonjs` plugin because React is not packaged as an ESM and the imports will not work without doing some conversion. The Babel tooling comes with a config file `.babelrc` which we use to tell it to build the JSX and React components:

```
Copy{
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": ["styled-jsx/babel"]
}
```

With those build tools in place we can extract all the Javascript from `index.html` and put it in `src/main/resources/static/index.js`. It’s almost a copy paste, but we will want to add the CSS imports:

```
Copyimport './style.scss';
import '@springio/utils/style.css';
```

and the imports from React look like this:

```
Copyimport React from 'react';
import ReactDOM from 'react-dom';
```

You can build that with `npm run build` (or `./mvnw generate-resources`) and it should work - all the tabs have some content and all the buttons generate some content.

Finally we just need to tidy up the `index.html` so that it only imports the `index.js` and `index.css`, and then all the features from the Webjars project should be working as expected.

## [](#conclusion)Conclusion

There are many choices available for client side development, and Spring Boot doesn’t really have much influence on any of them, so you are free to choose whatever suits you. This article was necessarily limited in scope (we literally can’t look at everything from every angle), but hopefully was able to highlight some of the interesting possibilities. I find myself personally quite attached to HTMX having used it for a few mini projects recently, but your mileage, as ever, may vary. Please comment on the blog or send feedback via Github or the angry bird app - it will be interesting to hear what people think. Should we publish this article as a tutorial on [spring.io](https://spring.io) for example?