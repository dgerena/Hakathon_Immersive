narrator.service('Session', function() {

    this.create = function(user) {
        this.user_id = user.user_id;
        this.auth_token = user.auth_token;
        this.first_name = user.contact_first_name;
        this.last_name = user.contact_last_name;
    };
    this.destroy = function() {
        this.auth_token = null;
    };
    return this;
})
