import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGifs } from '../state/ducks/gif';

// Components
import Cards from '../components/card/Cards';

class Random extends Component {
  componentDidMount() {
    const { gifs } = this.props;

    if (gifs.length) {
      return;
    }

    this.fetchGifs();
  }

  fetchGifs = () => {
    const { actions } = this.props;
    actions.fetchGifs();
  }

  render() {
    const { gifs } = this.props;

    return (
      <div>
        <Cards items={gifs} onEndReach={this.fetchGifs} filter="random" onClick={() => {
          this.props.history.push('/trending')
        }}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gifs: state.gif.gifs,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGifs,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Random);
