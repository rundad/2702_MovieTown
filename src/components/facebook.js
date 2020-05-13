import $ from "jquery";
const APP_ID = 2969026049798536;

let callback_func;
let accessToken = "";
let cb_function;

export function bootstrap(callback) {
    callback_func = callback;
    //facebook SDK initialisation
    $.ajaxSetup({ cache: true });
    $.getScript("https://connect.facebook.net/en_US/sdk.js", function () {
        window.FB.init({
            appId: APP_ID,
            version: "v6.0",
        });
        //$("#loginbutton, #feedbutton").removeAttr("disabled");
        window.FB.getLoginStatus(updateStatusCallback);
    });
}

//The function that will be called when user refreshes the page/enters to the page
function updateStatusCallback(response) {
    console.log(response.status);
    //if the login status is connected, get logged in user's details and tell the controller to update the page
    if (response.status === "connected") {
        window.FB.api("/me", function (response) {
            sessionStorage.setItem("f-login-details", JSON.stringify(response));
            callback_func("connected");//call the callback function to tell the controller to update the page
        });

    } else {//if user not logged in, tell the controller to update the page
        callback_func(response.status);
    }
}

//login function when login button(not facebook login button) is pressed
export function login() {
    window.FB.login(function (response) {
        let status = response.status;
        window.FB.api("/me", function (response) {//API call to fetch logged in user's profile details
            console.log(status);
            sessionStorage.setItem("f-login-details", JSON.stringify(response));//store the response data to storage
            callback_func(status);//call the callback function to tell the controller to update the pag

        });
    }, { scope: 'user_posts, user_likes, user_photos' });
}

//logout function when login button(not facebook logout button) is pressed
export function fb_button() {
    //get login status
    window.FB.getLoginStatus(function (response) {
        //if is loggedin, logout when user click the button
        if (response.status === "connected") {
            window.FB.logout(function (response) {//logout facebook
                sessionStorage.removeItem("f-login-details");//remove the data in the storage 
                callback_func(response.status);// tell the controller to update the page after logging out
            });
        } else {//if not logged in, call login function
            login();
        }
    });

}

//Gets facebook login status, if connected, make API call to retrieve data
//else, call login function
export function get_FB_Data(callback, dataReady_cb) {
    //get login status
    window.FB.getLoginStatus(function (response) {
        //if is loggedin, logout when user click the button
        if (response.status === "connected") {
            window.FB.api("me?fields=id,name,likes", function (response) {
                console.log(response);
                if(response.hasOwnProperty("likes")){
                    callback(response.likes.data[0].name, dataReady_cb)//search movie function, parameter(search input,  data ready callback func)
                }else{
                    alert("You didn't liked anything on facebook!");
                }
                
                
            });
        } else {//if not logged in, call login function
            login();
        }
    });
}
//--------------------------Own Oauth------------------------------
//Retrieve logged in user facebook likes if user logged in
//else call own_Oauth function to direct user to login
export function getLikes(callback, dataReady_cb){
    if(accessToken !== ""){
        $.post("https://graph.facebook.com/me?fields=id,name,likes&access_token=" + accessToken, function(response){
            if(response.hasOwnProperty("likes")){
                callback(response.likes.data[0].name, dataReady_cb, 1)//search movie function, parameter(search input,  data ready callback func)
            }else{
                alert("You didn't liked anything on facebook!");
            }
        });
    }else{
        pop();
    }
}

function pop(){
    $("#notification-box").css("display", "block");
}

export function goLogin(){
    $("#notification-box").css("display", "none");
    own_Oauth();
}

export function hide(){
    $("#notification-box").css("display", "none");
}

//Called when page refreshes, find and store the access token
//if access token exist, store access token and get logged in user details
//else update the display of the html page
export function storeToken(callback){
    console.log(accessToken);
    cb_function = callback;
    let pos = window.location.href.search('access_token');
    if(pos !== -1){//if has access token on url
        let start = pos + 13;
        let end = window.location.href.search('data_access_expiration_time') - 1;
        let access_token = window.location.href.slice(start, end);
        accessToken = access_token;
        $.post("https://graph.facebook.com/me?fields=id,name,likes&access_token=" + access_token, function(response){
            sessionStorage.setItem("f-login-details", JSON.stringify(response));
            cb_function("connected");
        });
            
    }else{//if url doesnt contains access token
        console.log("token not exist");
        cb_function("disconnected");
    }

}

//Login button click function
//If access token is empty, direct user to login
//else clean the access token and update html page
export function own_Oauth(){
    if(accessToken === ""){
        let redir_url = "https://www.facebook.com/dialog/oauth?client_id=" + APP_ID +"&redirect_uri=" + "https://s5099129.elf.ict.griffith.edu.au:3000" + "&response_type=token&scope=user_likes";
        window.location.replace(redir_url);  
    }else{
        console.log("logout");
        accessToken = "";
        sessionStorage.removeItem("f-login-details");//remove the data in the storage 
        cb_function("disconnected");
    }
    
    
}