const http = require("http");
const fs = require("fs");
var url = require("url");

const port = process.env.PORT || 8081;

fs.readFile('./views/input.txt', (err, data) =>{
    if (err) {
        throw err;
    }
    else {
        console.log(data.toString());
    }
});
console.log("Program Ended");

fs.stat('./views/input.txt', function (err, stats) {
    if (err) {
        throw err;
    }
    console.log(stats);
    console.log("Got file info successfully!");

    // Check file type
    console.log("isFile ? " + stats.isFile());
    console.log("isDirectory ? " + stats.isDirectory());
});


fs.appendFile('./views/input.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Data Appened!');
    //fs.readFile('./views/input.txt', function (err, data) {
    //    console.log("new updated content :  " + data);
    //});
});

fs.writeFile('./views/input.txt', 'Demo Node Js FS module', function (err) {
    if (err) throw err;
    console.log('Replaced Content of File!');
});

//Deleting a file- create a file testDelete.txt, then run this
//fs.unlink('./views/testDelete.txt',  (err) =>{
//    if (err) throw err;
//    console.log('File deleted!');
//});

fs.open('./views/sample.txt', 'r',  (err, fd) => {
    if (err) throw err;
    console.log("File opened successfully!");
    fs.close(fd, (err) => {
        if (err) throw err;
    });
});
http.createServer((req, res) => {
    var pathName = url.parse(req.url).pathname;
    console.log(pathName);
    fs.readFile('./views/input.txt', function (err, data) {   
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Welcome to the Node JS application..");
        res.write(data);
        res.end();
    });
    

}).listen(8081);


console.log(`Server listening on port ${port}...`);
