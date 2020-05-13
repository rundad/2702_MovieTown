import React from 'react';

class History extends React.Component {

    state = {
        historyData: [],
    }

    //when component did mount, get history data from session storage
    //then store the data into state
    componentDidMount(){
        let tab_detail = this.props.tab;
        console.log(tab_detail);
        if(tab_detail === "movie"){
            let data = sessionStorage.getItem("movie-history");
            if(data !== null){
                this.setState({historyData: JSON.parse(data)});
            }
        }else{
            let data = sessionStorage.getItem("video-history");
            if(data !== null){
                this.setState({historyData: JSON.parse(data)});
            }
        }
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

    //display history content using history data in the state
    displayContent = () =>{
        return(
            this.state.historyData.map((data, index)=>{
                return(
                    <div key={index} className="history-item">
                        <span className="history-name">- {data}</span>
                        <span className="history-copy-btn" onClick={()=>{this.copyText(data)}}>copy</span>
                    </div>
                )
            })
        )
        
    }
    render() {
        return(
            <div className="movie-history-container">
                {this.displayContent()}
            </div>
        );
    }
}

export default History;