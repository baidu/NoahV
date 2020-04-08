## 1.总结
Commit信息需要能通过如下正则校验：
```
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore)(\(.+\))?: .{1,50}/
```
## 2.完整规范的提交信息格式
Commit信息规范的格式：
```
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```
一个完整的Commit信息包含如下三部分：
* header(格式中的第一行`<type>(<scope>): <subject>`)
* body
* footer


其中`header`是必须的，`body`和`footer`是可选的

header主要包含：
* type(commit类别，详细解释参考2.1)
* scope(影响范围)
* subject(提交信息)

其中`type`和`subject`是必须的，`scope`是可选的

如果是回滚某个commit信息需要使用 `revert：`开头，后面加的是需要回滚的commit信息，同时在body部分应该写上本次revert的`commit hash：This reverts commit <hash>.`

```
revert：<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```
2.1 header中type的可选指如下：
Type对应使用场景：


| Commit Type | Description                                                  |
| :---------- | ------------------------------------------------------------ |
| feat        | 新增功能                                                     |
| fix         | 修复问题                                                     |
| polish      | 优化某部分功能                                               |
| docs        | 文档更新                                                     |
| style       | 格式化，代码格式规范修改                                     |
| refactor    | 重构某一部分功能                                             |
| perf        | 性能提升的改动                                               |
| test        | 单元测试相关更新                                             |
| workflow    | 工作流，脚手架                                               |
| ci          | 持续集成相关                                                 |
| chore       | 其他不影响代码的改动的操作，如：更新文档页面赞助商信息，更新贡献者信息等 |


### 2.2 scope
指定改动的范围，尽可能精确到我们改动的内容、如（component、core、dashborad、template、request）如果涉及到多个
### 2.3 subject
主题主要包括一个简洁的改动信息，需要遵循如下规则
>* 使用现在式，如使用change、不使用changed或者changes
* 不用大写第一个字符
* 结尾不要加.
* 冒号后需要加一个空格
* 尽量不要加标点符号

### 2.4 body
Body中需要包含修改的背景以及与之前的差异

### 2.5 footer
Footer主要包含重大更新的信息或者关联的GitHub issues信息。
1）关联的GitHub issues:
```
fix(workflow): handle project init error on linux for scaffold

close #28
```

2）重大更新：
```
perf(core): imporve header render by removing 'logo' option 

BREAKING CHANGE: The 'logo' option has been removed from header conf.
```


## 3.示例
### 3.1 组件中新增新功能
```
feat(component): add nodata tip for nvtrend
```
### 3.2 修复脚手架Bug
```
fix(workflow): handle project init error on linux for scaffold
```
### 3.3 文档更新
```
docs: fix link for logo
```
### 3.4 回滚组件更新
```
revert: feat(component): add nodata tip for nvtrend

This reverts commit e80a92447717dc9cc9187a14e469a38c164a8600.

```
