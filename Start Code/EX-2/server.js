const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    switch (url) {
        case '/':
            if (method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`
                    <html>
                        <head><title>Home</title></head>
                        <body>
                            <h1>Welcome to the Home Page</h1>
                            <p>This is a simple Node.js server.</p>
                        </body>
                    </html>
                `);
            }
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            return res.end('405 Method Not Allowed');

        case '/about':
            if (method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('About us: at CADT, we love node.js!');
            }
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            return res.end('405 Method Not Allowed');

        case '/contact-us':
            if (method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('You can reach us via email...');
            }
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            return res.end('405 Method Not Allowed');

        case '/products':
            if (method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('Buy one get one...');
            }
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            return res.end('405 Method Not Allowed');

        case '/projects':
            if (method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('Here are our awesome projects');
            }
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            return res.end('405 Method Not Allowed');

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
