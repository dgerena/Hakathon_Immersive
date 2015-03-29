'use strict';
angular.module('thinkCMS').service('Session', function() {

    this.create = function(user) {
        this.user_id = user.uuid;
        this.name = user.name;
        this.facebookId = user.facebookId;
    };
    this.destroy = function() {
        this.user = null;
        this.name = null;
    };
    return this;
});