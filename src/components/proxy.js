var https = require('https');
var url = require('url');
var request = require("request");
const TMDB_API_KEY = "ab38ad17d2dc09ef1cf0d2762fcfd521"; //The movie database API Key
const APP_ID = "2969026049798536"
const YT_API_KEY = "AIzaSyCimwH_Z2FzDnrcqAxiyiyLk4p73NezQug";//Youtube Data API key

let top_rated_req = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + TMDB_API_KEY + "&language=en-US&page=1"; //top rated request
let config_req = "https://api.themoviedb.org/3/configuration?api_key=" + TMDB_API_KEY; //config request
//get popular movies request
let popular_req = "https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_API_KEY + "&language=en-US&page=1";
//get search movies quest
//let search_req = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=en-US&page=1&include_adult=false" + "&query=";
//get upcoming movies request
let upcoming_req = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + TMDB_API_KEY + "&language=en-US&page=1";

//Youtube Data API, search videos request
let YT_search_req = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=" + YT_API_KEY  + "&q=";
console.log("A Proxy Server have started running...");

const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

//create a server object
https.createServer(options, function (req,res){
    //the url of the request that sent to the proxy server
    let request_url = req.url;
    console.log(request_url);
    //if the sent request url is to get top rated movies, call top rated request
    if(request_url === "/toprated"){
        request(top_rated_req, function(error, response, body){
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});//response header
            res.write(body);//send the response back
            res.end();//end the response
        });
    }else if(request_url === "/popular"){//if request for popular movies
        request(popular_req, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    }else if(request_url === "/config"){// if request for configuration details
        request(config_req, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    }else if (request_url === "/upcoming") {//if request for upcoming movies
        request(upcoming_req, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    }else if (request_url.includes("/?year=")) {// if request for certain year's movies
        let search_req = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=en-US&page=1&include_adult=false" + "&query=";
        let q = url.parse(req.url, true);
        let qinput = q.query.year;
        request(search_req+qinput, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    } else if (request_url.includes("/?search=")) {// if request for search movies
        let q = url.parse(req.url, true);//url object
        let qinput = q.query.search;
        let page = q.query.page;
        let search_req = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=en-US&page=" + page + "&include_adult=false&query=";
        console.log(page);
        request(search_req + qinput, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    } else if (request_url.includes("/?youtube=")) {//if request for youtube search videos
        let q = url.parse(req.url, true);//return an url object
        let qinput = q.query.youtube;
        //console.log(qinput);
        request(YT_search_req + qinput, function (error, response, body) {
            res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });//response header
            res.write(body);// response body, send the body back to client
            res.end();//end the response
        });
    }
}).listen(3001);