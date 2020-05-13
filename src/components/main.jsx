import React from 'react';
import * as tmdb from './tmdb';
import Search from './search';
import Movies from './movies';
import Youtube from './youtube.jsx';
import MovieResource from './movieResource';
import Modal from './modal';

class Main extends React.Component{
    state = {
        pages: ["Find Movies", "Search Movies", "Find Videos", "Movie Resources"],
        currentPage: "Find Movies",
        search_input: "",
    }

    //set current page state to the tab that user have clicked
    //parameter: option(the name of the page user have just clicked on)
    optionClick = (option, searchInput) =>{
        this.setState({currentPage: option, search_input: searchInput});
    }



    //Display the content of the current page
    displayContent = ()=>{
        let current_state = this.state.currentPage;
        console.log(current_state);
        if (current_state === "Find Movies"){
            return <Movies optionChange={this.optionClick}/>;
        } else if (current_state ==="Search Movies"){
            return <Search optionChange={this.optionClick}/>;
        }else if(current_state === "Find Videos"){
            return <Youtube video={this.state.search_input}/>;
        } else if (current_state === "Movie Resources") {
            return <MovieResource />;
        }
    }

    render(){
        return(
            <div className="main-container">
                <div className="select-bar">
                    {this.state.pages.map((page, index)=>{
                        return(
                            <div key={index} className="select-bar-item">
                                <input type="radio" id={page} name="photo" value={page}/> 
                                <label className={this.state.currentPage === page ? "selected":"label-not-selected"} htmlFor={page} onClick={()=>this.optionClick(page)}>{page}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="option-content">
                    {this.displayContent()}
                </div>
                <div className="third-column">

                </div>
            </div>
        )
    }
}

export default Main;