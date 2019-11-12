import Prism from '../node_modules/prism-es6/prism.js';

const favicon = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASzSURBVFiF7ZdPbNRFFMc/b3a7pbSFSCLFSMWutBpliyIniURNiMSDCZAaI8oWNRITraHFfxdtTExU3CpcTBqFbPkTAyqJFxMveEDiwQhmLRKQ7mIFFYwkhbKl2988D78/O7vdmDQm9sJc9jdv3pvv931n5s2spHOZCaCe2WnXzCyCA9SbWQQH4DqBePA7CYwH382OHaAEXAm+64G5VXNc+pexIui3IOcRuRHV1UCj6xAq8HU21bcgm+pboMiXroPCnnBM0KeqAP6M4pS3KuNkz2RCb8mmtq3JpvrS2WW9j5R0shXYO00BRdtDg2DzIJGDiOQjtiJnPC0Hi0qh3KGjbNdsNtW7GRHHG/Z3vn4J1U3pnzIJkMciBQRJPnC4Px4g5t0gsYyU6U6NuGMq9myZKGESf5QaEj3V4E5GakqJFwiWNVyCusUL593qz2oLFQGqEeiuO169DFx0GJR9NVBA5aN97T1jABtP75yXzmV2pHOZI+lcZsfTJ99tBti9ouci6F6XAHFPOwCMqVQgbmJ5gK6jAw2B6UyEaeQswHPfvzMfaAGIIdEaxydKnwE9wCqgxyvFv+rX/gDTHKogYMXfB3XF5gIQyjf+8bKXLnQdOBBrbNTlfoLlJTFWCwDF+oQvv1DY1bl1BGDz8PaHgDVUtlUjJ5rW+8GcqyBg8CUcXLnlKnAhMOcR0YaO3xZpTNumKRDzFYhF8nMsSsgz66nRxJNn0rn3d2H1GDjnXZF2xy8PtKB+tka0VaHVz5oRDQ6JnfIKoXq+qbxfEO6tRQBhrXvKIgWU8jFCCffBiJ+ptqnKYn9MQgUu7ln+8ngwaQeAqpx3oBbWJFDVIgICrd35/jlBpxD85gPQpChLAKxGe6B8BIMlMCJXnblvmBEBwHhjjUsBJADWUAFIIiQBhpZvPQ8UK44gfg2wQtEnrALMnykBxMT8iazJA8SMv6aCJIE2VCUoMAWCIvRs7sOWMpit8ycSBa7NmADq1wIb0wKgwZEENAk0dp/Y3hJ4joYVc9JMlcu4insZ/T1jAmE5vcbYryi/D67ccrVruD8B3AwgNpYMCJ0T6y+TsVK+A2DBfyIQ7uaDd/VPqsh3AI0ydwkQA/Dw9wHKuejIOZeQ9ZcqbL/URBROKfJFbQKKI6c9AuBZkyzbIoDR8SvmLIBVcW5Svd35PlyTgPL5UKp3g8LjQLH6RbRo4+md8wDEcATAqJOV6G0AVswPB+/rLQZAHU78iii+lPgUuFw1/yR4nwCotYeBxLQnWbw42Q6QmGg+HphcWZMAo3+NHQcILpalbnhdsfQwBDee6vOAF+Wu+lo29coZABGzDohNIyDGtAMMrtxS8qMcBdQn8M2D/VMAoz83tQJz3Hg1vBh+Zzu37VOPO1WkW4xZke3c9kGEIzwBlW8/fwKLKymCTUa1W7ip6+hAQyi/51X6BiTv35QbWDeU6j0EMHR33ynglOvSPTywVq2uhlqvYtH2KkOb22mab6O+FVPlG/LUwU3DmXtqjXWfeK9dre6OfNO5TPXT6aQobwCooQElWzX+tig/Aig8ifBoLSDgikDGeuyfM9WUn4iPL5SYbgDexKkXtQj8r23W/5hcJ/APEB3A7cL0B6gAAAAASUVORK5CYII=';

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
  <div><a id="link">GitHub</a></div>
</div>
<div id="container">
  <section id="content">
    <h2>Description</h2>
    <p><slot></slot></p>
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

  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get src() { return this.getAttribute('src'); }
  set src(value) {
    this.setAttribute('src', value);
    this.fetch(value);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this.shadowRoot.appendChild(document.createElement('div'));
    this.addFavicon();
    this.titleElement = this.shadowRoot.getElementById('title');
    this.linkElement = this.shadowRoot.getElementById('link');
    this.sourceElement = this.shadowRoot.getElementById('source');
    this.outputElement = this.shadowRoot.getElementById('output');
  }

  addFavicon() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = 'data:image/png;base64,'+favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  async connectedCallback() {
    if (this.hasAttribute('title')) {
      this.titleElement.innerText = this.getAttribute('title');
    }

    if (this.hasAttribute('link')) {
      this.linkElement.href = this.getAttribute('link');
    }

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

  async fetch(src) {
    // fetch the external markdown source
    const response = await fetch(src);
    return await response.text();
  }

}

customElements.define('wc-demo', WCDemo);
