import React, { Component } from 'react';
import { AppContext } from '../App';
import { withAppContext } from './withAppContext';

class ListEditingMode extends Component {

  constructor() {
    super();

    this.state = {
      newListName: ""
    }
  }

  render() {
    let { disableListEditMode, submitList, boardId } = this.props;

    return (
      <div>
        <input
          placeholder="adda a list"
          value={this.state.newListName}
          onChange={e => this.setState({ newListName: e.target.value })}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              submitList(boardId, this.state.newListName);
            }
          }}
        />
        <button onClick={disableListEditMode}>cancel</button>
      </div>
    )
  }

}

export default withAppContext(ListEditingMode);