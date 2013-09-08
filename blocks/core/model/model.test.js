modules.define(
    'test',
    ['model', 'model_type_list', 'sinon'],
    function (provide, Model, ListModel, sinon) {

    describe('model', function () {
        var model;

        beforeEach(function () {
            model = new Model({
                foo: 1,
                bar: 2
            });
        });

        it('should set attributes from constructor', function () {
            model.get('foo').should.be.equal(1);
            model.get('bar').should.be.equal(2);
        });

        it('should set one attribute', function () {
            model.set('foo', 3);
            model.get('foo').should.be.equal(3);
        });

        it('should set many attributes', function () {
            model.set({
                foo: 3,
                bar: 4
            });
            model.get('foo').should.be.equal(3);
            model.get('bar').should.be.equal(4);
        });

        it('should notify about changes', function () {
            var onFooChanged = sinon.spy();
            model.on('change:foo', onFooChanged);
            model.set('foo', 3);
            onFooChanged.callCount.should.be.equal(1);
        });

        it('should notify about group changes only once', function () {
            var onChanged = sinon.spy();
            model.on('change', onChanged);
            model.set({
                foo: 3,
                bar: 4
            });
            onChanged.callCount.should.be.equal(1);
        });

        describe('when array and object are passed to model constructor', function () {
            beforeEach(function () {
                model = new Model({
                    foo: [
                        {
                            baz: 1
                        }
                    ],
                    bar: {
                        baz: 2
                    }
                });
            });

            it('should create Model instead of object', function () {
                model.get('bar').should.be.an.instanceof(Model);
            });

            it('should create ListModel instead of array', function () {
                model.get('foo').should.be.an.instanceof(ListModel);
            });

            it('should notify about changes in nested models', function () {
                var onChanged = sinon.spy();
                model.on('change', onChanged);
                model.get('bar').set('baz', 3);
                onChanged.callCount.should.be.equal(1);
            });

            it('should notify about changes in nested list models', function () {
                var onChanged = sinon.spy();
                model.on('change', onChanged);
                model.get('foo').add(new Model());
                onChanged.callCount.should.be.equal(1);
            });
        });

        it('should unsubscribe from replaced models', function () {
            var nestedModel = new Model();
            var nestedModel2 = new Model();
            var onChanged = sinon.spy();
            model.set('baz', nestedModel);
            model.set('baz', nestedModel2);
            model.on('change', onChanged);
            nestedModel.set('foo', 1);
            nestedModel2.set('foo', 1);
            onChanged.callCount.should.be.equal(1);
        });

        it('should generate json for model', function () {
            var initialData = {
                foo: [
                    {baz: 1}
                ],
                bar: {bus: 2}
            };
            model = new Model(initialData);
            JSON.stringify(model.toJSON()).should.be.equal(JSON.stringify(initialData));
        });

    });

    provide();
});
