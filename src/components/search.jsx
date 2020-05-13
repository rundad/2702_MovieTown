import React from 'react';
import * as tmdb from './tmdb';
import searchIcon from '../assets/search_icon.png';
import Modal from './modal';
import History from './history';

class Search extends React.Component{

    state = {
        movieObjs: [],
        search_input: "",
        hasData: true,
        modalData: "",
        page: 1,
        historyOpen: false,
    }


    //get input value from input field, set state
    getInputValue = (event)=>{
        this.setState({search_input: event.target.value});
    }

    //call search movie function to get movie data
    //passes two parameter: search input and data ready callback function
    //also storing the search data to session storage
    //if the storage don't hvae any data at the beginning, create an new array with data, else append new data
    search = () => {
        let data = sessionStorage.getItem("movie-history");
        let dataArr = [this.state.search_input];
        if(data === null){
            sessionStorage.setItem("movie-history", JSON.stringify(dataArr));
        }else{
            let JS_data = JSON.parse(data);
            if(JS_data.length === 5){
                JS_data.shift();
            }
            JS_data.push(this.state.search_input);
            let newArr = JS_data.reverse();
            sessionStorage.setItem("movie-history", JSON.stringify(newArr));
        }
        tmdb.searchMovie(this.state.search_input, this.dataReady, this.state.page);
        this.setState({historyOpen: false});
    }

    //callback function to send to API calls
    //when data ready, set data state
    dataReady = (data) => {
        console.log(data);
        if(data.length > 0){
            this.setState({movieObjs: data, hasData: true});
        }else{
            this.setState({movieObjs: data, hasData: false});
        }

    }

    //parameter: movieObject(contains info about a movie)
    //store the movie object into state
    getModalData = (movieObject) => {
        this.setState({modalData: movieObject});
    }

    //display modal component if modal data is not empty
    displayModal = () =>{
        if(this.state.modalData === ""){
            return;

        }else{
            console.log("display modal");
            return <Modal movie={this.state.modalData} rmModal={this.removeModal} toYT = {this.toYoutube}/>
        }
    }

    //Display the html content
    //if movie object array has data, display html content
    //if movie object array is empty and has data equals true, display functionality instruction content
    //if movie object array is empty and has data equals false, display error message
    displayContent = ()=>{
        if(this.state.movieObjs.length === 0 && this.state.hasData === true){
            return(
                <div className="search-icon">
                    <img width="200" height="200" src={searchIcon} />
                    <h3>Use Search Bar To Search Movies!</h3>
                </div>
            );
        }else if(this.state.movieObjs.length === 0 && this.state.hasData === false){
            return(
                <div className="search-icon">
                    <h3>found 0 results, make sure you spelled and entered movie name correctly!</h3>
                </div>
            ); 
        }else{
            return(
                <div>
                    <div className="search-movies">
                    {this.state.movieObjs.map((movie, index)=>{
                        return(
                            <div key={index} className="movie-item">
                                <img className="poster" src={movie.poster_path} width="199" height="258"/>
                                <div className="movie-title-search">{movie.title}</div>
                                <div className="more-info" onClick={()=>{this.getModalData(movie)}}><span>More Info</span></div>
                            </div>
                        )
                    })}
                    </div>
                    <div className="page-controller">
                        <button type="button" onClick={this.prevPage} className="back-btn">Back</button>
                        <span className="current-page">Page {this.state.page}/10</span>
                        <button type="button" onClick={this.nextPage} className="next-btn">Next</button>
                    </div>
                </div>
            );
        }
    }

    //callback function
    //when modal close button is clicked, set modal data state to empty string
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

    //go to the next page of search results
    nextPage = () =>{
        if(this.state.page < 10){
            this.setState({page: this.state.page + 1}, ()=>{this.search()});
            
        }
    }

    //go back one page of search results
    prevPage = () =>{
        if(this.state.page > 1){
            this.setState({page: this.state.page - 1}, ()=>{this.search()});
        }
    }

    //display search history if history container is opened, else return
    displayHistory = () =>{
        if(this.state.historyOpen){
            return <History tab="movie"/>
        }else{
            return;
        }
    }

    //search history button, if is open, close the container when clicked
    //if is closed, open the container when clicked
    historyButton = () => {
        if(this.state.historyOpen){
            this.setState({historyOpen: false});
        }else{
            this.setState({historyOpen: true});
        }
    }
    render(){
        return(
            <div className="search">
                <div className="wrapper">
                    <div className="search-container">
                        <input type="text" placeholder="Search.." name="search-bar" onChange={this.getInputValue}/>
                        <button type="submit" className="search-btn" onClick={this.search}><i className="fa fa-search"></i></button>

                    </div>
                </div>
                
                <div className="search-movies">
                    {this.displayContent()}
                </div>
                <div>
                    <span className="history-btn" onClick={this.historyButton}>Search History</span>
                    {this.displayHistory()}
                </div>
                {this.displayModal()}
            </div>
        )
    }
}

export default Search;