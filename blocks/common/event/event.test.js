modules.define(
    'test',
    ['event', 'i-bem__dom', 'model', 'should', 'sinon'],
    function (provide, Event, DOM, Model, should, sinon) {

    describe('event', function () {
        var event;
        var model;

        beforeEach(function () {
            model = new Model();
            event = Event.create(model);
        });

        afterEach(function () {
            DOM.destruct(event.domElem);
        });

        it('should open popup by click', function () {
            event.domElem.click();
            Event.getPopup().isShown().should.be.true;
        });

        it('should open popup using openPopup method', function () {
            event.openPopup();
            Event.getPopup().isShown().should.be.true;
        });

        it('should close popup using closePopup method', function () {
            event.openPopup();
            event.closePopup();
            Event.getPopup().isShown().should.be.false;
        });

        it('should create form after opening popup', function () {
            event.openPopup();
            should.exist(event._form);
        });

        it('should destruct form after closing popup', function () {
            event.openPopup();
            event.closePopup();
            should.not.exist(event._form);
        });

        it('should click on save button', function () {
            var onSave = sinon.spy();
            event.on('save', onSave);

            event.domElem.click();
            Event.getPopup().findBlockInside('form').findBlockInside('save', 'button').domElem.click();
            Event.getPopup().isShown().should.be.false;
            onSave.callCount.should.be.equal(1);
        });

        it('should click on delete button', function () {
            var onDelete = sinon.spy();
            event.on('delete', onDelete);

            event.domElem.click();
            Event.getPopup().findBlockInside('form').findBlockInside('delete', 'button').domElem.click();
            Event.getPopup().isShown().should.be.false;

            // One event after delete click and second one — after checking form with isEmpty
            onDelete.callCount.should.be.equal(2);
        });

        it('should contains title and participants elems', function () {
            event.elem('title').length.should.be.equal(1);
            event.elem('participants').length.should.be.equal(1);
        });

        it('should create only popup once', function () {
            var popup1 = Event.getPopup();
            var popup2 = Event.getPopup();
            popup1.should.be.equal(popup2);
        });

        it('should trigger delete event after closing empty form', function () {
            var onDelete = sinon.spy();
            event.on('delete', onDelete);
            event.openPopup();

            Event.getPopup().hide();

            onDelete.callCount.should.be.equal(1);
        });
    });

    provide();
});
