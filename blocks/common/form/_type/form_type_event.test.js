modules.define(
    'test',
    ['form_type_event', 'i-bem__dom', 'jquery', 'bh', 'model', 'sinon'],
    function (provide, FormView, DOM, $, bh, Model, sinon) {

    describe('form_type_event', function () {
        describe('when input has been inited', function () {
            var form;
            var model;

            beforeEach(function () {
                model = new Model();
                form = FormView.create(model, {type: 'event'});
            });

            afterEach(function () {
                DOM.destruct(form.domElem);
            });

            it('should emit `save` event', function () {
                var onSave = sinon.spy();
                form.on('save', onSave);
                form.findBlockInside('save', 'button').domElem.click();
                onSave.callCount.should.be.equal(1);
            });

            it('should save form to model', function () {
                form.findBlockInside('title', 'input').setValue('Pam-param');
                form.findBlockInside('participants', 'input').setValue('Alexander');
                form.findBlockInside('description', 'input').setValue('la-la-la');
                form.findBlockInside('save', 'button').domElem.click();
                model.get('title').should.be.equal('Pam-param');
                model.get('participants').should.be.equal('Alexander');
                model.get('description').should.be.equal('la-la-la');
            });

            it('should fill form from model', function () {
                model = new Model({
                    title: 'Pam-param',
                    participants: 'Alexander',
                    description: 'la-la-la'
                });
                form = FormView.create(model, {type: 'event'});
                form.findBlockInside('title', 'input').getValue().should.be.equal('Pam-param');
                form.findBlockInside('participants', 'input').getValue().should.be.equal('Alexander');
                form.findBlockInside('description', 'input').getValue().should.be.equal('la-la-la');
            });

            it('should emit `delete` event', function () {
                var onDelete = sinon.spy();
                form.on('delete', onDelete);
                form.findBlockInside('delete', 'button').domElem.click();
                onDelete.callCount.should.be.equal(1);
            });

            it('should return empty state', function () {
                form.isEmpty().should.be.true;
                form.findBlockInside('participants', 'input').setValue('Alexander');
                form.isEmpty().should.be.false;
            });
        });

        describe('when bh has built bemjson', function () {
            it('should contain 3 inputs', function () {
                var bemjson = FormView.getBEMJSON(null, {type: 'event'});
                bemjson.content.filter(function (block) {
                    return block.block === 'input';
                }).length.should.be.equal(3);
            });

            it('should contain a label', function () {
                var bemjson = FormView.getBEMJSON(null, {type: 'event'});
                bemjson.content.filter(function (block) {
                    return block.block === 'label';
                }).length.should.be.equal(1);
            });

            it('should contain 2 buttons', function () {
                var bemjson = FormView.getBEMJSON(null, {type: 'event'});
                bemjson.content.filter(function (block) {
                    return block.block === 'button';
                }).length.should.be.equal(2);
            });
        });

    });

    provide();
});
