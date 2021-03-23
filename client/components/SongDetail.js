import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchAsong';
import { Link } from 'react-router';
import CreateLyric from './CreateLyric';
import LyricList from './LyricList';

class SongDetails extends React.Component {
  render() {
    const { song } = this.props.data;
    console.log(song);
    if (!song) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <CreateLyric id={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: { id: props.params.id },
    };
  },
})(SongDetails);
