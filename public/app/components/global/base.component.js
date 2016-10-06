"use strict";
var BaseComponent = (function () {
    function BaseComponent() {
        this.title = 'MEA2N';
        this.authenticated = false;
    }
    BaseComponent.prototype.ngOnInit = function () {
        console.log('In base onInit');
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map