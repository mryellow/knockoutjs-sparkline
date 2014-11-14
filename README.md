knockoutjs-sparkline
====================

KnockoutJS custom binding for Omnipotent jQuery Sparkline

### Dependancies

* [http://jquery.com/](http://jquery.com/)
* [http://knockoutjs.com/](http://knockoutjs.com/)
* [http://omnipotent.net/jquery.sparkline/](http://omnipotent.net/jquery.sparkline/)
* [http://momentjs.com/](http://momentjs.com/)

### Extended options

#### timeWindowMin
Number of miliseconds to minus from `now` JS epoch.
e.g. 4 hour window = `(60*60*4*1000)`

#### timeWindowMax:
Number of miliseconds to add to `now` JS epoch.
e.g. Leaving a little space on the right = `(60*1000)`

#### dateFormat
For Moment localisation of dates.

* [Moment docs](http://momentjs.com/docs/#/parsing/string-format/)
