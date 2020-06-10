<h1 align="center">&lt;wc-demo&gt;: A Component to Demo Components</h1>

<div align="center">
  <a href="https://github.com/vanillawc/wc-demo/releases"><img src="https://badgen.net/github/tag/vanillawc/wc-demo" alt="GitHub Releases"></a>
  <a href="https://www.npmjs.com/package/@vanillawc/wc-demo"><img src="https://badgen.net/npm/v/@vanillawc/wc-demo" alt="NPM Releases"></a>
  <a href="https://bundlephobia.com/result?p=@vanillawc/wc-demo"><img src="https://badgen.net/bundlephobia/minzip/@vanillawc/wc-demo" alt="Bundlephobia"></a>
  <a href="https://raw.githubusercontent.com/vanillawc/wc-demo/master/LICENSE"><img src="https://badgen.net/github/license/vanillawc/wc-demo" alt="MIT License"></a>
  <a href="https://www.webcomponents.org/element/vanillawc/wc-demo"><img src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" alt="Published on WebComponents.org"></a>
  <a href="https://github.com/vanillawc/wc-demo/actions"><img src="https://github.com/vanillawc/wc-demo/workflows/Latest/badge.svg" alt="Latest Status"></a>
  <a href="https://github.com/vanillawc/wc-demo/actions"><img src="https://github.com/vanillawc/wc-demo/workflows/Release/badge.svg" alt="Release Status"></a>
</div>

## Installation

*Installation*
```sh
npm i @vanillawc/wc-demo
```

*Import from NPM*
```html
<script type="module" src="node_modules/@vanillawc/wc-demo/index.js"></script>
```

*Import from CDN*
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/vanillawc/wc-demo/index.js"></script>
```

## Demo

Try it on [WebComponents.dev](https://webcomponents.dev/edit/0nMBg8ZeCG1KHZmL49ww?sv=1&pm=1)

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
