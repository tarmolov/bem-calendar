# BEM Calendar [![Build Status](https://travis-ci.org/tarmolov/bem-calendar.png?branch=master)](https://travis-ci.org/tarmolov/bem-calendar)

This is [the assigment](doc/issue/README.en.md) for entering Frontend Developer School by [hh.ru](http://hh.ru/locale.do?language=EN).

Project based on [ideas of Nikolas Zakas](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture) and developed using [BEM methodology](http://bem.info).

## [View demo](http://tarmolov.github.io/bem-calendar/pages/calendar/calendar.html)

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

## Contribution
See [Contribution guide](CONTRIBUTION.md) for more information.
