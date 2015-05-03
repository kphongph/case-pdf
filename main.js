require([
  'app/loader',
  'jquery',
  'pdfkit',
  'blob-stream'
], function(loader,$,pdfkit,blobStream) {
  var font_lib = {};

  var doc = new pdfkit();
  var stream = doc.pipe(blobStream());
  doc.text('Hello World',100,100);
  doc.end();

  stream.on('finish', function() {
    var url = stream.toBlobURL('application/pdf');
    $('#mypdf')[0].src = url;
  });

  loader.loadJSON('./test.json',function(content) {
    console.log(content);

    $.each(content.fonts, function(font) {
      font_lib[font] = {};
      $.each(content.fonts[font], function(type) {
        loader.loadRAW(content.fonts[font][type],function(raw) {
          font_lib[font][type] = raw;
        });
      });
    });
  });
  
});
