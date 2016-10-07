var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');

var User = function(data){
    this.data = data;
    this.data.Id = uuid.v4();
    this.data.ConcurrencyStamp = uuid.v4();
    this.data.PasswordHash = bcrypt.hashSync(data.Password, 10);
    this.data.NormalizedUserName = this.data.UserName.toUpperCase();
    this.data.NormalizedEmail = this.data.Email.toUpperCase();
}

User.prototype.data = {};

User.prototype.getId = function(){
    return this.data.Id;
}

User.prototype.getUserName = function(){
    return this.data.UserName;
}

User.prototype.getEmail = function(){
    return this.data.Email;
}

User.prototype.getNormalizedUsername = function(){
    return this.data.NormalizedUserName;
}

User.prototype.getNormalizedEmail = function(){
    return this.data.NormalizedEmail;
}

User.prototype.getPhoneNumber = function(){
    return this.data.PhoneNumber;
}

User.prototype.getPhoneNumberConfirmed = function(){
    return this.data.PhoneNumberConfirmed;
}

User.prototype.getConcurrencyStamp = function(){
    return this.data.ConcurrencyStamp;
}

User.prototype.getAccessFailedCount = function(){
    return this.data.AccessFailedCount;
}

User.prototype.setUserName = function(username){
    this.data.UserName = username;
    this.data.NormalizedUserName = this.data.UserName.toUpperCase();
}

User.prototype.setEmail = function(email){
    this.data.Email = email;
    this.data.NormalizedEmail = this.data.email.toUpperCase();
}

User.prototype.setPassword = function(password){
    this.data.PasswordHash = bcrypt.hashSync(password.trim(), 10);
}

User.prototype.setPhoneNumber = function(phonenumber){
    this.data.PhoneNumber;
}

User.prototype.setPhoneNumberConfirmed = function(confirmed){
    this.data.PhoneNumberConfirmed = confirmed;
}

User.prototype.setAccessFailedCount = function(count){
    this.data.accessfailedcount = count;
}

module.exports = User;