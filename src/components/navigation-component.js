modules.define(
    'navigation-component',
    [
        'inherit',
        'base-component',
        'navigation'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        NavigationView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this);
            this._sandbox = sandbox;
            this._model = sandbox.getModel()
                .on('change:currentDate', this._onCurrentDateChanged, this);
            this._view = NavigationView.create({
                currentDate: this._model.get('currentDate')
            })
                .on('prev', this._onPrevClick, this)
                .on('next', this._onNextClick, this)
                .on('current', this._onCurrentClick, this);

            this._element.append(this._view.domElem);
        },

        _onPrevClick: function () {
            var currentDate = new Date(this._model.get('currentDate'));
            currentDate.setMonth(currentDate.getMonth() - 1);
            this._model.set('currentDate', currentDate);
        },

        _onNextClick: function () {
            var currentDate = new Date(this._model.get('currentDate'));
            currentDate.setMonth(currentDate.getMonth() + 1);
            this._model.set('currentDate', currentDate);
        },

        _onCurrentClick: function () {
            this._model.set('currentDate', new Date());
        },

        _onCurrentDateChanged: function () {
            this._view.setTitle({
                currentDate: this._model.get('currentDate')
            });
        }
    }, {
        getName: function () {
            return 'navigation';
        }
    }));

});
