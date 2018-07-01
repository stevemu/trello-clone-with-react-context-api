import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ActiveBoard from './components/ActiveBoard';
import Home from "./components/Home";

export const AppContext = React.createContext({});

class App extends Component {

  constructor() {
    super();

    this.showActiveCreateBoard = () => {
      this.setState({
        showCreateNewBoard: true
      })
    }

    this.cancelActiveCreateBoard = () => {
      this.setState({
        showCreateNewBoard: false
      })
    }

    this.createBoard = (title) => {
      let id = uuid();
      this.setState({
        boards: {
          ...this.state.boards,
          [id]: {id, title, lists: []}
        }
      })
    }

    this.state = {
      showCreateNewBoard: false,
      isEditingList: false,
      boards: {
        "1": {
          // first board
          // each board have mutiple lists
          id: "1",
          title: "aa",
          lists: { // each list have a name and mutiple cards
            "list1": {
              id: "list1",
              name: "shopping list",
              boardId: "1",
              cards: [{
                id: "c1",
                name: "banana"
              }, {
                id: "c2",
                name: "apple"
              }]
            },
            "list2": {
              id: "list2",
              name: "computers",
              boardId: "1",
              cards: [{
                id: "c11",
                name: "banana1"
              }, {
                id: "c21",
                name: "apple1"
              }]
            }
          }
        }, 
        "2": {
          // second board
          id: "2",
          title: "bb",
          lists: { // each list have a name and mutiple cards
            "list1": {
              id: "list1",
              boardId: "2",
              name: "shopping list 2",
              cards: [{
                id: "c4",
                name: "banana11"
              }, {
                id: "c5",
                name: "apple111"
              }]
            },
            "list2": {
              id: "list2",
              name: "computers 2",
              boardId: "2",
              cards: [{
                id: "c6",
                name: "banana1111"
              }, {
                id: "c7",
                name: "apple11111"
              }]
            }
          }
        }
      }
    }

  }

  enableListEditMode = () => {
    this.setState({ isEditingList: true });
  }

  disableListEditMode = () => {
    this.setState({ isEditingList: false });
  }

  submitNewCard = (boardId, listId, newCardTitle) => {
    // console.log(boardId);
    // console.log(listId);
    // console.log(newCardTitle);

    // create an copy of the boards, make changes, then put it back to state
    let boards = {...this.state.boards};
    let board = boards[boardId];
    let list = board.lists[listId];
    console.log(list);
    list.cards.push({id: uuid(), name: newCardTitle});

    this.setState({boards: boards});
  }

  submitList = (boardId, listName) => {
    console.log(boardId);
    let boards = {...this.state.boards};
    let board = boards[boardId];

    let listId = uuid();
    board.lists[listId] = {
      id: listId,
      name: listName,
      boardId: boardId,
      cards: []
    }

    this.setState({boards});

  }

  // componentDidMount() {
  //   // read state from localstorage
  //   this.setState(JSON.parse(localStorage.getItem("state")));

  //   console.log('did mount');
  // }

  // componentDidUpdate() {
  //   // write state to localstorage
  //   // localStorage.setItem("state", JSON.stringify(this.state));

  //   console.log('did update');
  // }

  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <AppContext.Provider value={{
            showCreateNewBoard: this.state.showCreateNewBoard,
            showActiveCreateBoard: this.showActiveCreateBoard,
            cancel: this.cancelActiveCreateBoard,
            createBoard: this.createBoard,
            boards: this.state.boards,
            isEditingList: this.state.isEditingList,
            enableListEditMode: this.enableListEditMode,
            disableListEditMode: this.disableListEditMode,
            submitNewCard: this.submitNewCard,
            submitList: this.submitList
          }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/boards/:boardId" component={ActiveBoard} />
          </AppContext.Provider>
        </div>

      </Router>
    );
  }
}

export default App;
