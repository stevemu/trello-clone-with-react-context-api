import React, { Component } from 'react';
import { AppContext } from '../App';

const CreateNewBoard = ({ showActive }) => (
  <div onClick={showActive}>Create new Board</div>
)

class ActiveCreateBoard extends Component {

  constructor() {
    super();
    this.state = {
      title: ""
    }
  }

  render() {
    let { cancel, create } = this.props;

    return (
      <div>
        <input value={this.state.title} onChange={(e) => {
          this.setState({ title: e.target.value });
        }} />
        <button onClick={cancel}>cancel</button>
        <button onClick={() => {
          create(this.state.title)
        }}>create</button>
      </div>
    )
  }
}

export default class extends Component {
  render() {
    return (

        <AppContext.Consumer>
          {({ showCreateNewBoard, showActiveCreateBoard, cancel, createBoard }) => {

            let Node = showCreateNewBoard == true ?
              <ActiveCreateBoard
                cancel={cancel}
                create={createBoard}
              /> :
              <CreateNewBoard
                showActive={showActiveCreateBoard}
              />
            return Node;
          }}
        </AppContext.Consumer>
   
    );
  }
};