[![GitHub Releases](https://img.shields.io/github/release/vanillawc/wc-demo.svg)](https://github.com/vanillawc/wc-demo/releases)
[![NPM Release](https://badgen.net/npm/v/@vanillawc/wc-demo)](https://www.npmjs.com/package/@vanillawc/wc-demo)
[![Downloads](https://badgen.net/npm/dt/@vanillawc/wc-demo)](https://www.npmjs.com/package/@vanillawc/wc-demo)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vanillawc/wc-demo/master/LICENSE)
[![Published on WebComponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vanillawc/wc-demo)
[![Latest Status](https://github.com/vanillawc/wc-demo/workflows/Latest/badge.svg)](https://github.com/vanillawc/wc-demo/actions)
[![Release Status](https://github.com/vanillawc/wc-demo/workflows/Release/badge.svg)](https://github.com/vanillawc/wc-demo/actions)

A vanilla web component to demo vanilla web components

 <!-- TODO: Add video graphic here -->

-----

## Installation

```sh
npm i @vanillawc/wc-demo
```

Then import the `index.js` file at the root of the package.

-----

## Usage

Attributes

- title - the demo title
- link - link to the demo's GitHub repo
- desc - the demo's description
- src - path to the demo source file

### Load an external Markdown file using the `src` attribute

```html
<wc-demo title="WC-Demo" link="https:/github.com/vanillawc/wc-demo" desc="Basic Usage" src="assets/demo.html"></wc-demo>
```

***Demo: [wc-demo][]***

## Demos

In addition to the link, the demo can be run locally with

```sh
npm run start
```

[wc-demo]: https://vanillawc.github.io/wc-demo/demo/index.html
