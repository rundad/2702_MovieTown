import React from 'react';
import * as tmdb from './tmdb';
import * as youtube from './youtube.js';
import searchIcon from '../assets/search_icon.png';
import History from './history';

class Youtube extends React.Component{

    state = {
        search_input: "",
        videoArray: [],
        historyOpen: false,
    }

    //get the input field value and store into component state
    s_inputValue_youtube = (event) => {
        this.setState({search_input: event.target.value});
    }

    componentWillMount(){
        if(this.props.video === undefined){
            return;
        }else{
            youtube.searchVideos(this.props.video, this.dataReady);
        }

        
    }

    //fetch video data that matches to the search input keyword from youtube
    //passing two parameters: the search input, data ready callback function
    //if data is ready, pass the data back to the controller and update the component
    //also when search videos, store search input data into storage, if storage dont have data at the beginning, create new array, else append new data 
    search_youtube = () => {
        let data = sessionStorage.getItem("video-history");
        let dataArr = [this.state.search_input];
        if(data === null){
            sessionStorage.setItem("video-history", JSON.stringify(dataArr));
        }else{
            let JS_data = JSON.parse(data);
            if(JS_data.length === 5){
                JS_data.shift();
            }
            JS_data.push(this.state.search_input);
            let newArr = JS_data.reverse();
            sessionStorage.setItem("video-history", JSON.stringify(newArr));
        }
        youtube.searchVideos(this.state.search_input, this.dataReady);
        this.setState({historyOpen: false});
    }  

    //data ready call back function
    //Used to tell the controller to set state(update component) when data is ready
    dataReady = (data) =>{
        this.setState({videoArray: data});
    }

    displayContent = () =>{
        if(this.state.videoArray.length === 0){
            return(
                <div className="search-video-icon">
                    <img width="200" height="200" src={searchIcon} />
                    <h3>Use Search Bar To Search Videos!</h3>
                </div>
            );
        }else{
            return(
                this.state.videoArray.map((video, index) => {
                    return(
                        <article key={index}>
                            <iframe id="player" type="text/html"
                                src={"https://www.youtube.com/embed/" + video.id.videoId +"?enablejsapi=1"} allowFullScreen="allowFullScreen" frameBorder="0">
                            </iframe>
                            <div className="details">
                                <h2>{video.snippet.title}</h2>
                                <p>{video.snippet.description}</p>
                            </div>
                        </article>
                        
                    )
                })
            );
        }
    }

    //display search history if history container is opened, else return
    displayHistory = () =>{
        if(this.state.historyOpen){
            return <History tab="video"/>
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
            <div className="YT">
                <div className="wrapper">
                    <div className="search-container">
                        <input type="text" placeholder="Search.." name="search-bar" onChange={this.s_inputValue_youtube}/>
                        <button type="submit" className="search-btn" onClick={this.search_youtube}><i className="fa fa-search"></i></button>

                    </div>
                </div>

                <div className="search-videos">
                    {this.displayContent()}
                </div>
                <div>
                    <span className="history-btn" onClick={this.historyButton}>Search History</span>
                    {this.displayHistory()}
                </div>
            </div>
        )
    }
}

export default Youtube;