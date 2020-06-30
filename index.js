let __defineProperty = Object.defineProperty;
let __hasOwnProperty = Object.prototype.hasOwnProperty;
let __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
let __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
let __export = (target, all) => {
  __markAsModule(target);
  for (let name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};
let __exportStar = (target, module) => {
  __markAsModule(target);
  if (typeof module === "object" || typeof module === "function") {
    for (let key in module)
      if (__hasOwnProperty.call(module, key) && !__hasOwnProperty.call(target, key) && key !== "default")
        __defineProperty(target, key, {get: () => module[key], enumerable: true});
  }
  return target;
};
let __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
};

// node_modules/prism-es6/prism.js
var require_prism = __commonJS((exports, module) => {
  __export(exports, {
    default: () => prism_default
  });
  let _self = {};
  let Prism2 = function() {
    let lang = /\blang(?:uage)?-([\w-]+)\b/i;
    let uniqueId = 0;
    var _ = _self.Prism = {
      manual: _self.Prism && _self.Prism.manual,
      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
      util: {
        encode(tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
          } else if (_.util.type(tokens) === "Array") {
            return tokens.map(_.util.encode);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        type(o) {
          return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
        },
        objId(obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", {value: ++uniqueId});
          }
          return obj["__id"];
        },
        clone(o, visited) {
          var type = _.util.type(o);
          visited = visited || {};
          switch (type) {
            case "Object":
              if (visited[_.util.objId(o)]) {
                return visited[_.util.objId(o)];
              }
              var clone = {};
              visited[_.util.objId(o)] = clone;
              for (var key in o) {
                if (o.hasOwnProperty(key)) {
                  clone[key] = _.util.clone(o[key], visited);
                }
              }
              return clone;
            case "Array":
              if (visited[_.util.objId(o)]) {
                return visited[_.util.objId(o)];
              }
              var clone = [];
              visited[_.util.objId(o)] = clone;
              o.forEach(function(v, i) {
                clone[i] = _.util.clone(v, visited);
              });
              return clone;
          }
          return o;
        }
      },
      languages: {
        extend(id, redef) {
          var lang2 = _.util.clone(_.languages[id]);
          for (var key in redef) {
            lang2[key] = redef[key];
          }
          return lang2;
        },
        insertBefore(inside, before, insert, root) {
          root = root || _.languages;
          var grammar = root[inside];
          if (arguments.length == 2) {
            insert = arguments[1];
            for (var newToken in insert) {
              if (insert.hasOwnProperty(newToken)) {
                grammar[newToken] = insert[newToken];
              }
            }
            return grammar;
          }
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }
              ret[token] = grammar[token];
            }
          }
          _.languages.DFS(_.languages, function(key, value) {
            if (value === root[inside] && key != inside) {
              this[key] = ret;
            }
          });
          return root[inside] = ret;
        },
        DFS(o, callback, type, visited) {
          visited = visited || {};
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);
              if (_.util.type(o[i]) === "Object" && !visited[_.util.objId(o[i])]) {
                visited[_.util.objId(o[i])] = true;
                _.languages.DFS(o[i], callback, null, visited);
              } else if (_.util.type(o[i]) === "Array" && !visited[_.util.objId(o[i])]) {
                visited[_.util.objId(o[i])] = true;
                _.languages.DFS(o[i], callback, i, visited);
              }
            }
          }
        }
      },
      plugins: {},
      highlightAll(async, callback) {
        _.highlightAllUnder(document, async, callback);
      },
      highlightAllUnder(container, async, callback) {
        var env = {
          callback,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _.hooks.run("before-highlightall", env);
        var elements = env.elements || container.querySelectorAll(env.selector);
        for (var i = 0, element; element = elements[i++]; ) {
          _.highlightElement(element, async === true, env.callback);
        }
      },
      highlightElement(element, async, callback) {
        var language, grammar, parent = element;
        while (parent && !lang.test(parent.className)) {
          parent = parent.parentNode;
        }
        if (parent) {
          language = (parent.className.match(lang) || [, ""])[1].toLowerCase();
          grammar = _.languages[language];
        }
        element.className = element.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
        if (element.parentNode) {
          parent = element.parentNode;
          if (/pre/i.test(parent.nodeName)) {
            parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
          }
        }
        var code = element.textContent;
        var env = {
          element,
          language,
          grammar,
          code
        };
        _.hooks.run("before-sanity-check", env);
        if (!env.code || !env.grammar) {
          if (env.code) {
            _.hooks.run("before-highlight", env);
            env.element.textContent = env.code;
            _.hooks.run("after-highlight", env);
          }
          _.hooks.run("complete", env);
          return;
        }
        _.hooks.run("before-highlight", env);
        if (async && _self.Worker) {
          var worker = new Worker(_.filename);
          worker.onmessage = function(evt) {
            env.highlightedCode = evt.data;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            callback && callback.call(env.element);
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          env.highlightedCode = _.highlight(env.code, env.grammar, env.language);
          _.hooks.run("before-insert", env);
          env.element.innerHTML = env.highlightedCode;
          callback && callback.call(element);
          _.hooks.run("after-highlight", env);
          _.hooks.run("complete", env);
        }
      },
      highlight(text, grammar, language) {
        var env = {
          code: text,
          grammar,
          language
        };
        _.hooks.run("before-tokenize", env);
        env.tokens = _.tokenize(env.code, env.grammar);
        _.hooks.run("after-tokenize", env);
        return Token.stringify(_.util.encode(env.tokens), env.language);
      },
      matchGrammar(text, strarr, grammar, index, startPos, oneshot, target) {
        var Token2 = _.Token;
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          if (token == target) {
            return;
          }
          var patterns = grammar[token];
          patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            var pattern = patterns[j], inside = pattern.inside, lookbehind = !!pattern.lookbehind, greedy = !!pattern.greedy, lookbehindLength = 0, alias = pattern.alias;
            if (greedy && !pattern.pattern.global) {
              var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
              pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
            }
            pattern = pattern.pattern || pattern;
            for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
              var str = strarr[i];
              if (strarr.length > text.length) {
                return;
              }
              if (str instanceof Token2) {
                continue;
              }
              if (greedy && i != strarr.length - 1) {
                pattern.lastIndex = pos;
                var match = pattern.exec(text);
                if (!match) {
                  break;
                }
                var from = match.index + (lookbehind ? match[1].length : 0), to = match.index + match[0].length, k = i, p = pos;
                for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                  p += strarr[k].length;
                  if (from >= p) {
                    ++i;
                    pos = p;
                  }
                }
                if (strarr[i] instanceof Token2) {
                  continue;
                }
                delNum = k - i;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                pattern.lastIndex = 0;
                var match = pattern.exec(str), delNum = 1;
              }
              if (!match) {
                if (oneshot) {
                  break;
                }
                continue;
              }
              if (lookbehind) {
                lookbehindLength = match[1] ? match[1].length : 0;
              }
              var from = match.index + lookbehindLength, match = match[0].slice(lookbehindLength), to = from + match.length, before = str.slice(0, from), after = str.slice(to);
              var args = [i, delNum];
              if (before) {
                ++i;
                pos += before.length;
                args.push(before);
              }
              var wrapped = new Token2(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
              args.push(wrapped);
              if (after) {
                args.push(after);
              }
              Array.prototype.splice.apply(strarr, args);
              if (delNum != 1)
                _.matchGrammar(text, strarr, grammar, i, pos, true, token);
              if (oneshot)
                break;
            }
          }
        }
      },
      tokenize(text, grammar, language) {
        var strarr = [text];
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        _.matchGrammar(text, strarr, grammar, 0, 0, false);
        return strarr;
      },
      hooks: {
        all: {},
        add(name, callback) {
          var hooks = _.hooks.all;
          hooks[name] = hooks[name] || [];
          hooks[name].push(callback);
        },
        run(name, env) {
          var callbacks = _.hooks.all[name];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i = 0, callback; callback = callbacks[i++]; ) {
            callback(env);
          }
        }
      }
    };
    var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
      this.type = type;
      this.content = content;
      this.alias = alias;
      this.length = (matchedStr || "").length | 0;
      this.greedy = !!greedy;
    };
    Token.stringify = function(o, language, parent) {
      if (typeof o === "string") {
        return o;
      }
      if (_.util.type(o) === "Array") {
        return o.map((element) => {
          return Token.stringify(element, language, o);
        }).join("");
      }
      let env = {
        type: o.type,
        content: Token.stringify(o.content, language, parent),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language,
        parent
      };
      if (o.alias) {
        let aliases = _.util.type(o.alias) === "Array" ? o.alias : [o.alias];
        Array.prototype.push.apply(env.classes, aliases);
      }
      _.hooks.run("wrap", env);
      let attributes = Object.keys(env.attributes).map((name) => {
        return name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }).join(" ");
      return `<${env.tag} class="${env.classes.join(" ")}"${attributes ? " " + attributes : ""}>${env.content}</${env.tag}>`;
    };
    if (!_self.document) {
      if (!_self.addEventListener) {
        return _self.Prism;
      }
      if (!_.disableWorkerMessageHandler) {
        _self.addEventListener("message", (evt) => {
          var message = JSON.parse(evt.data), lang2 = message.language, code = message.code, immediateClose = message.immediateClose;
          _self.postMessage(_.highlight(code, _.languages[lang2], lang2));
          if (immediateClose) {
            _self.close();
          }
        }, false);
      }
      return _self.Prism;
    }
    return _self.Prism;
  }();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Prism2;
  }
  if (typeof global !== "undefined") {
    global.Prism = Prism2;
  }
  Prism2.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      greedy: true,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "attr-value": {
          pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
          inside: {
            punctuation: [
              /^=/,
              {
                pattern: /(^|[^\\])["']/,
                lookbehind: true
              }
            ]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  };
  Prism2.languages.markup.tag.inside["attr-value"].inside.entity = Prism2.languages.markup.entity;
  Prism2.hooks.add("wrap", (env) => {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
  });
  Prism2.languages.xml = Prism2.languages.markup;
  Prism2.languages.html = Prism2.languages.markup;
  Prism2.languages.mathml = Prism2.languages.markup;
  Prism2.languages.svg = Prism2.languages.markup;
  Prism2.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
  };
  Prism2.languages.css.atrule.inside.rest = Prism2.languages.css;
  if (Prism2.languages.markup) {
    Prism2.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: true,
        inside: Prism2.languages.css,
        alias: "language-css",
        greedy: true
      }
    });
    Prism2.languages.insertBefore("inside", "attr-value", {
      "style-attr": {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
          "attr-name": {
            pattern: /^\s*style/i,
            inside: Prism2.languages.markup.tag.inside
          },
          punctuation: /^\s*=\s*['"]|['"]\s*$/,
          "attr-value": {
            pattern: /.+/i,
            inside: Prism2.languages.css
          }
        },
        alias: "language-css"
      }
    }, Prism2.languages.markup.tag);
  }
  Prism2.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: true,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
  };
  Prism2.languages.javascript = Prism2.languages.extend("clike", {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  });
  Prism2.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: true,
      greedy: true
    },
    "function-variable": {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
  });
  Prism2.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation"
            },
            rest: null
          }
        },
        string: /[\s\S]+/
      }
    }
  });
  Prism2.languages.javascript["template-string"].inside.interpolation.inside.rest = Prism2.languages.javascript;
  if (Prism2.languages.markup) {
    Prism2.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: true,
        inside: Prism2.languages.javascript,
        alias: "language-javascript",
        greedy: true
      }
    });
  }
  Prism2.languages.js = Prism2.languages.javascript;
  const prism_default = Prism2;
});

