import React, { Component } from 'react';

// Components
import Infinite from 'react-infinite';
import Card from './Card';

export default class Cards extends Component {
  onScroll = event => {
    //event.preventDefault()
  }
  render() {
    const { items, onEndReach, filter, onClick } = this.props;

    const filteredItems = items.filter(item => item.type === filter)
    return (
      <Infinite
      handleScroll={this.onScroll}
        useWindowAsScrollContainer
        elementHeight={400}
        className="cards"
        infiniteLoadBeginEdgeOffset={2000}
        onInfiniteLoad={onEndReach}
      >
          {
            filteredItems
            ? filteredItems.map((gif, key) => 
              <Card
                onClick={onClick}
                title={gif.title}
                key={key}
                url={gif.images.original.url}
              />)
            : ['', '', '', '', ''].map((gif, key) => <Card key={key} />)
          }
      </Infinite>
    );
  }
}
