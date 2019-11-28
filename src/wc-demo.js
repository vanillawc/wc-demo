/* eslint no-undef: 0 */
import Prism from '../node_modules/prism-es6/prism.js';
const template = document.createElement('template');
template.innerHTML = `
<style>
/**
 * okaidia theme for JavaScript, CSS and HTML
 * Loosely based on Monokai textmate theme by http://www.monokai.nl/
 * @author ocodia
 */

code[class*="language-"],
pre[class*="language-"] {
  color: #f8f8f2;
  background: none;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
  border-radius: 0.3em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #272822;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #f8f8f2;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: #f92672;
}

.token.boolean,
.token.number {
  color: #ae81ff;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #a6e22e;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable {
  color: #f8f8f2;
}

.token.atrule,
.token.attr-value,
.token.function,
.token.class-name {
  color: #e6db74;
}

.token.keyword {
  color: #66d9ef;
}

.token.regex,
.token.important {
  color: #fd971f;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

/* WCDemo styling */

@import url('https://fonts.googleapis.com/css?family=Lato|Roboto|Source+Code+Pro');

body {
  font-family: 'Lato', san-serif;
}

h1, h2, h3, h4, h5 {
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  margin: 0;
}

h2 {
  margin-bottom: 10px;
}

hr {
  margin: 20px;
}

textarea {
  width:100%;
  white-space: nowrap;
}

code {
  font-family: 'Source Code Pro', monospace;
}

#header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: #333333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 999;
}

#title {
  float: left;
  padding-top: 10px;
  padding-left: 10%;
  color: white;
  font-size: 1.25rem;
}

#link {
  float: right;
  padding-top: 10px;
  padding-right: 10%;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
}

#container {
  width: 80%;
  max-width: 960px;
  padding: 0 50px 0 50px;
  margin: 0 auto;
  display: block;
  overflow-x: hidden;
  background: #F0F0F0;
}

#content {
  background: #F0F0F0;
  margin: 50px auto 0 auto;
  padding: 20px 0 20px 0;
}

#run {
  margin-top: 10px;
  border-radius: 15%;
}

#output {
  display: block;
  overflow: auto;
  background-color: lightblue;
  padding: .5em;
}
</style>

<div id="header">
  <h1 id="title"></h1>
  <h1><a id="link">GitHub</a></h1>
</div>
<div id="container">
  <section id="content">
    <h2>Description</h2>
    <p id="description"></p>
    <hr>
    <h2>Usage</h2>
    <pre><code id="source" class="language-html"></code></pre>
    <hr />
    <h2>Output</h2>
    <div id="output"></div>
  </section>
</div>
`;

export class WCDemo extends HTMLElement {
  static get observedAttributes () {
    return ['src'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.fetch(value);
  }

  get desc() { return this.getAttribute('desc'); }
  set desc(value) {
    this.setAttribute('desc', value)
  }

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this.shadowRoot.appendChild(document.createElement('div'));
    this.titleElement = this.shadowRoot.getElementById('title');
    this.linkElement = this.shadowRoot.getElementById('link');
    this.descElement = this.shadowRoot.getElementById('description');
    this.sourceElement = this.shadowRoot.getElementById('source');
    this.outputElement = this.shadowRoot.getElementById('output');
  }

  async connectedCallback () {
    this.setTitle();
    this.setLink();
    this.setDescription();
    this.loadDemo();
  }

  setTitle () {
    if (this.hasAttribute('title')) {
      this.titleElement.innerText = this.getAttribute('title');
    }
  }

  setLink () {
    if (this.hasAttribute('link')) {
      this.linkElement.href = this.getAttribute('link');
    }
  }

  setDescription() {
    if (this.hasAttribute('desc')) {
      this.descElement.innerText = this.getAttribute('desc');
    }
  }

  async loadDemo () {
    if (this.hasAttribute('src')) {
      this.source = await this.fetch(this.src);
      let escapedSource = this.source;
      escapedSource = escapedSource.replace(/</g, '&lt;');
      escapedSource = escapedSource.replace(/>/g, '&gt;');
      this.sourceElement.innerHTML = escapedSource;
      Prism.highlightElement(this.sourceElement);
      this.outputElement.innerHTML = this.source;
    }
  }

  async fetch (src) {
    const response = await fetch(src);
    return response.text();
  }
}

customElements.define('wc-demo', WCDemo);
