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

  pizzaToppingsOptions = {
    title: "Add your toppings",
    options: [
      {
        id: "pepperoni",
        textDisplay: "Pepperoni",
        price: 0.50,
      },
      {
        id: "mushrooms",
        textDisplay: "Mushrooms",
        price: 0.50,
      },
      {
        id: "onions",
        textDisplay: "Onions",
        price: 0.50,
      },
      {
        id: "sausage",
        textDisplay: "Sausage",
        price: 0.50,
      },
      {
        id: "bacon",
        textDisplay: "Bacon",
        price: 0.50,
      },
      {
        id: "extra_cheese",
        textDisplay: "Extra cheese",
        price: 0.50,
      },
      {
        id: "black_olives",
        textDisplay: "Black olives",
        price: 0.50,
      },
      {
        id: "green_peppers",
        textDisplay: "Green peppers",
        price: 0.50,
      },
      {
        id: "pineapple",
        textDisplay: "Pineapple",
        price: 0.50,
      },
      {
        id: "spinach",
        textDisplay: "Spinach",
        price: 0.50,
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
        <div>
          <AppSelect {...this.pizzaToppingsOptions} />
        </div>
      </>
    );
  }
}
