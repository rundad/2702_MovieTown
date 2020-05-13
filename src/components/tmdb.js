import $ from "jquery";
import error from "../assets/error.png";
import loading from '../assets/loading.gif';

/*
    The Movie Database API
*/
const TMDB_API_KEY = "ab38ad17d2dc09ef1cf0d2762fcfd521";//movie database API key

let top_rated_req = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + TMDB_API_KEY +"&language=en-US&page=1"; //top rated request
let config_req = "https://api.themoviedb.org/3/configuration?api_key=" + TMDB_API_KEY; //config request
let popular_req = "https://api.themoviedb.org/3/movie/popular?api_key=" +TMDB_API_KEY + "&language=en-US&page=1";
let search_req = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=en-US&page=1&include_adult=false" + "&query=";

let base_url;
let poster_size;
let cb;
let movie_array;
//http://s5099129.elf.ict.griffith.edu.au:8080/config https://localhost:3001/toprated http://s5099129.elf.ict.griffith.edu.au:8080/?input=" + input
export function getTopRated(){
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/toprated").then(response=>{
        return response.json();//returns a promise object so we need to convert into json format
    }).then(data=>{
        movie_array = data.results;
        console.log(movie_array);
        getMovieDetails();
    });
    
}

//Fetch movie details by using movie id
function getMovieDetails(){
    //an array of movie objects, fetch movie details using movie object id
    let objArray = movie_array.map(obj => 
        fetch(("https://api.themoviedb.org/3/movie/" + obj.id+ "?api_key=ab38ad17d2dc09ef1cf0d2762fcfd521&language=en-US"))
    );

    //take an array of promise objects, return in json format
    Promise.all(objArray).then(responses=>{
        return Promise.all(responses.map(res=>res.json()));
    }).then(data=>{
        for(let i = 0; i<data.length; i++){
            let path = data[i].poster_path;
            if(path === null){
                data[i].poster_path = error;
            }else{
                data[i].poster_path = base_url + poster_size + path;
            }
        }
        cb(data);
    });
}

//Initialize the base url and poster size, which will be use later to concatenate to a full poster file path
export function initialize(callback){
    //store the callback function pass from the controller
    //when top rated data raedy, use this callback func to pass the data back to the controller
    cb = callback;
    //fetch the configuration details
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/config").then(response=>{
        return response.json();
    }).then(data=>{
        //console.log(data);
        base_url = data.images.base_url;
        poster_size = data.images.poster_sizes[4];
        console.log(base_url);
        console.log(poster_size);
        getTopRated(); //when finish initialise, get top rated movies
    });
}

//search movie in movie database by using user entered query
export function searchMovie(searchQuery, callback, page){
    console.log(page);
    //e.g https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false&query=star%20war
    cb = callback;//callback func to pass data back to the controller when data ready
    
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/?search=" + searchQuery + "&page=" + page).then(response=>{
        return response.json();//returns a promise object so we need to convert into json format
    }).then(data=>{
        movie_array = data.results;
        console.log(movie_array);
        getMovieDetails();
    });
}

//Fetch popular movies from movie database and pass data back to the controller
export function getPopular(callback){
    //callback func to pass data back to the controller when data ready
    cb = callback;
    //fetch data
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/popular").then(response=>{
        return response.json();//returns a promise object so we need to convert into json format
    }).then(data=>{
        movie_array = data.results;
        console.log(movie_array);
        getMovieDetails();
    });
}

//find movies that released in certain year int the movie database 
export function releaseYearMovies(year, callback){
    //e.g https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false&query=star%20war
    cb = callback;//callback func to pass data back to the controller when data ready
    //fetch data
    fetch(("https://s5099129.elf.ict.griffith.edu.au:3001/?year=" + year)).then(response=>{
        return response.json();
    }).then(data=>{
        movie_array = data.results;
        getMovieDetails();
    });
}

//get upcoming movies
export function getUpcomings(callback){
    //API call request
    cb = callback;//callback func to pass data back to the controller when data ready
    //fetch data
    
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/upcoming").then(response=>{
        return response.json();//returns a promise object so we need to convert into json format
    }).then(data=>{
        movie_array = data.results;
        console.log(movie_array);
        getMovieDetails();
    });
}