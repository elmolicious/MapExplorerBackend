'use strict';

Date.prototype.addMinutes = function(minutes){
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};