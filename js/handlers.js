define([
  "require",
  "app/handlers/text",
  "app/handlers/table",
], function(require) {
   var handlers = function(ctx, content) {
     console.log(content);
     var obj = require("app/handlers/"+content.type);
     var handler = new obj();
     handler.handle(ctx,content);
   };
   return handlers;
});
