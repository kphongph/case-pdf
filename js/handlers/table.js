define([
  'require',
  'jquery',
  'app/handlers/text'
],function(require,$) {

  var tableHandler = function() {
    this.left = 0;
    this.right = 0;
  }

  tableHandler.prototype.handle = function(ctx,c) {
    
    var thisObj = this;
    var col_widths = [];

    console.log('Page :',ctx.doc.page.width,ctx.doc.page.height);
    console.log('Margin :',ctx.doc.page.margins);
    
    $.each(c.widths, function(idx, val) {
      console.log(ctx.doc.x,ctx.doc.y);
      var intVal = parseInt(val);
      var cx = ctx.doc.x;
      if(idx == 0) {
        console.log('set left',cx);
        thisObj.left = cx; 
      }
      var cy = ctx.doc.y;
      ctx.doc.moveTo(cx,cy);
      ctx.doc.lineTo(cx+intVal,cy);
      ctx.doc.x = cx+intVal;
      ctx.doc.stroke();
    });

    $.each(c.body, function(r_idx, row) {
      $.each(row, function(c_idx, col) {  
        var handler = require("app/handlers/"+col.type);
        var col_handler = new handler();
        if(c_idx == 0) {
          console.log('Left',thisObj.left);
          col_handler.setX(thisObj.left);
        }
        col_handler.setWidth(100);
        console.log(col);
        col_handler.handle(ctx,col);
      });
    });
  };

  return tableHandler;
});
