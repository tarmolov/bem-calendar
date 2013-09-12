modules.define(
    'test',
    ['popup', 'i-bem__dom', 'bh', 'jquery', 'sinon'],
    function (provide, Popup, DOM, bh, $, sinon) {

    describe('popup', function () {
        var popup;
        var targetNode;
        var windowWidth;
        var windowHeight;

        beforeEach(function () {
            targetNode = $('<div/>').appendTo('body');
            popup = Popup.create({
                direction: 'right',
                content: 'test'
            });
            windowWidth = sinon.stub(popup.__self.win, 'width').returns(300);
            windowHeight = sinon.stub(popup.__self.win, 'height').returns(300);
        });

        afterEach(function () {
            DOM.destruct(popup.domElem);
            targetNode.remove();
            windowWidth.restore();
            windowHeight.restore();
        });

        it('should show popup', function () {
            popup.show(targetNode);
            $.contains(document.body, popup.domElem[0]).should.be.true;
            popup.isShown().should.be.true;
        });

        it('should hide popup', function () {
            popup.show(targetNode);
            popup.hide();
            popup.isShown().should.be.false;
        });

        it('should set content', function () {
            popup.setContent('tro-lo-lo');
            popup.findElem('content').text().should.be.equal('tro-lo-lo');
        });

        describe('when bh has built bemjson', function () {
            it('should contain close elem', function () {
                bh.processBemJson({block: 'popup'}).content[1].elem.should.be.equal('close');
            });
        });
    });

    provide();
});
