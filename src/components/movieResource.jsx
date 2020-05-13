import React from 'react';
import justwatch from '../assets/justwatch.jpg';
import netfilx from '../assets/netflix.jpg';
import tubi from '../assets/tubi.png';
import speedytv from '../assets/speedytv.PNG';
import popcornflix from '../assets/popcornflix.png';

class MovieResource extends React.Component {
    
    state = {
        resources: [
            { name: "Netflix", url: "https://www.netflix.com/au/", image: netfilx, description: "Netflix, is an American media-services provider and production company headquartered in Los Gatos, California, founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California. The company's primary business is its subscription-based streaming service which offers online streaming of a library of films and television programs, including those produced in-house."},
            { name: "SpeedyTV", url: "https://www.speedytv.com/", image: speedytv, description: "SpeedyTV is an online streaming movie search engine with filters to find the best movies for you. Use our website to watch movies online through services such as through the Netflix catalog. Its easy ... Sort and filter streaming movies based on release year, IMDB and Rotten Tomatoes ratings, and Age/MPAA ratings. Then click on the movie to get more details and a direct link to view the movie online." },
            { name: "Popcornflix", url: "https://www.popcornflix.com/pages/discover/d/movies", image: popcornflix, description: "Popcornflix LLC is a website and over-the-top service offering free ad-supported streaming video of feature-length movies and webisodes." },
            { name: "JustWatch", url: "https://www.justwatch.com/au/movies", image: justwatch, description: "JustWatch is there to help you find all the movies you can stream legally in Australia and make your life easier." },
            { name: "Tubi", url: "https://tubitv.com/home", image: tubi, description: "Watch free movies and TV shows online in HD on any device. Tubi - streaming movies and TV free." },
        ],
    }

    openUrl = (url) => {
        window.open(url);
    }

    render() {
        return (
            <div className="resource-container">
                <div className="resource-header">
                    <span>Movie Resource Websites</span>
                </div>

                <div className="resource-content">
                    {this.state.resources.map((resObj, index) => {
                        return(
                            <div key={index} className="resource-item">
                                <img src={resObj.image} width="330" height="220"></img>
                                <div className="details">
                                    <h4 onClick={()=>{this.openUrl(resObj.url)}}>{resObj.name}</h4>
                                    <p>{resObj.description}</p>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MovieResource;