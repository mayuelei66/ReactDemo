var http = require('http'),
    fs = require('fs');
var port = 8000;
http.createServer(function (req, res) {
    if(req.url === "/"){ //req.url has the pathname, check if it conatins '.html'
        fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });

    }

    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

        fs.readFile(__dirname + '/public/app.js', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });

    }

    if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

        fs.readFile(__dirname + '/static/css/style.css', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });

    }
}).listen(port);