modules.define(
    'test',
    ['form_type_quick-event', 'i-bem__dom', 'jquery', 'bh', 'sinon'],
    function (provide, FormView, DOM, $, bh, sinon) {

    describe('form_type_quick-event', function () {
        describe('when input has been inited', function () {
            var form;

            beforeEach(function () {
                form = FormView.create(null, {type: 'quick-event'});
            });

            afterEach(function () {
                DOM.destruct(form.domElem);
            });

            it('should emit event with a right date', function () {
                var onCreate = sinon.spy();
                form.on('create', onCreate);
                form.findBlockInside('title', 'input').setValue('September 5');
                form.domElem.submit();

                var now = new Date();
                var date = new Date(now.getFullYear(), 8, 5);
                onCreate.callCount.should.be.equal(1);
                onCreate.args[0][1].get('date').should.be.equal(date.getTime());
            });

            it('should emit event with default month', function () {
                var onCreate = sinon.spy();
                form.on('create', onCreate);
                form.findBlockInside('title', 'input').setValue('zzz 5');
                form.domElem.submit();

                var now = new Date();
                var date = new Date(now.getFullYear(), now.getMonth(), 5);
                onCreate.args[0][1].get('date').should.be.equal(date.getTime());
            });

            it('should emit event if only date is specified', function () {
                var onCreate = sinon.spy();
                form.on('create', onCreate);
                form.findBlockInside('title', 'input').setValue('5');
                form.domElem.submit();

                var now = new Date();
                var date = new Date(now.getFullYear(), now.getMonth(), 5);
                onCreate.args[0][1].get('date').should.be.equal(date.getTime());
            });

            it('should emit event with a right title', function () {
                var onCreate = sinon.spy();
                form.on('create', onCreate);
                form.findBlockInside('title', 'input').setValue('September 5, Birthday');
                form.domElem.submit();
                onCreate.callCount.should.be.equal(1);
                onCreate.args[0][1].get('title').should.be.equal('Birthday');
            });

            it('shouldn\'t emit event for wrong data', function () {
                var onCreate = sinon.spy();
                form.on('create', onCreate);
                form.domElem.submit();
                onCreate.callCount.should.be.equal(0);
            });
        });

        describe('when bh has built bemjson', function () {
            it('should contain input', function () {
                var bemjson = FormView.getBEMJSON(null, {type: 'quick-event'});
                bemjson.content.filter(function (block) {
                    return block.block === 'input';
                }).length.should.be.equal(1);
            });

            it('should contain button', function () {
                var bemjson = FormView.getBEMJSON(null, {type: 'quick-event'});
                bemjson.content.filter(function (block) {
                    return block.block === 'button';
                }).length.should.be.equal(1);
            });
        });

    });

    provide();
});
