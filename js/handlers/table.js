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
    var padding = {
      left:5,
      right:5,
      top:5,
      bottom:5
    };
    var thisObj = this;
    var col_widths = [];
    var table_pos = {};
    
    if(c.padding) {
      $.each(padding, function(key) {
        if(c.padding[key]) {
          padding[key]=c.padding[key];
        }
      });
    }

    console.log('Page :',ctx.doc.page.width,ctx.doc.page.height);
    console.log('Margin :',ctx.doc.page.margins);
    
    $.each(c.widths, function(idx, val) {
      var intVal = parseInt(val);
      var cx = ctx.doc.x;
      if(idx == 0) {
        table_pos.left = cx;
      }
      var cy = ctx.doc.y;

      col_widths.push(intVal);

      ctx.doc.moveTo(cx,cy);
      ctx.doc.lineTo(cx+intVal,cy);
      ctx.doc.x = cx+intVal;
      ctx.doc.stroke();
      table_pos.right = ctx.doc.x;
    });

    $.each(c.body, function(r_idx, row) {
      var row_y = ctx.doc.y;
      var row_h = 0;
      $.each(row, function(c_idx, col) {  
        var col_x = table_pos.left;
        var handler = require("app/handlers/"+col.type);
        var col_handler = new handler();
        for(var i=0;i<c_idx;i++) {
          col_x+=col_widths[i];
        }
        col_handler.setX(col_x+padding.left);
        ctx.doc.y += padding.top;
        col_handler.setWidth(col_widths[c_idx]-
          (padding.left+padding.right));
        col_handler.handle(ctx,col);
        ctx.doc.y += padding.bottom;
        if(ctx.doc.y > row_h) {
          row_h = ctx.doc.y;
        } 

        if(c_idx != (row.length-1)) {
          ctx.doc.y = row_y;
        }
      });

      var pos_x = table_pos.left;
      $.each(col_widths, function(idx, value) {
        ctx.doc.moveTo(pos_x,row_y);
        ctx.doc.lineTo(pos_x,row_h);
        pos_x+=value;
        ctx.doc.stroke();
      });
      ctx.doc.moveTo(pos_x,row_y);
      ctx.doc.lineTo(pos_x,row_h);
      ctx.doc.stroke();

      ctx.doc.moveTo(table_pos.left,row_h);
      ctx.doc.lineTo(table_pos.right,row_h);
      ctx.doc.stroke();
    });
  };

  return tableHandler;
});
