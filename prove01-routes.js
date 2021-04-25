const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;
    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greeting message</title></head>');
        res.write('<body><p>Hello! This is a greeting message!</p></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Return dummy users</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
        res.write('</html>');
        return res.end();

    }
});

server.listen(3000);