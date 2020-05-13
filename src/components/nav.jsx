import React from 'react';
import * as facebook from './facebook.js';

class Nav extends React.Component {
   
    componentDidMount(){
        facebook.storeToken(this.display);
    }

    fb_login = () => {
        facebook.own_Oauth();
    }

    display = (status) => {
        let details = JSON.parse(sessionStorage.getItem("f-login-details"));
        if (status === "connected") {//logged in
            let username = document.getElementsByClassName("f-username")[0];
            let button = document.getElementsByClassName("fb-btn")[0];
            username.innerHTML = `<b>Welcome</b> ${details.name}`;
            username.style.visibility = "visible";
            button.innerText = "Logout";
            //$("#f-username").html(`<b>Welcome</b> ${details.name}`);//display user's name
            //$("#f-username").css("visibility", "visible");
            //$("#fb-button").text("Logout");//update button text to logout
        } else {//logged out
            let username = document.getElementsByClassName("f-username")[0];
            let button = document.getElementsByClassName("fb-btn")[0];
            username.innerHTML = "";
            username.style.visibility = "hidden";
            button.innerText = "Login";
            // $("#f-username").html("");//clean user's name
            // $("#f-username").css("visibility", "hidden");
            // $("#fb-button").text("Login");//update button text to login
        }
    }

    render() {
        return(
            <nav>
                <div className="app-name">
                    <a href="https://s5099129.elf.ict.griffith.edu.au:3000">MovieTown</a>
                </div>
                <div className="nav-items">
                    <div className="f-username"></div>
                    <button className="fb-btn" onClick={this.fb_login}>Login</button>

                </div>
            </nav>
            
        );
    }
}

export default Nav;