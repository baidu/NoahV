// https://github.com/ElemeFE/element/blob/dev/build/md-loader/containers.js
const mdContainer = require('markdown-it-container');

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<nv-demo>
        ${description ? `<template slot="title">${md.render(description)}</template>` : ''}
        <!--noahv-demo: ${content}:noahv-demo-->
        `;
      }
      return '</nv-demo>';
    }
  });

  md.use(mdContainer, 'tip');
  md.use(mdContainer, 'warning');
};