import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.URL = 'https://www.googleapis.com/books/v1/volumes?q='
    this.update = this.update.bind(this);
    this.makeAPICall = this.makeAPICall.bind(this);
    this.state = {
        myBooks:[],
        searchBar:'Catch 22',
        lastQuery:''
      }
    }

    async makeAPICall(){
      var searchTerms = this.state.searchBar;
      var q = ''; // represents q parameter in API request

      this.setState({
        myBooks: [],
      })

      // spaces need to be substituted for '+' in the API call
      for (var i = 0; i < searchTerms.length; i++){
        if(searchTerms.charAt(i)!==' '){
          q+=searchTerms.charAt(i);
        }
        else{
          q+='+';
        }
      }

      var response = await fetch(this.URL+q);
      var data = await response.json();
      // All of the data we need should be in the items
      this.setState({
        myBooks: data.items,
        lastQuery: this.URL+q,
      })

    }

    update(e){
      this.setState({
        searchBar: e.target.value
      });
      console.log(this.state.searchBar);
    }


    render(){
      if (!this.state.myBooks.length){
          return(
            <div className='App'>
              <form className='Form'>
                <input type='text' onChange={this.update} value={this.state.searchBar}/>
                <button type='button' onClick={this.makeAPICall}/>
              </form>
            </div>
          );
      }
      else{
        {/* when we have book items in our array we want to display the titles}*/}
        return(
          <div className='App'>
            <form className='Form'>
              <input type='text' onChange={this.update} value={this.state.searchBar}/>
              <button type='button' onClick={this.makeAPICall}/>
            </form>
            <div className='lib'>
              {this.state.myBooks.map((book, i)=>{
                return(
                  <h4 key={i}>{book.volumeInfo.title+', By '} {book.volumeInfo.authors[0]} </h4>
                )
              })}
            </div>
            <p>{this.state.lastQuery}</p>
          </div>
        );
      }
    }
  }



export default App;
