var $ = require("jquery"),
    should = require("should");

require('../dist/pron');

describe('Pron', function () {

    var testDiv;

    beforeEach(function () {
        testDiv = $('<div></div>');
    });

    it('should be available as a jQuery plugin', function () {
        $.fn.pron.should.be.ok;
    });

    it('should resolve a promise when the event is fired', function (done) {
        testDiv.pron('event').then(function () {
            done();
        });

        testDiv.trigger('event');
    });


    it('should not resolve a promise when the event isn\'t fired', function (done) {
        var timeout = 100;
        this.timeout(timeout);

        testDiv.pron('event').then(function () {
            should.fail();
            done();
        });

        setTimeout(function () {
            done();
        }, timeout * 0.9);
    });

    describe('resolve OR events (single string, space seperated)', function () {

        it('should resolve a promise when the first event is fired', function (done) {
            testDiv.pron('event1 event2').then(function () {
                done();
            });

            testDiv.trigger('event1');
        });

        it('should resolve a promise when the second event is fired', function (done) {
            testDiv.pron('event1 event2').then(function () {
                done();
            });

            testDiv.trigger('event2');
        });
    });

    describe('resolve AND events (multiple strings)', function () {
        var testDiv;

        beforeEach(function () {
            testDiv = $('<div></div>');
        });

        it('should resolve a promise when both events are fired', function (done) {
            testDiv.pron('event1', 'event2').then(function () {
                done();
            });

           testDiv.trigger('event1');
           testDiv.trigger('event2');
        });

        it('should resolve a promise when both events are fired with one event being an OR event', function (done) {
            testDiv.pron('event1', 'event2 event3').then(function () {
                done();
            });

            testDiv.trigger('event1');
            testDiv.trigger('event3');
        });

        it('should not resolve a promise when only one events is fired', function (done) {
            var timeout = 100;
            this.timeout(timeout);

            testDiv.pron('event1', 'event2').then(function () {
                should.fail();
                done();
            });

            setTimeout(function () {
                done();
            }, timeout * 0.9);

            testDiv.trigger('event2');
        });

    });
});