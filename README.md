# BEM Calendar [![Build Status](https://travis-ci.org/tarmolov/bem-calendar.png?branch=master)](https://travis-ci.org/tarmolov/bem-calendar)

This is [the assigment](doc/issue/README.en.md) for entering Frontend Developer School by [hh.ru](http://hh.ru/locale.do?language=EN).

Project based on [ideas of Nikolas Zakas](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture) and developed using [BEM methodology](http://bem.info).

See also [UML diagrams](doc/uml/README.md) for the project.

## [View demo](http://tarmolov.github.io/bem-calendar/pages/calendar/calendar.html)

## What is inside?

### Features
  * [Static code analyser and codestyle checking with jsint and jscs](#static-code-analyser-and-codestyle-checking)
  * [More than 100 unit tests with mocha and phantomjs](#run-tests)
  * Auto sorting css rules with csscomb
  * Using [git hooks](http://github.com/tarmolov/git-hooks) to lint your code, run tests, and auto sorting css rules before each commit
  * CI using [travis](https://travis-ci.org/tarmolov/bem-calendar): lint javascript code and  run tests after each push, then publish a new version of calendar to gh-pages if all tests has been passed

### Methodologies, libraries, and frameworks
  * [BEM](http://bem.info/) — a Block-Element-Modifier methodology for developing frontend
  * [bh](https://github.com/enb-make/bh) — a templates engine for BEM methodology
  * [ymaps modules](https://github.com/ymaps/modules) — a modules system
  * [express](http://expressjs.com/) — a web application framework for node
  * [vow](https://github.com/dfilatov/jspromise) — the fastest Promise/A+ implementation
  * [inherit](https://github.com/dfilatov/node-inherit) — an inheritance syntax sugar

### Tools
  * [enb](http://enb-make.info) — the fastest builder for BEM projects
  * [borschik](https://github.com/bem/borschik) — an extendable builder for text-based file formats (css and javascript, for example)
  * [jshint-groups](https://github.com/ikokostya/jshint-groups) — a [JSHint](jshint.com) wrapper allowing validate filesets with different jshint options
  * [jscs](https://github.com/mdevils/node-jscs) — a code style checker for javascript
  * [csscomb](https://github.com/csscomb/csscomb.js) — a coding style formatter for CSS
  * [git-hooks](https://github.com/icefox/git-hooks) — a tool for git hooks managment
  * [mocha](http://visionmedia.github.io/mocha/) + [chai](http://chaijs.com/) + [sinon](http://sinonjs.org/) + [phantomjs](http://phantomjs.org/) — testing client javascript

## Project structure
```
.bem                ENB config for building project
.git-hooks          Git hooks
docs                Documentation
blocks              Code
blocks/common       Visual blocks for building components
blocks/core         Core of application
blocks/components   Modules
blocks/interfaces   Description of Interfaces
blocks/vendors      Vendor libraries and helpers
pages               Pages
test                Special page for building/running tests
```

## How to develop?

### Requirements
  * [nodejs](http://nodejs.org/) >= 0.8.0
  * [npm](http://npmjs.org) >= 1.2.0

### Installation
```
git clone git@github.com:tarmolov/bem-calendar.git
cd bem-calendar
make
```
Then open the link in your [favorite browser](http://browser.yandex.com/):
```
http://localhost:8080/pages/calendar/calendar.html
```
### Build project and run enb server
```
make
```

### Static code analyser and codestyle checking
```
make lint
```

### Run tests
In console:
```
make test
```

In browser:
```
make
```
Then open the link in your [favorite browser](http://browser.yandex.com/):
```
http://localhost:8080/test/test.html
```

Or you can look at screenshoots generated using [BrowserStack](http://www.browserstack.com/):
  * [The start screen](http://www.browserstack.com/screenshots/18d918bb9bb188f9df08b436be34835ad01735f7).
  * [With opened popups](http://www.browserstack.com/screenshots/0742d8374fe1836f15e8774719e465a2adade766).

## Contribution
See [Contribution guide](CONTRIBUTION.md) for more information.
