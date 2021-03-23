import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';
import App from './components/App';
import CreateSong from './components/CreateSong';
import SongDetail from './components/SongDetail';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './style/style.css';
const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path='song/create' component={CreateSong} />
          <Route path='song/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
