define(['jquery'], function($) {

  var textHandler = function() {
    this.width = null;
    this.position = {'x':0,'y':0};
  } 

  textHandler.prototype.setWidth = function(val) {
    this.width = val;
  };
  
  textHandler.prototype.setX = function(val) {
    this.position.x = val;
  };

  textHandler.prototype.handle = function(ctx,c) {
    var style = null;
    if(c.style) {
      style = ctx.style_lib[c.style]; 
    } else {
      style = ctx.style_lib['default'];
    }  

    if(style.font) {
      ctx.doc.font(ctx.font_lib[style.font.face+'-'+style.font.type]);
    }
    if(style.font.size) {
      ctx.doc.fontSize(style.font.size);
    }

    var options = {};

    if(c.options) {
      options = c.options;
    }

    if(this.width) {
      options['width']=this.width;
    }

    if(!c.position) {
      c.position = {};
    }

    if(!c.position.x) {
      console.log(this.position);
      if(!this.position.x) {
        c.position.x = ctx.doc.x;
      } else {
        c.position.x = this.position.x;
      }
    } 

    if(!c.position.y && !this.position.y) {
      c.position.y = ctx.doc.y;
    }

    console.log(c);

    ctx.doc.text(c.text,c.position.x,c.position.y,options);
  }
  
  return textHandler;
});
