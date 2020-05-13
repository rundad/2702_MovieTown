import React from 'react';
import Youtube from './youtube.jsx';

class Modal extends React.Component {

    //Remove the modal by telling the controller to remove the modal
    removeModal = () =>{
        this.props.rmModal();
    }

    //copy test to clipboard
    copyText = (text) => {
        let temp = document.createElement("INPUT"); //create an input dom element
        document.body.appendChild(temp);//append the input element to the body
        temp.value = text;//set the input value to text value
        temp.select();//select the text
        document.execCommand("copy"); //execute copy command
        temp.remove();//remove temp element from body
        document.getElementsByClassName("copied-text")[0].innerText = "copied";
    }

    //switch to the youtube video tab by using the function passed from the movies or search component
    seeVideos = () => {
        this.props.toYT(this.props.movie);
    }

    toGoogleSearch = (title) => {
        window.open("https://s5099129.elf.ict.griffith.edu.au:3000/google#gsc.tab=0&gsc.q=" + title + "&gsc.sort=");
    }
    
    render() {
        return(
            <div>
                <div className="modal">
                    <div className="detail-container">
                        <div className="modal-header">
                            <span className="modal-close" onClick={this.removeModal}>&times;</span>
                        </div>
                        <div className="modal-content">
                            <div className="modal-poster">
                                <img src={this.props.movie.poster_path} width="360" height="540" />
                            </div>
                            <div className="movie-details">
                                <div className="detail-subtitle">Movie Title: <span>{this.props.movie.title}</span> 
                                    <span className="copy-btn" onClick={()=>{this.copyText(this.props.movie.title)}}>Copy to Clipboard</span>
                                    <span className="copied-text"></span>
                                    <span className="see-video" onClick={this.seeVideos}>see videos</span>
                                </div>
                                <div className="detail-subtitle">Overview: <span>{this.props.movie.overview}</span></div>
                                <div className="detail-subtitle">Release Date: <span>{this.props.movie.release_date}</span></div>
                                <div className="detail-subtitle">Rating: <span>{this.props.movie.vote_average}</span></div>
                                <div className="detail-subtitle">Running Time: <span>{this.props.movie.runtime} mins</span></div>
                            </div>
                            
                        </div>
                        <div className="wiki-btn" onClick={()=>{this.toGoogleSearch(this.props.movie.title)}}>
                            <span style={{color:"#4285F4"}}>G</span>
                            <span style={{color:"#DB4437"}}>o</span>
                            <span style={{color:"#F4B400"}}>o</span>
                            <span style={{color:"#4285F4"}}>g</span>
                            <span style={{color:"#0F9D58"}}>l</span>
                            <span style={{color:"#DB4437"}}>e </span>
                            <span>Search </span>
                            <i className="fa fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;