import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../assets/api2.png';
import Auth from '../assets/auth2.png';
import Person from '../assets/person_icon2.jpg';

class Starting extends React.Component {
   
    render() {
        return(
            <div className="starting-page">
                <div className="home-header">
                    <div className="header-container">
                        <div className="app-title">
                            <h2>MovieTown</h2>
                        </div>
                        <div className="app-description">
                            <p>MovieTown is an web application that could helps you to find out the moives that you like</p>
                            <p>You can also find out the info of a movie in MovieTown and videos that relates to the movie</p>
                        </div>
                    </div>
                    
                    <div>
                        <Link to="/main" style={{ textDecoration: 'none' }}>
                            <button className="main-btn"><span>Get Started</span></button>
                        </Link>
                    </div>
                </div>
                <div className="app-info">
                    <h2>Application Features And Info</h2>
                    <div className="infos">
                        <div className="info-1">
                            <img src={Api} width="250" height="250"></img>
                            <h3>APIs And Functionalities</h3>
                            <div>
                                <p className="info-subtitle">Facebook API</p>
                                <p>Uses Facebook SDK to provide user facebook login functionality and facebook graph API functionality</p>
                                <p>Retrieves Logged in user personal information(user likes) in order to provide a search functionality to find movies that logged in user likes</p>
                            </div>
                            <div>
                                <p className="info-subtitle">The Movie Database API</p>
                                <p>Functionality used: popular movies, upcoming movies, top rated movies</p>
                                <p>Also uses the search and movie details functionality</p>
                                <p>Retrieves: popular movies, upcoming movies, top rated movies</p>
                            </div>
                            <div>
                                <p className="info-subtitle">Youtube Data API</p>
                                <p>Uses Youtube video search funtionality</p>
                                <p>Retrieve video data that matches to the search query</p>
                            </div>
                            <div>
                                <p className="info-subtitle">Google Custom Search</p>
                                <p>Searches on google and returns the results that matches to the search query(movie)</p>
                                <p>Retrieves: websites(e.g wikipedia of the movie) and images that related to the movie</p>
                            </div>
                        </div>
                        <div className="info-2">
                            <img src={Auth} width="250" height="250"></img>
                            <h3>Authentication</h3>
                            <div>
                                <p className="info-subtitle">Facebook API</p>
                                <p>Requires user authentication to get logged in user's information: user_likes</p>
                                <p>Extra Permissions required: user likes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="app-author">
                    <div className="author-img">
                        <img src={Person} width="200" height="200"></img>
                    </div>
                    <div className="author-info">
                        <div>Author: Runda Li</div>
                        <div>Email: Runda.li@griffithuni.edu.au</div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default Starting;