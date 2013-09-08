# BEM Calendar
This is the assigment for entering Frontend Developer School by [hh.ru](http://hh.ru/locale.do?language=EN). For more details see [requirements of the assigment](doc/issue/README.en.md) (or [original Russian version of the assigment](doc/issue/README.ru.md)).

Project based on [ideas of Nikolas Zakas](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture) and developed using [BEM methodology](http://bem.info).

## Requirements
  * Minimal knowledge about [BEM](http://bem.info/)
  * [nodejs](http://nodejs.org/) >= 0.8.0
  * [npm](http://npmjs.org) >= 1.2.0

## Installation
```
git clone git@github.com:tarmolov/simple-calendar.git
cd simple-calendar
make
```
Then open the link in your [favorite browser](http://browser.yandex.com/):
```
http://localhost:8080/pages/calendar/calendar.html
```

## Project structure
```
.bem                ENB config for building project
.git-hooks          Git hooks
configs             Project configs
src                 Code
src/blocks          Visual blocks for building components
src/core            Core of application
src/components      Widgets
src/vendors         Vendor libraries and helpers
pages               Pages
test                Page for building/running tests
```

## How to develop?
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
