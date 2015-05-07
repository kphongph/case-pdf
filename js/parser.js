define([
  'app/datasource',
  'jquery',
  'app/handlers',
  'pdfkit',
  'blob-stream'
], function(ds,$,handlers,pdfkit,blobStream) {

  var parser = function(url,config) {
    var parserObj = this;
    var context = null;
    var doc = null;
    var font_lib = {};
    var style_lib = {};

    var styleHandler = function(style,doc) {
      if(style.font) {
        doc.font(font_lib[style.font.face+'-'+style.font.type]);
      }
      if(style.font.size) {
        doc.fontSize(style.font.size);
      }
    }


    ds.open(url, function(ctx) {
 
      var doc = new pdfkit();
      var stream = doc.pipe(blobStream());

      stream.on('finish', function() {
        config.finish(stream.toBlobURL('application/pdf'));
      });

      parserObj.context = ctx;
      ctx.doc = doc;

      // load all required fonts

      var loadFonts = function(ctx, cb) {
        var count = 0;
        $.each(ctx.json.fonts, function(idx,font) {
          font['raw'] = null;
          count++;
          ctx.getFont(font.url, function(rawFont) {
            count--;
            font_lib[font.face+'-'+font.type] = rawFont;
            console.log(font.face,'[',font.type,'] loaded');
            if(count == 0) {
              cb();
            }
          });
        });
      };

      var loadStyles = function(ctx) {
        var count = 0;
        $.each(ctx.json.styles, function(idx, style) {
          style_lib[style.id] = style;
        });
        console.log(style_lib);
        
      };

      loadFonts(ctx, function() {
        ctx.font_lib = font_lib;
        loadStyles(ctx);
        ctx.style_lib = style_lib;
        parseContent(ctx);
      });

      var parseContent = function(ctx) {
        console.log(ctx.json);
        $.each(ctx.json.pages, function(idx,page) {
          if(idx!=0) {
            doc.addPage();
          }
          $.each(page.contents, function(idx,c) {
            handlers(ctx,c);
          });
        });
        doc.end();
      };
    });
  };

  return parser;
});
