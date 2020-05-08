import React, { Component } from "react";
import "./App.css";
import AppSelect from "./AppSelect";
import {
  PizzaSizeOptions,
  PizzaCrustOptions,
  PizzaToppingsOptions,
} from "./fakeBackend";
import { PizzaScreens, IPizzaAddon, IPizzaOptions, AddonType } from "./models";
interface IState {
  totalPrice: number;
  activeIndex: number;
  size: { size: string; price: number };
  crust: { size: string; price: number };
  toppings: string[];
}

export default class App extends Component<any, IState> {
  public state: IState;
  private sizeOptions = PizzaSizeOptions;
  private crustOptions = PizzaCrustOptions;
  private toppingsOptions = PizzaToppingsOptions;
  selection: { size: string; crust: string; toppings: string[] };

  constructor(props: any) {
    super(props);
    this.state = {
      totalPrice: 0,
      activeIndex: 0,
      size: { size: "", price: 0 },
      crust: { size: "", price: 0 },
      toppings: [],
    };
    this.selection = {
      size: this.state.size.size,
      crust: this.state.crust.size,
      toppings: this.state.toppings,
    };
  }

  setActiveTab() {
    let activeTab;
    switch (this.state.activeIndex) {
      case PizzaScreens.chooseYourSize:
        activeTab = (
          <AppSelect
            updatePizza={this.updatePizza.bind(this)}
            activeIndex={this.state.activeIndex}
            selection={this.selection}
            {...this.sizeOptions}
          />
        );
        break;
      case PizzaScreens.chooseYourCrust:
        activeTab = (
          <AppSelect
            updatePizza={this.updatePizza.bind(this)}
            activeIndex={this.state.activeIndex}
            selection={this.selection}
            {...this.crustOptions}
          />
        );
        break;
      case PizzaScreens.chooseYourToppings:
        activeTab = (
          <AppSelect
            updatePizza={this.updatePizza.bind(this)}
            activeIndex={this.state.activeIndex}
            selection={this.selection}
            {...this.toppingsOptions}
          />
        );
        break;
      case PizzaScreens.checkYourCustomPizza:
        activeTab = (
          <>
            <div>Your pizza:</div>
            <p>{this.state.toppings.length}x toppings: ${this.state.toppings.slice(3).length * 0.5}</p>
            <p>
              {this.state.size.size}: ${this.state.size.price}
            </p>
            <p>
              {this.state.crust.size}: ${this.state.crust.price}
            </p>
            <p>Total due: ${this.state.totalPrice}</p>
          </>
        );
        break;

      default:
        activeTab = (
          <>
            <div>Create your own pizza</div>
            <button>START</button>
          </>
        );
        break;
    }

    return activeTab;
  }

  setActiveIndex(n: number) {
    if (n >= 4 || n < 0) {
      return;
    }
    this.setState({
      activeIndex: n,
    });
    console.log(n);
    if (n === 3) {
      this.getTotalPrice();
    }
  }

  getTotalPrice() {
    let total =
      this.state.size.price +
      this.state.crust.price +
      this.state.toppings.slice(3).length * 0.5;
    this.setState({
      totalPrice: total,
    });
  }

  updatePizza(opts: IPizzaOptions & { type: string }) {
    const { id, price, type } = opts;
    switch (type) {
      case AddonType.size:
        this.setState({
          size: { size: id, price },
        });
        this.selection = {
          ...this.selection,
          size: id,
        };

        break;
      case AddonType.crust:
        this.setState({
          crust: { size: id, price },
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
        <div className="screen-container">
          {/* <p>{this.state.activeIndex}</p> */}
          {/* {this.selection.map((t) => (
            <p key={t}>{t}</p>
          ))} */}
          <div>{this.setActiveTab()}</div>
          <button
            onClick={() => this.setActiveIndex(this.state.activeIndex - 1)}
          >
            Back
          </button>
          <button
            onClick={() => this.setActiveIndex(this.state.activeIndex + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
