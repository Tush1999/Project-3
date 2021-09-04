import React, { Component } from "react";
import "./style.css";
import ScrollableFeed from "react-scrollable-feed";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 100,
      monster: 100,
      game: false,
      list: [],
    };
    this.handleAttack = this.handleAttack.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleSpecialAttack = this.handleSpecialAttack.bind(this);
    this.handleHeal = this.handleHeal.bind(this);
    this.handleGive = this.handleGive.bind(this);
  }

  handleAlert() {
    if (this.state.player1 <= 0 || this.state.game) {
      setImmediate(() => alert("Awwww....You lose this game. Play again"));
      this.setState({
        player1: 0,
        list: [
          ...this.state.list,
          { message: "Game over", active: "game-over" },
        ],
      });
    } else if (this.state.monster <= 0) {
      alert("You win this game");
    }
  }

  handleAttack() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    this.setState(
      (state) => ({
        monster: state.monster - num1,
        player1: state.player1 - num2,
        list: [
          ...state.list,
          { message: `You hit monster by ${num1}`, active: "win" },
          { message: `Moster hit you by ${num2}`, active: "loss" },
        ],
      }),
      this.handleAlert
    );
  }

  handleSpecialAttack() {
    if (this.state.player1 > 90) {
      let num1 = Math.floor(Math.random() * 11) + 10;
      let num2 = Math.floor(Math.random() * 20) + 1;
      this.setState(
        (state) => ({
          monster: state.monster - num1,
          player1: state.player1 - num2,
          list: [
            ...state.list,
            { message: `You hit monster by ${num1}`, active: "win" },
            { message: `Moster hit you by ${num2}`, active: "loss" },
          ],
        }),
        this.handleAlert
      );
    } else alert("Your energy level is less than 90%");
  }
  handleHeal() {
    let num2 = Math.floor(Math.random() * 20) + 1;
    if (this.state.player1 < 90) {
      this.setState(
        (state) => ({
          player1: this.state.player1 + 10 - num2,
          list: [
            ...state.list,
            { message: `You heal yourself by 10`, active: "win" },
            { message: `Monster hit you by ${num2}`, active: "loss" },
          ],
        }),
        this.handleAlert
      );
    }
  }
  handleGive() {
    this.setState({
      list: [...this.state.list, { message: "You give up" }],
      game: true,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="heading">
          <h1>YOU</h1>
          <h1>MONSTER</h1>
        </div>
        <div className="display">
          <div className="main-left">
            <div className="left">{this.state.player1}</div>
          </div>
          <div className="main-right">
            <div className="right">{this.state.monster}</div>
          </div>
        </div>
        <div className="button-div">
          <button onClick={this.handleAttack} className="attack">
            Attack
          </button>
          <button onClick={this.handleSpecialAttack} className="special-attack">
            Special Attack
          </button>
          <button className="heal" onClick={this.handleHeal}>
            Heal
          </button>
          <button className="give-up" onClick={this.handleGive}>
            Give up
          </button>
        </div>
        <div className="extra" />

        <div className="result-box">
          <ScrollableFeed forceScroll={true}>
            <div className="inner-div">
              <ul className="text">
                {this.state.list.map((val) => (
                  <li className={val.active}>{val.message}</li>
                ))}
              </ul>
            </div>
          </ScrollableFeed>
        </div>
      </React.Fragment>
    );
  }
}
