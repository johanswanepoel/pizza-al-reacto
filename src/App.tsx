import React, { Component } from "react";
import AppSelect from "./AppSelect";

export interface IPizza {
  title: string;
}

export interface IPizzaSize extends IPizza {
  // options: any[]
}

export interface IPizzaCrust extends IPizza {
  // options: any[]
}

interface Props {}

interface State {
  price: number;
}

export default class App extends Component<any, State> {
  state: State = {
    price: 0,
  };

  pizzaSizeOptions = {
    title: "How hungry are you?",
    options: [
      {
        id: "small",
        textDisplay: "small",
        price: 8,
        maxTopping: 5,
      },
      {
        id: "medium",
        textDisplay: "medium",
        price: 10,
        maxTopping: 7,
      },
      {
        id: "large",
        textDisplay: "large",
        price: 12,
        maxTopping: 9,
      },
    ],
  };

  pizzaCrustOptions = {
    title: "Select your crust preference",
    options: [
      {
        id: "thin",
        textDisplay: "thin",
        price: 2,
      },
      {
        id: "thick",
        textDisplay: "thick",
        price: 4,
      },
    ],
  };

  render() {
    return (
      <>
        <div>
          <AppSelect {...this.pizzaSizeOptions} />
        </div>
        <div>
          <AppSelect {...this.pizzaCrustOptions} />
        </div>
      </>
    );
  }
}
