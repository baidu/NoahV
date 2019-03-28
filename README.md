# NoahV

English | [简体中文](./README_ch.md)



<a href="https://github.com/baidu/NoahV/blob/master/LICENSE">
<img src="https://img.shields.io/github/license/baidu/NoahV.svg?style=popout-square" alt="license">
</a>

<a href="https://github.com/baidu/NoahV/issues">
<img src="https://img.shields.io/github/issues/baidu/NoahV.svg?style=flat-square" alt="open issues">
</a>

<a href="https://github.com/baidu/NoahV/commits/master">
	<img src="https://img.shields.io/github/commit-activity/w/baidu/NoahV.svg?style=flat-square" alt="commit">
</a>

A front-end application framework based on vue, easy to handle, suitable for teams lacking front-end engineers，support the monitoring、operation、data analysis and common background management system.


Feture

* Easy to use, provide a variety of commonly used components, and quickly start front-end development.
* Navigation bar, page layout support JSON configuration.
* Templates can be easily reuse,improving the efficiency of development.
* Provide dashboard function,support data analysis scene.
* Useful Command line tools,project init,mockup,devserver start,update and so on.

Document: [http://www.noahv.org/](http://www.noahv.org/)

## Quick Start

NoahV Rely on Nodejs 6.0+,before run following command,please check <a href="https://nodejs.org/en/">Node.js</a> v6.0+ already installed on your system。

1.install command line tools

```shell
# Install noahv-cli
$   npm install noahv-cli -g

# look for help
$   noahv --help
```

2.Init a project

```shell
# Creat a empty folder & run init
$   mkdir project && cd project && noahv init

```

3.Run peoject

```shell
# In the project root directory run start
$   noahv start 
```

4.reuse template

```shell
# In the project root directory run create
$   noahv create

# Choose page type According to the hint,current support form,list,filterlist,chart
```

## Document

* [Quickstart](http://www.noahv.org/#/guide/quickstart)
* [Dashboard](http://www.noahv.org/#/doc/view/guide)


## License

Apache License 2.0
