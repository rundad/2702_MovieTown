import React from 'react';
import * as tmdb from './tmdb';
import {Link} from 'react-router-dom';
import Modal from './modal';
import * as facebook from "./facebook.js";
import Youtube from './youtube.jsx';

class Movies extends React.Component{

    state={
        movieObjs: [],
        movie_years: ["", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005"],
        year: "",
        currentOption: "Top Rated Movies",
        modalData: "",
    }

    //When component is going to mount, initialize some setting for TMDB(The movie database API)
    componentWillMount(){
        tmdb.initialize(this.dataReady);
    }

    //Callback function, receive data passed from API calls
    dataReady = (dataArr) =>{
        console.log(dataArr);
        this.setState({movieObjs: dataArr});
    }

    //Button event handler function, to get popular movies in database
    getPopularMovies = () =>{
        this.setState({ currentOption: "Popular Movies"});
        tmdb.getPopular(this.dataReady);
    }

    //Button event handler function, to get top rated movies in database
    getTopRatedMovies = () =>{
        this.setState({ currentOption: "Top Rated Movies"});
        tmdb.getTopRated();
    }
    
    //BUtton event handelr function, to get upcoming movies in database
    upcomingMovies = () => {
        tmdb.getUpcomings(this.dataReady);
        this.setState({currentOption: "Upcoming Movies"});
    }

    //event handler function, get user selected value from dropdown menu
    selectOptionValue = (event) =>{
        console.log(event.target.value);
        this.setState({year: event.target.value});
    }
    
    //Use user selected year input to get matched movies in database
    findYearMovies = () => {
        tmdb.releaseYearMovies(this.state.year, this.dataReady);
        this.setState({currentOption: this.state.year + " Movies"});
    }

    //display the name of current page, tell the user where he is at the moment
    displayOption = () => {
        return(<span>{this.state.currentOption}</span>);
    }

    //Set modal data state to the movie object that user have just clicked on
    getModalData = (movieObject) => {
        this.setState({modalData: movieObject});
    }

    //Display modal component if modal data is not empty
    displayModal = () =>{
        if(this.state.modalData === ""){
            return;

        }else{
            console.log("display modal");
            return <Modal movie={this.state.modalData} rmModal={this.removeModal} toYT = {this.toYoutube}/>
        }
    }

    //close the modal by setting the modal data state to empty
    removeModal = () =>{
        this.setState({modalData: ""});
    }

    //close modal and get videos that matches to the movie
    toYoutube = (movieObj) => {
        this.setState({modalData: ""}, function(){
            this.goYoutube(movieObj);
        });
    }

    //change the current tab to youtube tab and pass the name of the movie for getting videos of that movie
    goYoutube = (movie) =>{
        console.log(movie);
        this.props.optionChange("Find Videos", movie.title);
    }

    //Use facebook functionality to get logged in user details
    //passes two parameters: search movie function and data ready callback function
    getFBData = () => {
        facebook.getLikes(tmdb.searchMovie, this.dataReady);
        this.setState({ currentOption: "Movies I Like" });
    }

    //copy test to clipboard
    copyText = (text) => {
        let temp = document.createElement("INPUT"); //create an input dom element
        document.body.appendChild(temp);//append the input element to the body
        temp.value = text;//set the input value to text value
        temp.select();//select the text
        document.execCommand("copy"); //execute copy command
        temp.remove();//remove temp element from body
    }

    render(){
        return(
            <div className="movie-section">

                <div className="option-bar">
                    <div className="movie-option" onClick={this.getFBData}><span >Find Movies I Like</span></div>
                    <div className="movie-option" onClick={this.upcomingMovies}><span >Upcoming Movies</span></div>
                    <div className="movie-option" onClick={ this.getPopularMovies}><span >Most Popular</span></div>
                    <div className="movie-option" onClick={this.getTopRatedMovies}><span >Top Rated</span></div>
                    <div className="option-container">
                        <label id="label-ry" htmlFor="release-year">Release Year </label>
                        <select id="release-year" onChange={this.selectOptionValue}>
                            {this.state.movie_years.map((year, index)=>{
                                return(<option key={index} value={year}>{year}</option>)
                            })}
                        </select>
                        <button onClick={this.findYearMovies}>Go</button>
                    </div>
                </div>

                <div className="current-option">
                    {this.displayOption()}
                </div>

                <div className="movies">
                    {this.state.movieObjs.map((movie, index)=>{
                        return(
                            <div key={index} className="movie-item">
                                <img className="poster" src={movie.poster_path} width="170" height="258"/>
                                <div className="movie-title" onClick={()=>{this.copyText(movie.title)}}>{movie.title}</div>
                                <div className="more-info" onClick={()=>{this.getModalData(movie)}}><span>More Info</span></div>
                            </div>
                        )
                    })}
                </div>
                <div id="notification-box">
                    <h1>You need to login first!</h1>
                    <a className="close" onClick={facebook.hide}>Stay</a>
                    <a className="go-btn" onClick={facebook.goLogin}>Go</a> 
                </div>
                {this.displayModal()}
            </div>
            
        )
    }
}

export default Movies;