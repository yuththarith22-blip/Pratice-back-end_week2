// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const params = new URLSearchParams(body);
            const name = params.get('name') ? params.get('name').trim() : '';

            console.log('Form submission:', name);

            const fs = require('fs');
            const filePath = __dirname + '/submissions.txt';
            fs.appendFile(filePath, name + '\n', (err) => {
                if (err) {
                    console.error('Failed to write submission:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Internal Server Error');
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('Submission received');
            });
        });

        req.on('error', (err) => {
            console.error('Request error:', err);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Bad Request');
        });

        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
