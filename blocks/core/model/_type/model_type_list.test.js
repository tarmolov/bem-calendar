modules.define(
    'test',
    ['model_type_list', 'model', 'sinon'],
    function (provide, ListModel, Model, sinon) {

    describe('ListModel', function () {
        var list;

        beforeEach(function () {
            list = new ListModel();
        });

        it('should add model to the list', function () {
            list.length().should.be.equal(0);
            list.add(new Model());
            list.length().should.be.equal(1);
        });

        it('should remove model to the list', function () {
            var model = new Model();
            list.add(model);
            list.length().should.be.equal(1);
            list.remove(model);
            list.length().should.be.equal(0);
        });

        it('should cast change event when list changed', function () {
            var onChanged = sinon.spy();
            list.on('change', onChanged);
            var model = new Model();
            list.add(model);
            list.length().should.be.equal(1);
            list.remove(model);
            list.length().should.be.equal(0);
            onChanged.callCount.should.be.equal(2);
        });

        it('should generate json', function () {
            var desirableResult = [
                {foo: 1},
                {bar: 1}
            ];
            list.add(new Model({foo: 1}));
            list.add(new Model({bar: 1}));
            JSON.stringify(list.toJSON()).should.be.equal(JSON.stringify(desirableResult));
        });
    });

    provide();
});
