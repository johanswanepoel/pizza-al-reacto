import React, { Component } from "react";
import "./App.css";
import AppSelect from "./AppSelect";
import {
  PizzaSizeOptions,
  PizzaCrustOptions,
  PizzaToppingsOptions,
} from "./fakeBackend";
import {
  PizzaScreens,
  IPizzaAddon,
  IPizzaOptions,
  AddonType,
  MaxToppings,
  PizzaSizes,
} from "./models";
import AppNav from "./AppNav";
import AppFinalPizza from "./AppFinalPizza";
interface IState {
  totalPrice: number;
  activeIndex: number;
  size: { value: string; price: number };
  crust: { value: string; price: number };
  toppings: string[];
}

export default class App extends Component<any, IState> {
  public state: IState;
  private maxReached = false;
  private toppingPrice = 0.5;
  private freeToppings = 3;
  private pizzaPropOptions: IPizzaAddon;

  constructor(props: any) {
    super(props);
    this.state = {
      totalPrice: 0,
      activeIndex: 0,
      size: { value: "", price: 0 },
      crust: { value: "", price: 0 },
      toppings: [],
    };
    this.pizzaPropOptions = PizzaSizeOptions;
  }

  setActiveScreen(n: number) {
    // set options prop for AppSelect depending on which screen i'm showing
    switch (n) {
      case PizzaScreens.chooseYourSize:
        this.pizzaPropOptions = PizzaSizeOptions;
        break;
      case PizzaScreens.chooseYourCrust:
        this.pizzaPropOptions = PizzaCrustOptions;
        break;
      case PizzaScreens.chooseYourToppings:
        this.pizzaPropOptions = PizzaToppingsOptions;
        break;

      default:
        break;
    }
  }

  setActiveScreenIndex(action: string) {
    console.log(action);
    // updates active index which in turns returns the associated screen
    let n = this.state.activeIndex;
    if (action === "next") {
      ++n;
    } else {
      --n;
      // resets toppings if user go back to select different size
      if (n === PizzaScreens.chooseYourSize) {
        this.setState({
          toppings: [],
        });
      }
    }

    if (
      n > PizzaScreens.checkYourCustomPizza ||
      n < PizzaScreens.chooseYourSize
    ) {
      return;
    }
    this.setActiveScreen(n);
    this.setState({
      activeIndex: n,
    });
    if (n === PizzaScreens.checkYourCustomPizza) {
      // if user is on last screen - get total price
      this.getTotalPrice();
    }
  }

  getTotalPrice() {
    // To be honest I would have liked to move this to a reduce function on every update - but ran short of time :-)
    let total =
      this.state.size.price +
      this.state.crust.price +
      this.state.toppings.slice(this.freeToppings).length * this.toppingPrice;
    this.setState({
      totalPrice: total,
    });
  }

  updatePizza(opts: IPizzaOptions & { type: string }) {
    const { id, price, type } = opts;

    //  checks update type eg. size, crust and toppings and updates state
    //  updates each part of state using switch statement

    switch (type) {
      case AddonType.size:
        this.setState({
          size: { value: id, price },
        });

        break;
      case AddonType.crust:
        this.setState({
          crust: { value: id, price },
        });

        break;
      case AddonType.topping:
        if (this.state.toppings.includes(id)) {
          this.setState({
            toppings: this.state.toppings.filter((t) => t !== id),
          });
          return;
        }

        // set max toppings reached var
        if (this.state.size.value === PizzaSizes.small) {
          this.maxReached = this.state.toppings.length >= MaxToppings.small;
        } else if (this.state.size.value === PizzaSizes.medium) {
          this.maxReached = this.state.toppings.length >= MaxToppings.medium;
        } else {
          this.maxReached = this.state.toppings.length >= MaxToppings.large;
        }

        // check if max reached and return
        if (this.maxReached) return;

        // update state if max not reached
        this.setState({
          toppings: [id, ...this.state.toppings],
        });
       
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Pizza-al-Reacto</header>
        <div className="screen-container">
          {/* If index is less than last screen - show options else show final pizza */}
          {this.state.activeIndex < PizzaScreens.checkYourCustomPizza ? (
            // Options outlet
            <AppSelect
              key={this.pizzaPropOptions.type}
              updatePizza={this.updatePizza.bind(this)}
              activeIndex={this.state.activeIndex}
              {...this.state}
              {...this.pizzaPropOptions}
            />
          ) : (
            // Final pizza
            <AppFinalPizza
              {...this.state}
              toppingPrice={this.toppingPrice}
              freeToppings={this.freeToppings}
            />
          )}

          {/* nav buttons outlet */}
          <AppNav
            {...this.state}
            setActiveScreenIndex={this.setActiveScreenIndex.bind(this)}
            activeIndex={this.state.activeIndex}
          />
        </div>
      </div>
    );
  }
}
