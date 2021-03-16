/*
*	FILE : App.js
*	PROJECT : SEBG3080 - Frontend Programming assignment
*	PROGRAMMER : Mark Jackson
*	FIRST VERSION : 2021-03-14
*	DESCRIPTION :
*		This is a basic implementation of getting data from reddit.
*/

import _ from 'lodash';
import React from 'react';
import Posts from './posts';
import SearchBar from './search_bar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.url = 'https://www.reddit.com/r/';
  }

  state = {
    home: 'all',
    currentSubreddit: 'all',
    sort: 'hot',
    files: []
  };

  /*when the component is created, do change the subreddit to the default one*/
  componentDidMount() {
    this.changeSubreddit(this.state.currentSubreddit);
  }

  changeSubreddit(sub) {
    /*reset the files and change the current subreddit*/
    this.setState({
      files: [],
      currentSubreddit: sub
    });

    /*fetch the data and store it in the files*/
    fetch(this.url + sub + "/" + this.state.sort + '.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          files: data.data.children
        });
        window.scrollTo(0, 0);
      })
  }

  /*when we are typing in the searchbar, the current subreddit is updated*/
  searchSubreddit(sub) {
    localStorage.setItem("viewFav", false);
    if (sub.length !== 0) {
      this.changeSubreddit(sub);
    } else {
      this.changeSubreddit(this.home);
    }
  }

  render() {
    const searchSubreddit = _.debounce((term) => { this.searchSubreddit(term) }, 600);
    let content;
    /*check to see if we got any results*/
    if (this.state.files.length > 0) {
      /*we did, so generate the posts*/
      content = <div><Posts files={this.state.files} /><br /></div>;
    } else {
      /*we havent :(*/
      content = <div><center>Loading...</center></div>;
    }
    return (
      <div className="container">
        <button
          className="btn btn-default"
          onClick={(e) => {
            searchSubreddit("all");
            localStorage.setItem("viewFav", false);
          }
          }>Home</button>
        <button
          className="btn btn-default"
          onClick={(e) => {
            let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
            this.setState({
              files: favourites,
            });
            localStorage.setItem("viewFav", true);
          }}>Favourites</button>
        <SearchBar onSearchTermChange={term => searchSubreddit(term)} />
        <br />
        {content}
        <br />
      </div>
    );
  }
}

export default App;