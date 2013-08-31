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

        _id: 'navigation',

        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this._id);
            this._element.append(NavigationView.create({
                currentDate: sandbox.getModel().get('currentDate')
            }).domElem);
        }
    }));

});
