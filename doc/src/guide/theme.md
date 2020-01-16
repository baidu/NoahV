[[TOC]]

## 样式定义
1、在/src/common/assets/css/theme/中新建(替换)样式文件my-theme.less    
2、定义样式变量，如：
```less
@rate-star-color: #8c0776;       // for iview variate
@noahv-btn-error-color: #8c0776; // for noahv variate
```
3、在/src/common/assets/css/main.less文件中 'import theme style' 注释下引入你要引用的主题文件(my-theme.less)
```less
...
// import theme style
@import './theme/my-theme.less';
```

## 样式规则

为确保项目整体样式风格能够通过主题设置，样式定义请遵循以下规则：

1、使用iview组件或noahv组件时，禁止直接采用样式覆盖改变原有样式，如需覆盖，请添加scoped做作用域限制；    
2、自定义组件时，字号、颜色、背景色等属性值使用iview/noahv样式变量定义：    
[iview样式变量](https://github.com/iview/iview/blob/2.0/src/styles/custom.less)    
[noahv样式变量](https://github.com/baidu/NoahV/blob/master/template/common/src/common/assets/css/theme/custom.less)    
3、请在自定义样式主题文件中重定义iview/noahv样式变量的值，如/src/common/assets/css/theme/cusmy-theme.less，禁止在其他文件中重定义;    