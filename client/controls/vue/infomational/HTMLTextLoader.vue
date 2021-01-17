<style lang="less">
@import "../../style/theme/theme.less";

.HTMLTextLoaderWrapper {
  width: 100%;
  overflow-x: auto;
  background-color: @grey-090;
}

.HTMLTextLoader {
  color: @white;

  .Line {
    line-height: 24px;
    display: flex;
    flex-direction: row;
    margin: 0;
    color: @grey-030;

    &:hover {
      background-color: @grey-070;
    }

    &.hide {
      display: none;
    }

    &.expanded:hover > .Line-Control:after {
      content: "\f0da";
    }

    &.collasped {
      background-color: @grey-070;
      border-bottom: 1px solid @info-030;

      & > .Line-Control:after {
        content: "\f0d7";
      }
    }

    &.expandible > .Line-Control {
      cursor: pointer;
    }

    .Line-Index {
      min-width: 30px;
      text-align: center;
      background-color: @grey-080;
    }

    .Line-Control {
      min-width: 24px;
      text-align: center;
    }

    .Line-Code {
      .HTMLTag {
        font-style: normal;
        color: @primary-050;
      }

      .HTMLAttribute {
        font-style: normal;
        color: @success-040;
      }

      .HTMLStatue {
        font-style: normal;
        color: @danger-050;
      }

      .HTMLComment {
        font-style: normal;
        color: @grey-060;
      }

      .spacer {
        margin-right: 4px;
      }
    }
  }
}
</style>

<template>
  <div class="HTMLTextLoaderWrapper">
    <div ref="loader" class="HTMLTextLoader"></div>
  </div>
</template>

