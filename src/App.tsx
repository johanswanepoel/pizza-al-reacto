import React, { Component } from 'react';
import './App.css';
import AppSelect from './AppSelect';
import { PizzaSizeOptions, PizzaCrustOptions, PizzaToppingsOptions } from './fakeBackend';
import { PizzaScreens, IPizzaAddon, IPizzaOptions, AddonType, MaxToppings, PizzaSizes } from './models';
import AppNav from './AppNav';
import AppFinalPizza from './AppFinalPizza';
interface IState {
  totalPrice: number;
  activeIndex: number;
  size: { value: string; price: number };
  crust: { value: string; price: number };
  toppings: string[];
  title: string;
  maxTopping: number;
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
      size: { value: '', price: 0 },
      crust: { value: '', price: 0 },
      toppings: [],
      title: 'Select your pizza size',
      maxTopping: 0
    };
    this.pizzaPropOptions = PizzaSizeOptions;
  }

  setActiveScreen(n: number) {
    // set options prop for AppSelect depending on which screen i'm showing
    switch (n) {
      case PizzaScreens.chooseYourSize:
        this.pizzaPropOptions = PizzaSizeOptions;
        this.setState({ title: 'Select your pizza size' });
        break;
      case PizzaScreens.chooseYourCrust:
        this.pizzaPropOptions = PizzaCrustOptions;
        this.setState({ title: 'Select your crust preference' });
        break;
      case PizzaScreens.chooseYourToppings:
        this.pizzaPropOptions = PizzaToppingsOptions;
        this.setState({ title: `Select your ${this.state.maxTopping} toppings` });
        break;

      default:
        break;
    }
  }

  setActiveScreenIndex(action: string) {
    console.log(action);
    // updates active index which in turns returns the associated screen
    let n = this.state.activeIndex;
    if (action === 'next') {
      ++n;
    } else {
      --n;
      // resets toppings if user go back to select different size
      if (n === PizzaScreens.chooseYourSize) {
        this.setState({
          toppings: []
        });
      }
    }

    if (n > PizzaScreens.checkYourCustomPizza || n < PizzaScreens.chooseYourSize) {
      return;
    }
    this.setActiveScreen(n);
    this.setState({
      activeIndex: n
    });
    if (n === PizzaScreens.checkYourCustomPizza) {
      // if user is on last screen - get total price
      this.getTotalPrice();
    }
  }

  getTotalPrice() {
    let total = this.state.size.price + this.state.crust.price + this.state.toppings.length * this.toppingPrice;
    this.setState({
      totalPrice: total - this.freeToppings * this.toppingPrice
    });
  }

  updatePizza(opts: IPizzaOptions & { type: string }) {
    const { id, price, type, maxTopping } = opts;

    //  checks update type eg. size, crust and toppings and updates state
    //  updates each part of state using switch statement

    switch (type) {
      case AddonType.size:
        this.setState({
          size: { value: id, price },
          maxTopping: maxTopping ?? 0
        });

        break;
      case AddonType.crust:
        this.setState({
          crust: { value: id, price }
        });

        break;
      case AddonType.topping:
        if (this.state.toppings.includes(id)) {
          this.setState({
            toppings: this.state.toppings.filter((t) => t !== id)
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
          toppings: [id, ...this.state.toppings]
        });

        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>Pizza-al-Reacto</header>
        <h1 className='heading'>{this.state.title}</h1>
        <div style={{ padding: '30px' }}>
          <p>
            {this.state.size.value && <span>One {this.state.size.value} pizza</span>}
            {this.state.crust.value && <span>, with a {this.state.crust.value} crust</span>}
            {!!this.state.toppings.length && (
              <span>
                , topped with{' '}
                {this.state.toppings
                  .reverse()
                  .map((t) => t.replace('_', ' '))
                  .join(', ')}
                !
              </span>
            )}
          </p>
        </div>
        <div className='screen-container'>
          {/* If index is less than last screen - show options else show final pizza */}
          {this.state.activeIndex < PizzaScreens.checkYourCustomPizza ? (
            // Options outlet
            <AppSelect
              key={this.pizzaPropOptions.type}
              updatePizza={this.updatePizza.bind(this)}
              {...this.state}
              {...this.pizzaPropOptions}
            />
          ) : (
            // Final pizza
            <AppFinalPizza {...this.state} toppingPrice={this.toppingPrice} freeToppings={this.freeToppings} />
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
