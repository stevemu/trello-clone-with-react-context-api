import { AppContext } from '../App';
import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateNewBoardContainer from './CreateNewBoardContainer';

export default class Home extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ boards }) => {

          return (
            <main>
              <CreateNewBoardContainer />
              <div>Boards:</div>
              {Object.values(boards).map((board) => {
                let { title, id } = board;
                return (
                  <div key={id}>
                    <Link to={"/boards/" + id}>{title}</Link>
                  </div>
                )
              })}
            </main>
          )

        }}

      </AppContext.Consumer>
    )
  }
}