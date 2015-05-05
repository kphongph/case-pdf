require([
  'app/datasource',
  'jquery',
  'pdfkit',
  'blob-stream'
], function(ds,$,pdfkit,blobStream) {
  var font_lib = {};

  var doc = new pdfkit();
  var stream = doc.pipe(blobStream());
  doc.text('Hello World',100,100);
  doc.end();

  stream.on('finish', function() {
    var url = stream.toBlobURL('application/pdf');
    $('#mypdf')[0].src = url;
  });

  ds.open('test.json', function() {
    console.log(ds);
  });

  /*
  ds.getFont('THSarabun','normal', function(raw) {
    console.log('found');
  });
  */
  
});
