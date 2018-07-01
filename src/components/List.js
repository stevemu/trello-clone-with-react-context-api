import React, { Component } from 'react';
import { withAppContext } from './withAppContext';

class List extends Component {

  constructor() {
    super();

    this.state = {
      newCardText: ""
    }
  }

  render() {
    // console.log(this.props);
    let { list, submitNewCard } = this.props;

    return (
      <div>
        <strong>{list.name}</strong>
        <input
          value={this.state.newCardText}
          onChange={(e) => {
            // console.log(e.keyCode);
            this.setState({ newCardText: e.target.value });
          }}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              submitNewCard(list.boardId, list.id, this.state.newCardText);
            }

          }}
        />
        <div>
          {list.cards.map(({ id, name }) => {
            return <div key={id}>{name}</div>
          })}
        </div>
      </div>

    )

  }

}

export default withAppContext(List);