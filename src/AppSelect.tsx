import React, { Component } from "react";
// import { IPizzaSize, IPizza } from "./App";

export default class AppSelect extends Component<any> {
  setPrice(price: number) {
      // UPDATE PRICE STATE HERE
      console.log(price)
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          {this.props.options.map((opt: any) => {
            return (
              <div key={opt.id}>
                <button onClick={() => this.setPrice(opt.price)}>{opt.textDisplay} - ${opt.price}</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
