import React, { Component } from 'react';
import { AppContext } from '../App';
import { withAppContext } from './withAppContext';

import ListEditingMode from './ListEditingMode';
import List from './List';

export default class extends Component {
  render() {

    let { boardId } = this.props.match.params;

    return (
      <AppContext.Consumer>
        {({
          boards,
          isEditingList,
          enableListEditMode
        }) => {

          // find the board 
          let findBoard = boards[boardId];
          let lists = Object.values(findBoard.lists);

          return (
            <div>
              a board {boardId}
              <div>
                {lists.map((list) => {
                  return (
                    <List list={list} key={list.id}/>
                  )
                })}
              </div>
              <div>
                {!isEditingList ?
                  <div onClick={enableListEditMode}>add a list</div> :
                  <ListEditingMode boardId={boardId} />
                }
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>

    );
  }
};

