var uuid = require('node-uuid');

var Role = function(data){
    this.data = data;
    this.data.concurrencyStamp = uuid.v4();
}

Role.prototype.data = {};

Role.prototype.getId = function(){
    return this.data.id;
}

Role.prototype.getName = function(){
    return this.data.name;
}

Role.prototype.getNormalizedNam = function(){
    return this.data.normalizedname;
}

Role.prototype.getConcurrencyStamp = function(){
    return this.data.concurrencyStamp;
}