module.exports = function(Model, options) {
    'use strict';
    Model.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model
      if (ctx.options.accessToken) {
        Model.defineProperty('ownerId', {type: Number, default: ctx.options.accessToken.userId });
      }
      next();
    });
  };