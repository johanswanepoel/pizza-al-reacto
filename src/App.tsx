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
  // private sizeOptions: IPizzaAddon = PizzaSizeOptions;
  // private crustOptions: IPizzaAddon = PizzaCrustOptions;
  // private toppingsOptions: IPizzaAddon = PizzaToppingsOptions;
  private selection: { size: string; crust: string; toppings: string[] };
  private maxReached = false;
  private toppingPrice = 0.5;
  private freeToppings = 3;
  private options: IPizzaAddon;

  constructor(props: any) {
    super(props);
    this.state = {
      totalPrice: 0,
      activeIndex: 0,
      size: { value: "", price: 0 },
      crust: { value: "", price: 0 },
      toppings: [],
    };
    this.selection = {
      size: this.state.size.value,
      crust: this.state.crust.value,
      toppings: this.state.toppings,
    };
    this.options = PizzaSizeOptions;
  }

  setActiveScreen(n: number) {
    switch (n) {
      case PizzaScreens.chooseYourSize:
        this.options = PizzaSizeOptions;
        break;
      case PizzaScreens.chooseYourCrust:
        this.options = PizzaCrustOptions;
        break;
      case PizzaScreens.chooseYourToppings:
        this.options = PizzaToppingsOptions;
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
        this.selection.toppings = [];
        this.setState({
          toppings: this.selection.toppings,
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
        this.selection = {
          ...this.selection,
          size: id,
        };

        break;
      case AddonType.crust:
        this.setState({
          crust: { value: id, price },
        });
        this.selection = {
          ...this.selection,
          crust: id,
        };

        break;
      case AddonType.topping:
        if (this.state.toppings.includes(id)) {
          this.setState({
            toppings: this.state.toppings.filter((t) => t !== id),
          });
          this.selection = {
            ...this.selection,
            toppings: this.state.toppings.filter((t) => t !== id),
          };
          return;
        }

        if (this.state.size.value === PizzaSizes.small) {
          this.maxReached = this.state.toppings.length >= MaxToppings.small;
        } else if (this.state.size.value === PizzaSizes.medium) {
          this.maxReached = this.state.toppings.length >= MaxToppings.medium;
        } else {
          this.maxReached = this.state.toppings.length >= MaxToppings.large;
        }

        if (this.maxReached) return;

        this.setState({
          toppings: [id, ...this.state.toppings],
        });
        this.selection = {
          ...this.selection,
          toppings: [id, ...this.state.toppings],
        };

        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Pizza-al-Reacto</header>
        {/* nav buttons outlet */}
        <div className="screen-container">
       
          {this.state.activeIndex < PizzaScreens.checkYourCustomPizza ? (
            <AppSelect
              key={this.state.activeIndex}
              updatePizza={this.updatePizza.bind(this)}
              activeIndex={this.state.activeIndex}
              selection={this.selection}
              {...this.options}
            />
          ) : (
            <AppFinalPizza
              {...this.state}
              toppingPrice={this.toppingPrice}
              freeToppings={this.freeToppings}
            />
          )}
        <AppNav
          selection={{ ...this.selection }}
          setActiveScreenIndex={this.setActiveScreenIndex.bind(this)}
          activeIndex={this.state.activeIndex}
        />
        </div>
      </div>
    );
  }
}