<script>
export default {
  name: "HTMLTextLoader",
  data: function () {
    return {
      lineCounter: 0,
      parsedTags: [],
      EXCEPTIONS: ["img", "input", "br"],
      SYNTAX: {
        COMMENT_TAG: {
          name: "comment_tag",
          expression: /^(<!--)(.*)(-->)$/,
        },
        CLOSE_TAG: {
          name: "close_tag",
          expression: /^(<\/)(\w+)(>)$/,
        },
        SELF_CLOSE_TAG: {
          name: "self_close_tag",
          expression: /^(<)(\w+)\s*(.*)(\/>)$/,
        },
        OPEN_TAG: {
          name: "open_tag",
          expression: /^(<)(\w+)\s*(.*)(>)$/,
        },
        INLINE_TEXT: {
          name: "inline_text",
          expression: /[^<]+/,
        },
        ATTRIBUTE: {
          name: "attribute",
          expression: /([a-zA-Z0-9](-?[a-zA-Z0-9])*)(="[^"]*")\s*/,
        },
        STATUS: {
          name: "status",
          expression: /([a-zA-Z0-9](-?[a-zA-Z0-9])*)\s*/,
        },
      },
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    getTags: function* () {
      let source = this.value || "";
      let tag = source.match(/(<[^>]+>)\s*/);
      while (tag) {
        if (tag.index === 0) {
          yield tag[1];
          source = this.cutTextAtRange(source, tag.index, tag[0].length);
        } else {
          const text = source.substring(0, tag.index).trim();
          source = this.cutTextAtRange(source, 0, tag.index);

          if (text !== "") {
            yield text;
          }
        }
        tag = source.match(/(<[^>]+>)/);
      }
    },
    getClasscification: function (tag) {
      const matchingOrder = [
        this.SYNTAX.COMMENT_TAG,
        this.SYNTAX.CLOSE_TAG,
        this.SYNTAX.SELF_CLOSE_TAG,
        this.SYNTAX.OPEN_TAG,
        this.SYNTAX.INLINE_TEXT,
      ];

      for (let { name, expression } of matchingOrder) {
        const result = tag.match(expression);
        if (result) {
          // correction types for certain expressions
          if (name === "open_tag" && this.EXCEPTIONS.indexOf(result[2]) > -1) {
            name = "self_close_tag";
          }

          return {
            type: name,
            result,
          };
        }
      }

      return {};
    },
    generateParsedTag: function (classcification) {
      if (classcification === {}) {
        return {};
      } else if (classcification.type === "inline_text") {
        return {
          type: classcification.type,
          value: classcification.result[0],
        };
      } else if (classcification.type === "comment_tag") {
        return {
          type: classcification.type,
          value: classcification.result[2],
        };
      } else if (classcification.type === "close_tag") {
        return {
          type: classcification.type,
          element: classcification.result[2],
        };
      } else {
        return {
          type: classcification.type,
          element: classcification.result[2],
          ...this.parseAttrStatus(classcification.result[3] || ""),
        };
      }
    },
    parseAttrStatus: function (str) {
      let input = str;
      const ret = {
        attributes: [],
        status: [],
      };

      if (str === "") return;

      let result = input.match(this.SYNTAX.ATTRIBUTE.expression);
      while (result) {
        ret.attributes.push({
          name: result[1],
          value: result[3],
        });

        input = this.cutTextAtRange(input, result.index, result[0].length);
        result = input.match(this.SYNTAX.ATTRIBUTE.expression);
      }

      result = input.match(this.SYNTAX.STATUS.expression);
      while (result) {
        ret.status.push({
          name: result[1],
          value: "",
        });
        input = this.cutTextAtRange(input, result.index, result[0].length);
        result = input.match(this.SYNTAX.STATUS.expression);
      }

      if (input !== "") {
        console.error("Uncatched terms: ", input);
      }

      return ret;
    },
    cutTextAtRange: function (str = "", init = 0, end = 0) {
      if (init <= end && init >= 0 && end <= str.length) {
        return str.substring(0, init) + str.substring(end);
      }
      return "";
    },
    tokenizedTags: function () {
      this.parsedTags = [];
      const tags = this.getTags();

      let result = tags.next();
      while (!result.done) {
        const tag = [this.getClasscification, this.generateParsedTag].reduce(
          (acc, callback) => {
            return callback(acc);
          },
          result.value
        );

        this.parsedTags.push(tag);
        result = tags.next();
      }

      return;
    },
    createParseTree: function (root) {
      if (this.parsedTags.length === 0) {
        return {};
      }

      let [tag, ...rest] = this.parsedTags;
      this.parsedTags = rest;

      let node = {
        ...tag,
        children: [],
      };

      if (!root) {
        return this.createParseTree(node);
      } else {
        if (
          ["comment_tag", "self_close_tag", "inline_text"].indexOf(node.type) >
          -1
        ) {
          root.children = [...root.children, node];
          return this.createParseTree(root);
        } else if (node.type === "close_tag") {
          return root;
        } else {
          root.children = [...root.children, this.createParseTree(node)];
          const [nextTag, ..._] = this.parsedTags;
          nextTag && this.createParseTree(root);
        }
      }

      return root;
    },
    updateParseTree: function () {
      [this.tokenizedTags, this.createParseTree, this.plotParseTree].reduce(
        (acc, callback) => {
          return callback(acc);
        },
        null
      );

      this.adjustContentWidth();
    },
    indentation: function (level) {
      return Array(level || 0)
        .fill("\t")
        .join("");
    },
    plotParseTree: function (parseTree) {
      // clean previous plots
      const loader = this.$refs.loader;
      loader.innerHTML = "";

      // clean the line counter
      this.lineCounter = 0;

      this.drawLines(parseTree, 0);
    },
    drawLines: function (parseTree, level = 0) {
      if (parseTree) {
        const codeSpan = this.assignACodeLine(level);

        const lineSpan = codeSpan.parentNode;
        const currentLineNumber = this.getCurrentLineNumber();

        // plot open tag
        this.beautify(codeSpan, parseTree, false);

        if (
          parseTree.type === "open_tag" &&
          parseTree.children.length === 1 &&
          parseTree.children[0].type === "inline_text"
        ) {
          this.beautify(codeSpan, parseTree.children[0], false);
          this.beautify(codeSpan, parseTree, true);
        } else if (
          parseTree.type === "open_tag" &&
          parseTree.children.length === 0
        ) {
          this.beautify(codeSpan, parseTree, true);
        } else {
          parseTree.children.map((node) => {
            this.drawLines(node, level + 1);
          });

          if (parseTree.type === "open_tag") {
            // plot close tag
            this.beautify(this.assignACodeLine(level), parseTree, true);
            this.appendLineCollaspeEvent(
              lineSpan,
              currentLineNumber,
              this.getCurrentLineNumber()
            );
          }
        }
      }
    },
    assignACodeLine: function (level) {
      const lineSpan = this.createTextElement(
        "pre",
        null,
        "Line",
        this.$refs.loader
      );

      this.createTextElement(
        "span",
        this.assignALineNumber(),
        "Line-Index",
        lineSpan
      );

      this.createTextElement("span", null, "Line-Control", lineSpan);

      const codeSpan = this.createTextElement(
        "span",
        null,
        "Line-Code",
        lineSpan
      );

      this.createTextElement("span", this.indentation(level), null, codeSpan);

      return codeSpan;
    },
    assignALineNumber: function () {
      this.lineCounter += 1;
      return this.lineCounter;
    },
    getCurrentLineNumber: function () {
      return this.lineCounter;
    },
    beautify: function (codeSpan, node, isCloseTag) {
      if (!codeSpan) return;

      if (
        node.type === "self_close_tag" ||
        (node.type === "open_tag" && !isCloseTag)
      ) {
        this.createTextElement("span", "<", null, codeSpan);
        this.createTextElement("em", node.element, "HTMLTag spacer", codeSpan);

        (node.attributes || []).map((attr) => {
          this.createTextElement("em", attr.name, "HTMLAttribute", codeSpan);
          this.createTextElement("span", attr.value, "spacer", codeSpan);
        });

        (node.status || []).map((state) => {
          this.createTextElement(
            "em",
            statues.name,
            "HTMLStatues spacer",
            codeSpan
          );
        });

        this.createTextElement("span", ">", null, codeSpan);
      } else if (node.type === "open_tag" && isCloseTag) {
        this.createTextElement("span", "</", null, codeSpan);
        this.createTextElement("em", node.element, "HTMLTag", codeSpan);
        this.createTextElement("span", ">", null, codeSpan);
      } else if (node.type === "inline_text") {
        this.createTextElement("span", node.value, null, codeSpan);
      } else {
        this.createTextElement(
          "span",
          `<!--${node.value}-->`,
          "HTMLComment",
          codeSpan
        );
      }
    },
    createTextElement: function (eleType, text, eleClass, parent) {
      let ele = document.createElement(eleType);

      if (eleClass) {
        ele.setAttribute("class", eleClass);
      }

      if (text) {
        ele.innerText = text;
      }

      if (parent) {
        parent.appendChild(ele);
      }

      return ele;
    },
    appendLineCollaspeEvent: function (lineSpan, startLine, endLine) {
      lineSpan.classList.add("expandible", "expanded");

      const view = this;
      const lineIndex = lineSpan.querySelector(".Line-Control");
      lineIndex.addEventListener(
        "click",
        function (event) {
          if (lineSpan.classList.contains("expanded")) {
            lineSpan.classList.remove("expanded");
            lineSpan.classList.add("collasped");
            view.togglesLines(false, startLine, endLine);
          } else {
            lineSpan.classList.remove("collasped");
            lineSpan.classList.add("expanded");
            view.togglesLines(true, startLine, endLine);
          }
        },
        true
      );
    },
    togglesLines: function (show, startLine, endLine) {
      const loader = this.$refs.loader;
      const lines = loader.querySelectorAll("pre.Line");
      lines.forEach((line, index) => {
        if (index >= startLine && index <= endLine - 2) {
          if (show) {
            line.classList.contains("hide") && line.classList.remove("hide");
          } else {
            !line.classList.contains("hide") && line.classList.add("hide");
          }

          if (line.classList.contains("collasped")) {
            line.classList.remove("collasped");
            line.classList.add("expanded");
          }
        }
      });
    },
    adjustContentWidth: function () {
      const loader = this.$refs.loader;
      const lines = loader.querySelectorAll("pre.Line > .Line-Code");

      let baseWidth = this.$refs.loader.getBoundingClientRect().width;
      lines.forEach((line, index) => {
        let lineWidth = line.getBoundingClientRect().width + 100;
        if (lineWidth > baseWidth) {
          baseWidth = lineWidth;
        }
      });

      if (baseWidth !== this.$refs.loader.getBoundingClientRect().width) {
        this.$refs.loader.style.width = baseWidth + "px";
      }
    },
  },
  watch: {
    value: function (newVal, oldVal) {
      newVal && this.updateParseTree();
    },
  },
  mounted: function () {
    this.value && this.updateParseTree();
  },
};
</script>