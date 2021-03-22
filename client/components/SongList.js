import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends React.Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: {
        id,
      },
      refreshQueries: [
        {
          query: fetchSongsQuery,
        },
      ],
    });
  }
  RenderSongList() {
    return this.props.data.songs.map((song) => (
      <li key={song.id} className='collection-item'>
        {song.title}
        <i
          className='material-icons'
          onClick={() => this.onSongDelete(song.id)}
        >
          delete
        </i>
      </li>
    ));
  }
  LoadingState() {
    return <div>Loading</div>;
  }
  render() {
    return (
      <div>
        <ul className='collection'>
          {this.props.data.loading
            ? this.LoadingState()
            : this.RenderSongList()}
        </ul>
        <Link to='/song/create' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
