const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
    switch (url.parse(request.url).pathname) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(fs.readFileSync('./index.html'));
            break;
        case '/happyuserwidget.js':
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.end(fs.readFileSync('./happyuserwidget.js'));
            break;
        case '/json_samples/showQuestionResponse.json':
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(fs.readFileSync('./json_samples/showQuestionResponse.json'));
            break;
        case '/json_samples/npsRatingResponse_categories.json':
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(fs.readFileSync('./json_samples/npsRatingResponse_categories.json'));
            break;
        case '/json_samples/chosenCategoryResponse.json':
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(fs.readFileSync('./json_samples/chosenCategoryResponse.json'));
            break;
        case '/json_samples/npsRatingResponse_social-icons.json':
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(fs.readFileSync('./json_samples/npsRatingResponse_social-icons.json'));
            break;
        case '/json_samples/npsRatingResponse_message.json':
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(fs.readFileSync('./json_samples/npsRatingResponse_message.json'));
            break;
        case 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(fs.readFileSync('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'));
            break;
        default:
            break;
    }

}).listen(8000, () => {
    console.log('Run at port:8000')
})