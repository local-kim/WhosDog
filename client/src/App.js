import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import LandingPage from './components/views/LandingPage/LandingPage';
import SearchPage from './components/views/SearchPage/SearchPage';
import CommunityPage from './components/views/CommunityPage/CommunityPage';
import ReviewPage from './components/views/ReviewPage/ReviewPage';
import InfoPage from './components/views/InfoPage/InfoPage';
import CreatePost from './components/views/CommunityPage/CreatePost';
import PostView from './components/views/CommunityPage/PostView';

const App = (props) => {
  
  return (
    <>
      <Router>
        <div>
          <Route exact path="/Search" component={SearchPage} />
          <Route exact path="/myInfo" component={InfoPage} />
          <Route exact path='/postView/:no' component={PostView} />
          <Route exact path="/Community" component={CommunityPage} />
          <Route exact path="/CreatePost" component={CreatePost}/>
          <Route exact path="/Review" component={ReviewPage} />
          <Route exact path="/" component={LandingPage} />
        </div>
      </Router>
    </>
  )
}

export default App;