import React, { Component } from 'react';
import ReactMorph from "react-morph";
import ScrollLock from 'react-scrolllock';

class Card extends Component {
  state = {
    progress: 0
  }

  handleNextState = (state, go) => {
    this.setState({
      progress: state
    });

    go(state)
  };

  render() {
    const { url, title, onClick } = this.props;
    const { progress } = this.state;

    return (
      <ReactMorph>
      {({ from, to, fadeIn, go }) => (
        <div
          className={`card ${!url ? 'card--mocked' : ''}`}>
          {
            url && (
              <div>
                <img {...from('image')} onClick={() => this.handleNextState(1, go)} className="card__image" src={url} alt="gif" />
                <img {...to('image')} onClick={() => this.handleNextState(0, go)} className="card__image card__image--large" src={url} alt="gif" />

                {
                  progress === 1 &&  (
                    <ScrollLock />
                  )
                }
                {
                  title !== '' && (
                    <div>
                    <p className="card__title">{ title }</p>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      )}
    </ReactMorph>
    )
  }
}

export default Card;
