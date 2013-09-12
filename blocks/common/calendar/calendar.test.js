modules.define(
    'test',
    ['calendar', 'event', 'i-bem__dom', 'model', 'jquery', 'bh', 'should'],
    function (provide, Calendar, EventView, DOM, Model, $, bh, should) {

    describe('calendar', function () {
        describe('when calendar has been inited', function () {
            var model;
            var calendar;

            beforeEach(function () {
                var date = new Date(2013, 05, 06).getTime();
                model = new Model({
                    currentDate: date,
                    selectedDate: date,
                    events: []
                });
                calendar = Calendar.create(model);
            });

            afterEach(function () {
                DOM.destruct(calendar.domElem);
            });

            it('should add event and open balloon by cell click', function () {
                model.get('events').length().should.be.equal(0);
                var cell = calendar.elem('cell')[3];
                $(cell).click();
                model.get('events').length().should.be.equal(1);
                var elemParams = calendar.elemParams($(cell));
                model.get('events').getItemByIndex(0).get('date').should.be.equal(elemParams.date);
                should.exist(calendar.findBlockInside('event'));
                EventView.getPopup().isShown().should.be.true;
            });

            it('should highlight curent date', function () {
                var selectedCell = calendar.findElem('cell', 'current', 'yes');
                should.exist(selectedCell);
                var elemParams = calendar.elemParams(selectedCell);
                elemParams.date.should.be.equal(model.get('selectedDate'));
            });

            describe('when model has events', function () {
                beforeEach(function () {
                    var date = new Date(2013, 05, 06).getTime();
                    model = new Model({
                        currentDate: date,
                        selectedDate: date,
                        events: [
                            {
                                date: new Date(2013, 05, 04).getTime(),
                                title: 'The meeting',
                                participants: 'Alexander, Petr',
                                description: 'Meeting description'
                            }
                        ]
                    });
                    calendar = Calendar.create(model);
                });

                it('should add these events with right data', function () {
                    var event = calendar.findBlockInside('event');
                    var eventModel = model.get('events').getItemByIndex(0);
                    should.exist(event);
                    event.params.date.should.be.equal(eventModel.get('date'));
                    event.params.title.should.be.equal(eventModel.get('title'));
                    event.params.participants.should.be.equal(eventModel.get('participants'));
                    event.params.description.should.be.equal(eventModel.get('description'));
                });
            });
        });

        describe('when bh has built bemjson', function () {
            var bemjson;

            beforeEach(function () {
                bemjson = {
                    block: 'calendar',
                    content: [
                        {
                            elem: 'content',
                            content: {
                                elem: 'row',
                                content: [
                                    {elem: 'cell', content: 'test'}
                                ]
                            }
                        }
                    ]
                };
            });

            it('should have `table', function () {
                bh.processBemJson(bemjson).tag.should.be.equal('table');
            });

            it('should contain tbody', function () {
                bh.processBemJson(bemjson).content[0].tag.should.be.equal('tbody');
            });

            it('should contain row', function () {
                var tbody = bh.processBemJson(bemjson).content[0];
                tbody.content.tag.should.be.equal('tr');
            });

            it('should contain cell with inner cell', function () {
                var tbody = bh.processBemJson(bemjson).content[0];
                var row = tbody.content;
                var cell = row.content[0];
                cell.tag.should.be.equal('td');
                cell.content.elem.should.be.equal('cell-inner');
            });

            it('should create cell with right content', function () {
                var tbody = bh.processBemJson(bemjson).content[0];
                var row = tbody.content;
                var cell = row.content[0];
                cell.content.content.should.be.equal('test');
            });
        });

    });

    provide();
});
