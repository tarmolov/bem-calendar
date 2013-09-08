modules.define(
    'test',
    ['utils__date'],
    function (provide, dateUtils) {

    describe('utils__date', function () {
        it('should return name of month', function () {
            dateUtils.getMonthName(4).should.be.equal('May');
        });

        it('should return number of month', function () {
            dateUtils.getMonthNumber('May').should.be.equal(4);
        });

        it('should return name of week day', function () {
            dateUtils.getWeekDayName(4).should.be.equal('Thursday');
        });

        it('should calculate days in month', function () {
            dateUtils.daysInMonth(11, 2012).should.be.equal(31);
            dateUtils.daysInMonth(0, 2013).should.be.equal(31);
        });

        it('should nomalize date', function () {
            var date = new Date(2013, 8, 15);
            var normalizedDate = dateUtils.normalize(date);

            normalizedDate.getFullYear().should.be.equal(2013);
            normalizedDate.getMonth().should.be.equal(8);
            normalizedDate.getDate().should.be.equal(15);
            normalizedDate.getHours().should.be.equal(0);
            normalizedDate.getMinutes().should.be.equal(0);
            normalizedDate.getSeconds().should.be.equal(0);
            normalizedDate.getMilliseconds().should.be.equal(0);

            normalizedDate = dateUtils.normalize(date, true);
            normalizedDate.getDate().should.be.equal(1);
        });

        it('should formate date', function () {
            var date = new Date(2013, 8, 15);
            dateUtils.formatDate(date).should.be.equal('September 15, 2013');
        });
    });

    provide();
});
