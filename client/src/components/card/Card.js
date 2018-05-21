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

  saveGif = go => {
    this.props.onSave()
    this.handleNextState(0, go)
  }

  removeGif = go => {
    this.props.onDelete()
    this.handleNextState(0, go)
  }

  render() {
    const { url, title, onSave, onDelete } = this.props;
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

              <div {...to('image')} className="detail">
                <img className="detail__image" src={url} alt="gif" onClick={() => this.handleNextState(0, go)} />
                <h1 {...to('title')} className="detail__title" >{ title }</h1>

                <div className="detail__buttons">
                  <button className="detail__like" onClick={() => this.saveGif(go)}>
                    <i className="icon ion-ios-heart-empty"></i>
                  </button>
                  <button className="detail__dislike" onClick={() => this.removeGif(go)}>
                    <i className="icon ion-ios-close"></i>
                  </button>
                </div>
              </div>

                {
                  progress === 1 &&  (
                    <ScrollLock />
                  )
                }
                {
                  title !== '' && (
                    <div>
                    <p {...from('title')} className="card__title">{ title }</p>
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
