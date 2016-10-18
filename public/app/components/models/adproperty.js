"use strict";
var ADProperty = (function () {
    function ADProperty(Id, Name, AvailableAsDefault) {
        this.Id = Id;
        this.Name = Name;
        this.AvailableAsDefault = AvailableAsDefault;
        this.NormalizedName = '';
        this.Description = '';
        this.NormalizedName = this.Name.toLowerCase();
        if (this.AvailableAsDefault === undefined) {
            this.AvailableAsDefault = false;
        }
    }
    return ADProperty;
}());
exports.ADProperty = ADProperty;
//# sourceMappingURL=adproperty.js.map