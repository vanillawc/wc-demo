/* eslint no-undef: 0 */
import './source-element.js';

export class WCDemo extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'link', 'desc', 'src'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get title () { return this.getAttribute('title'); }
  set title (value) {
    this.setAttribute('title', value);
    this.setTitle();
  }

  get link () { return this.getAttribute('link'); }
  set link (value) {
    this.setAttribute('link', value);
    this.setLink();
  }

  get desc () { return this.getAttribute('desc'); }
  set desc (value) {
    this.setAttribute('desc', value);
    this.setDescription();
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc();
  }

  constructor () {
    super();
    const template = document.createElement('template');
    template.innerHTML = WCDemo.template();
    this.appendChild(template.content.cloneNode(true));

    this.__initialized = null;
    this.titleElement = this.querySelector('#title');
    this.linkElement = this.querySelector('#link');
    this.descElement = this.querySelector('#description');
    this.sourceElement = this.querySelector('#source');
    this.outputElement = this.querySelector('#output');
  }

  async connectedCallback () {
    if (this.hasAttribute('link')) {
      this.setLink();
    }

    if (this.hasAttribute('desc')) {
      this.setDescription();
    }

    if (this.hasAttribute('title')) {
      this.setTitle();
    }

    if (this.hasAttribute('src')) {
      this.setSrc();
    }

    this.__initialized = true;
  }

  setTitle () {
    this.titleElement.innerText = this.getAttribute('title');
  }

  setLink () {
    this.linkElement.href = this.getAttribute('link');
  }

  setDescription () {
    this.descElement.innerText = this.getAttribute('desc');
  }

  async setSrc () {
    const src = this.getAttribute('src');
    this.source = await this.fetchSrc(src);
    this.sourceElement.source = this.source;
    this.outputElement.innerHTML = this.source;
  }

  async fetchSrc (src) {
    const response = await fetch(src);
    return response.text();
  }

  static template () {
    return `
      <style>
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
          <source-element id="source"></source-element>
          <hr />
          <h2>Output</h2>
          <div id="output"></div>
        </section>
      </div>
      `;
  }
}

customElements.define('wc-demo', WCDemo);
