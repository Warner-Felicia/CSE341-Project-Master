const fs = require('fs');

const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<!DOCTYPE html>');
        res.write('<html lang="en-us">');
        res.write('<head>');
        res.write('<title>My Awesome Page</title>');
        res.write('<style>');
        res.write('body { width: 600px; margin: 50px auto; font: 16px Arial, sans-serif; text-align: center; }');
        res.write('input { height: 30px; width: 50%; margin: 10px auto}');
        res.write('button { color: white; background-color: navy; border: none; display: block; height: 30px; width: 50%; margin: 0px auto; border-radius: 5px}')
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>This is my awesome website!</h1>');
        res.write('<h2>Would you like to sign up?</h2>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Sign Up</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        const usersData = fs.readFileSync('users.txt').toString();
        const users = usersData.split(',');
        res.setHeader('Content-Type', 'text/html');
        res.write('<!DOCTYPE html>');
        res.write('<html lang="en-us">');
        res.write('<head>');
        res.write('<title>My Awesome Page</title>');
        res.write('<style>');
        res.write('body { width: 600px; margin: 50 auto; font: 16px Arial, sans-serif; text-align: center; }');
        res.write('li { list-style-type: none; margin: 5px 0');
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>List of Users</h1>');
        res.write('<ul>');
        users.forEach(user => {
            res.write('<li>' + user + '</li>');
        });
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        let fullName = '';
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            const usernameArray = username.split('+');
            for(let i = 0; i < usernameArray.length; i++) {
                if (i < usernameArray.length - 1) {
                    fullName += usernameArray[i] + ' ';
                } else {
                    fullName += usernameArray[i];
                }
            }
            console.log(fullName);
            let currentUsers = fs.readFileSync('users.txt').toString();
            currentUsers += ',' + fullName;
            fs.writeFileSync('users.txt', currentUsers);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }
};

module.exports = routesHandler;