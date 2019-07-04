# NoahV

[简体中文](./README.md) | English


<a href="https://travis-ci.org/baidu/NoahV">
	<img src="https://img.shields.io/travis/baidu/NoahV/master.svg?style=flat-square"  alt="build">
</a>

<a href="https://github.com/baidu/NoahV/blob/master/LICENSE">
	<img src="https://img.shields.io/github/license/baidu/NoahV.svg?style=popout-square" alt="license">
</a>

<a href="https://github.com/baidu/NoahV/issues">
	<img src="https://img.shields.io/github/issues/baidu/NoahV.svg?style=flat-square" alt="open issues">
</a>

<a href="https://github.com/baidu/NoahV/commits/master">
	<img src="https://img.shields.io/github/commit-activity/w/baidu/NoahV.svg?style=flat-square" alt="commit">
</a>

A front-end application framework based on Vue, easy to handle, is suitable for teams lacking front-end engineers, it can be 
be used in the field of operation and maintenance monitoring, data analysis and common background management system, etc.


Feature

* Easy to use, provide a variety of commonly used components, and quickly start front-end development.
* Navigation bar, page layout support JSON configuration.
* Templates can be easily reused to improve the efficiency of development.
* Provide the operation and maintenance dashboard feature, especially for the monitoring data analysis 
* Provide the scaffold command line tool to init the project, mockup the API data, start the devserver, update the system and so on.

Document: [https://www.noahv.org/](https://www.noahv.org/)

## Quick Start

NoahV rely on Nodejs 6.0+, please check <a href="https://nodejs.org/en/">Node.js</a> v6.0+ already installed on your system before run following commands.

1.Install command line tools

```shell
# Install noahv-cli
$ npm install noahv-cli -g

# Look for help
$ noahv --help
```

2.Init project

```shell
# Create an empty folder & run init
$ mkdir project && cd project && noahv init

```

3.Run project

```shell
# Run noahv start in the project root directory
$ noahv start 
```

4.Reuse template

```shell
# Run noahv create in the project root directory
$ noahv create

# Choose page type According to the hint,support form,list,filterlist,chart at present
```

## Document

* [Quickstart](http://www.noahv.org/#/guide/quickstart)
* [Dashboard](http://www.noahv.org/#/doc/view/guide)


## License

Apache License 2.0
