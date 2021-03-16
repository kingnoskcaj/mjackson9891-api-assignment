import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import Posts from './posts';
import SearchBar from './search_bar';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.url = 'https://www.reddit.com/r/';
    this.sorts = ['hot', 'new', 'top', 'controversial', 'rising'];
    
  }
  

  state = {
    currentSubreddit: 'gaming',
    sort: 'hot',
    files: [],
    favourites: []
  };

  componentDidMount() {
    this.changeSubreddit(this.state.currentSubreddit);
  }

  changeSubreddit(sub) {
    this.setState({
      files: [],
      currentSubreddit: sub
    });
    fetch(this.url + sub + "/" + this.state.sort + '.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          files: data.data.children
        });
        window.scrollTo(0, 0);
      })
      .catch(console.log)
  }

  searchSubreddit(subreddit) {
    this.changeSubreddit(subreddit);
  }

  handleClick() {
    this.state.favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    this.state.files = this.state.favourites;
  }

  render() {
    const searchSubreddit = _.debounce((term) => { this.searchSubreddit(term) }, 600);
    let contentJSX;
    if (this.state.files.length > 0) {
      contentJSX = <div><Posts files={this.state.files} /><br /></div>;
    } else {
      contentJSX = <div><center>Loading...</center></div>;
    }

    return (
      <div className="container">
        <button
                className="btn btn-default"
                onClick={this.handleClick}>Favourites</button>
        <SearchBar onSearchTermChange={term => searchSubreddit(term)} />
        <br />
        {contentJSX}
        <br />
      </div>
    );
  }

}

export default App;