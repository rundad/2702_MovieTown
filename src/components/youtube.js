import $ from 'jquery';

/*
    Youtube Data API
*/
const API_KEY = "AIzaSyCimwH_Z2FzDnrcqAxiyiyLk4p73NezQug"; //Youtube Data API Key

let callback_func;
//search video function
//return an array of youtube videos that matches to the query
export function searchVideos(query, callback){
    //let YT_search_req = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + query + "&key=" + API_KEY;
    callback_func = callback;
    fetch("https://s5099129.elf.ict.griffith.edu.au:3001/?youtube=" + query).then(response => {
        return response.json();
    }).then(data=>{
        callback_func(data.items);
    })

}