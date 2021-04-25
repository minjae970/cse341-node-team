const { resolveSoa } = require('dns');
const http = require('http');
var userArray = [];
const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body><form action="/create-user" method="POST"><label for="username">Username:</label><br><input type="text" name="username"><br><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url ==='/create-user'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            userArray.push (parsedBody.split('=')[1]);
            console.log(userArray);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }

    if (url === '/users'){
        
  
        if(userArray.length === 0)
        {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Return list of users</title></head>');
            res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
            res.write('</html>');
            return res.end();
        }
        if(userArray != null)
        {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Return list of users</title></head>');
            res.write('<body><ul>');
            for(var i = 0; i < userArray.length; i++)
            {
                res.write('<li>');
                res.write(userArray[i]);
                res.write('</li>')
            }
            res.write('</ul></body>');
            res.write('</html>');
            return res.end();
        }
    
    }

    
});

server.listen(3000);