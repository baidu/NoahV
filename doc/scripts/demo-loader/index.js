// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js
const {
  stripScript,
  stripTemplate,
  stripStyle,
  stripImport,
  genInlineComponentText
} = require('./util');
const md = require('./config');

module.exports = function(source) {
  const fileName = this.resourcePath.match(/.*\/(.*)\.md$/)[1];
  const content = md.render(source);

  const startTag = '<!--noahv-demo:';
  const startTagLen = startTag.length;
  const endTag = ':noahv-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let componentsStyle = '';
  let imports = '';
  let style = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    componentsStyle += stripStyle(commentContent);
    imports += stripImport(script);
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `noahv-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = '';

  let doc = `mounted() {
    this.scrollEle = document.querySelector('.noahv-layout');
    this.tableEle = document.querySelector('.table-of-contents');
    if (!this.scrollEle || !this.tableEle) {
      return;
    }
    let blocks = document.querySelectorAll('pre code');
    [].forEach.call(blocks, hljs.highlightBlock);
    this.renderAnchor();
    this.$nextTick(this.goAnchor());
    this.throttled = u.throttle(this.handleFix, 100);
    this.scrollEle.addEventListener('scroll', this.throttled, false);
    this.anchors = document.querySelectorAll('.table-of-contents a');
    this.tableEle.addEventListener('click', this.anchorClick, false);
    },
    beforeRouteUpdate(to, from, next) {
    next();
    if (to.path === from.path && to.hash) {
      this.$nextTick(this.goAnchor);
    }
    },
    methods: {
        handleFix(e) {
          let scrollTop = e.target.scrollTop;
          let currentIndex = 0;
          if (!this.anchorsList || !this.anchorsList.length) {
            return;
          }
          u.find(this.anchorsList, (item, index) => {
        let target = document.querySelector(item);
        if (target && scrollTop > target.offsetTop) {
          currentIndex = index;
        }
        else if (target && scrollTop < target.offsetTop) {
          return  true;
        }
          });
          let offsetHeight = document.querySelector('.noahv-layout-content-wrapper').offsetHeight;
          let viewHeight = document.querySelector('.noahv-layout').offsetHeight;
          if (currentIndex !== this.anchorsList.length -1 && (viewHeight + scrollTop > offsetHeight + 120)) {
            currentIndex = this.anchorsList.length - 1;
          }
          let activeItem = document.querySelectorAll('.table-of-contents a.active');
          activeItem.length > 0 && activeItem[0].removeAttribute('class');
          this.anchors[currentIndex].setAttribute('class', 'active');
          // window.location.hash = window.location.hash.replace(/^#(.*)#(.*)/, '$1' + this.anchorsList[currentIndex]);
      },
      anchorClick(e) {
          if (e.target.nodeName === 'A') {
              this.goAnchor();
          }
      },
      renderAnchor() {
        const anchors = document.querySelectorAll('.table-of-contents a');
        const basePath = location.href.split('#').splice(0, 2).join('#');
        this.anchorsList = [];
        [].slice.call(anchors).forEach(a => {
            const href = a.getAttribute('href');
            this.anchorsList.push(href);
            a.href = basePath + href;
            a.name = href;
        });
      },
      goAnchor() {
         if (location.href.match(/#/g).length > 1) {
            const anchor = location.href.match(/#[^#]+$/g);
            if (!anchor) return;
            const ele = document.querySelector(anchor[0]);
            if (!ele) return;
            setTimeout(_ => {
                document.querySelector('.noahv-layout').scrollTop = ele.offsetTop + 30;
            }, 50);
         }
      }
    },
    beforeDestroy() {
        this.scrollEle.removeEventListener('scroll', this.throttled, false);
        this.tableEle.removeEventListener('click', this.anchorClick, false);
    }`;

  if (componenetsString) {
    pageScript = `<script>
      ${imports}
      import u from 'underscore';
      import hljs from 'highlight.js';
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        },
        ${doc}
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }
  else {
    pageScript = `<script>
      ${imports}
      import u from 'underscore';
      import hljs from 'highlight.js';
      export default {
        name: 'component-doc',
        ${doc}
      }
    </script>`
  }

  let pageStyle = '';
  if (componentsStyle) {
    pageStyle = `<style lang="less">
    ${componentsStyle}
    </style>`
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content noahv-doc ${fileName}-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
    ${pageStyle}
  `;
};