"use strict";
var ADProperty = (function () {
    function ADProperty(Id, Name) {
        this.Id = Id;
        this.Name = Name;
        this.NormalizedName = '';
        this.Description = '';
        this.NormalizedName = this.Name.toLowerCase();
    }
    return ADProperty;
}());
exports.ADProperty = ADProperty;
//# sourceMappingURL=adproperty.js.map