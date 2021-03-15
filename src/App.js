import _ from 'lodash';
import React from 'react';
import Wallpapers from './wallpapers';
import SearchBar from './search_bar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.url = 'https://www.reddit.com/r/';
    this.sorts = ['hot','new','top','controversial','rising'];
  }
    
  state = {
    currentSubreddit: 'gaming',
    sort: 'hot',
    files: [],
    page: 1
  };

  componentDidMount() {
    this.changeSubreddit(this.state.currentSubreddit);
  }

  changeSubreddit(sub) {
    /* 
     * Empty the files so we will show 'Loading...'
     * Reset page to 1
     */
    this.setState({
      files: [],
      currentSubreddit: sub,
      page: 1
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
    if (subreddit.length !== 0) {
      this.changeSubreddit(subreddit);
    } else {
      this.changeSubreddit(this.wallpaperSubreddits);
    }
  }

  render () {
    const searchSubreddit = _.debounce((term) => {this.searchSubreddit(term)}, 600);
    let contentJSX;
    if (this.state.files.length > 0) {
      contentJSX = <div><Wallpapers files={this.state.files}/><br/></div>;
    } else {
      contentJSX = <div className="p-2"><center>Loading...</center></div>;
    }

    return (
      <div className="container">
          <SearchBar onSearchTermChange={term => searchSubreddit(term)}/>
        <br/>
        {contentJSX}
        <br/>
        <footer><center><p>Open-source available on <a href="https://github.com/gauravjot/react-reddit-wallpapers">Github</a>.<br/>Some images can be explicit, please use it on your own risk.</p></center></footer>
      </div>
    );
  }

}

export default App;
