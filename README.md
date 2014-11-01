Pron v0.1.0
==========

Convert jQuery events to jQuery Deferreds

Installation
----------------

Pron supports installation via npm:

    npm install pron

or bower (source and distribution files only, no tests or build tasks):

    bower install pron

Usage
----------

Pron has been developed to support jQuery event syntax as much as possible with additional functionality for multiple required events.

**Single event:**

    $('body').pron('event1).then(function(){ ... });

The promise would resolve when *event1* is triggered.

**Multiple optional events:**

Much like jQuery event syntax, this uses a single string with space seperated events.

    $('body').pron('event1 event2').then(function(){ ... });

The promise would resolve when either *event1* **or** *event2* is triggered.

 **Multiple required events:**   

This takes comma seperate event strings (you can even use multiple optional events within these).

    $('body').pron('event1','event2').then(function(){ ... });

The promise would resolve when both *event1* **and** *event2* and triggered.