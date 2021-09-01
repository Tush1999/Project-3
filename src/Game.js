import React, { Component } from "react";
import "./style.css";
import ScrollableFeed from "react-scrollable-feed";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 100,
      monster: 100,
      list: [],
      active: "loss",
      count: 0,
    };
    this.handleAttack = this.handleAttack.bind(this);
    this.handleSpecialAttack = this.handleSpecialAttack.bind(this);
    this.handleHeal = this.handleHeal.bind(this);
    this.handleGive = this.handleGive.bind(this);
  }
  handleAttack() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    console.log(num1,num2)
    this.setState(
      (state) => ({
        monster: state.monster - num1,
        active: "win",
        list: [...state.list, `You hit monster by ${num1}`],
      }),
      () =>
        this.setState({
          player1: this.state.player1- num2,
          active: "loss",
          list: [...this.state.list, `Monster hit you by ${num2}`],
        })
    );
  }

  handleSpecialAttack() {
    if (this.state.player1 > 90) {
      let num1 = Math.floor(Math.random() * 11) + 10;
      let num2 = Math.floor(Math.random() * 20) + 1;
      this.setState(
        (state) => ({
          monster: state.monster - num1,
          active: "win",
          list: [...state.list, `You hit monster by ${num1}`],
        }),
        () =>
          this.setState({
            player1: this.state.monster - num2,
            active: "loss",
            list: [...this.state.list, `Monster hit you by ${num2}`],
          })
      );
    } else alert("Your energy level is less than 90%");
  }
  handleHeal() {
    let num2 = Math.floor(Math.random() * 20) + 1;
    this.setState(
      (state) => ({
        active: "win",
        list: [...state.list, `You heal yourself by 10%`],
      }),
      () =>
        this.setState({
          player1: this.state.monster - num2,
          active: "loss",
          list: [...this.state.list, `Monster hit you by ${num2}`],
        })
    );
  }
  handleGive() {
    this.setState({ list: [...this.state.list, "You give up"], game: true });
  }
  render() {
    return (
      <>
        <div className="heading">
          <h1>YOU</h1>
          <h1>MONSTER</h1>

          ''
        </div>
        {this.state.player1 < = 0 || this.state.game
          ?   alert("Awwww....You lose this game. Play again")
          : null}
        {this.state.monster <= 0 ? alert("You win this game") : null}
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
        <ScrollableFeed>
          <div className="extra"></div>

          <div className="result-box">
            <div className="inner-div">
              <ul className="text">
                {this.state.list.map((val) => (
                  <li className={this.state.count % 2 === 1 ? "win" : "loss"}>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollableFeed>
      </>
    );
  }
}
