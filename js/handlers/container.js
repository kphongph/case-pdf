define([
 'require',
 'jquery',
 'app/handlers/text'
], function(require,$) {

  var containerHandler = function() {
    this.width = null;
    this.height = null;
    this.position = {'x':0,'y':0};
  } 

  containerHandler.prototype.setWidth = function(val) {
    this.width = val;
  };

  containerHandler.prototype.setHeight = function(val) {
    this.height = val;
  };
  
  containerHandler.prototype.setX = function(val) {
    this.position.x = val;
  };

  containerHandler.prototype.setY = function(val) {
    this.position.y = val;
  };

  containerHandler.prototype.handle = function(ctx,c) {
    console.log(this.position);
    if(this.position.x) {
      ctx.doc.x = this.position.x;
    }
    var comObj = require('app/handlers/'+c.component.type);
    this.setY(ctx.doc.y);
    console.log(ctx.doc.x,ctx.doc.y);
    var comHandler = new comObj();
    comHandler.setX(ctx.doc.x);
    comHandler.handle(ctx,c.component);
    console.log(ctx.doc.y);

    this.setHeight(ctx.doc.y-this.position.y);
    console.log(this.height);
    console.log(this.width);

    var style = null;
    if(c.style) {
      style = ctx.style_lib[c.style]; 
    } else {
      style = ctx.style_lib['default'];
    }  
    if(style.background) {
      ctx.doc.rect(this.position.x, this.position.y, 
        this.width, this.height);
      ctx.doc.fill(style.background);
      ctx.doc.stroke();
      ctx.doc.fill("#000000");
    }
  }
  
  return containerHandler;
});
