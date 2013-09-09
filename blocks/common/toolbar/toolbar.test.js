modules.define(
    'test',
    ['toolbar', 'i-bem__dom', 'sinon'],
    function (provide, ToolBar, DOM, sinon) {

    describe('toolbar', function () {
        var toolbar;

        beforeEach(function () {
            toolbar = ToolBar.create();
        });

        afterEach(function () {
            DOM.destruct(toolbar.domElem);
        });

        it('should show popup with form by click on `Add` button', function () {
            toolbar.findBlockInside('add', 'button').domElem.click();
            toolbar._popup.isShown().should.be.true;
            toolbar._popup.findBlockInside('form').should.be.ok;
        });

        it('should emit `create` event', function () {
            toolbar.findBlockInside('add', 'button').domElem.click();
            var onCreate = sinon.spy();
            toolbar.on('create', onCreate);
            var form = toolbar._popup.findBlockInside('form');
            form.findBlockInside('title', 'input').setValue('September 15, The meeting');
            form.domElem.submit();
            onCreate.callCount.should.be.equal(1);
        });

        it('should emit `update` event', function () {
            toolbar.findBlockInside('add', 'button').domElem.click();
            var onUpdate = sinon.spy();
            toolbar.on('update', onUpdate);
            toolbar.findBlockInside('update', 'button').domElem.click();
            onUpdate.callCount.should.be.equal(1);
        });
    });

    provide();
});