// src/source-element.js
const prism = __toModule(require_prism());
class SourceElement extends HTMLElement {
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }
  get source() {
    return this._source;
  }
  set source(value) {
    this._source = value;
    this.setSource();
  }
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = SourceElement.default();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this.sourceElement = this.shadowRoot.getElementById("source");
  }
  setSource() {
    let escapedSource = this._source;
    escapedSource = escapedSource.replace(/</g, "&lt;");
    escapedSource = escapedSource.replace(/>/g, "&gt;");
    this.sourceElement.innerHTML = escapedSource;
    prism.default.highlightElement(this.sourceElement);
  }
  static default() {
    return `
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
      </style>
      <pre><code id="source" class="language-html"></code></pre>`;
  }
}
customElements.define("source-element", SourceElement);

// src/wc-demo.js
class WCDemo extends HTMLElement {
  static get observedAttributes() {
    return ["title", "link", "desc", "src"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.__initialized) {
      return;
    }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }
  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.setAttribute("title", value);
    this.setTitle();
  }
  get link() {
    return this.getAttribute("link");
  }
  set link(value) {
    this.setAttribute("link", value);
    this.setLink();
  }
  get desc() {
    return this.getAttribute("desc");
  }
  set desc(value) {
    this.setAttribute("desc", value);
    this.setDescription();
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(value) {
    this.setAttribute("src", value);
    this.setSrc();
  }
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = WCDemo.template();
    this.appendChild(template.content.cloneNode(true));
    this.__initialized = null;
    this.titleElement = this.querySelector("#title");
    this.linkElement = this.querySelector("#link");
    this.descElement = this.querySelector("#description");
    this.sourceElement = this.querySelector("#source");
    this.outputElement = this.querySelector("#output");
  }
  async connectedCallback() {
    if (this.hasAttribute("link")) {
      this.setLink();
    }
    if (this.hasAttribute("desc")) {
      this.setDescription();
    }
    if (this.hasAttribute("title")) {
      this.setTitle();
    }
    if (this.hasAttribute("src")) {
      this.setSrc();
    }
    this.__initialized = true;
  }
  setTitle() {
    this.titleElement.innerText = this.getAttribute("title");
  }
  setLink() {
    this.linkElement.href = this.getAttribute("link");
  }
  setDescription() {
    this.descElement.innerText = this.getAttribute("desc");
  }
  async setSrc() {
    const src = this.getAttribute("src");
    this.source = await this.fetchSrc(src);
    this.sourceElement.source = this.source;
    this.outputElement.innerHTML = this.source;
  }
  async fetchSrc(src) {
    const response = await fetch(src);
    return response.text();
  }
  static template() {
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
customElements.define("wc-demo", WCDemo);
export {
  WCDemo
};
