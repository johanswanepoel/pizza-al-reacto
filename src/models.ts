export interface IPizzaAddon {
  type: AddonType;
  options: IPizzaOptions[];
}

export enum AddonType {
  topping = 'topping',
  size = 'size',
  crust = 'crust'
}

export interface IPizzaOptions {
  id: string;
  textDisplay: string;
  price: number;
  maxTopping?: number;
  imgUrl?: string;
}

export enum PizzaSizes {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum PizzaScreens {
  chooseYourSize = 0,
  chooseYourCrust,
  chooseYourToppings,
  checkYourCustomPizza
}

export enum MaxToppings {
  small = 5,
  medium = 7,
  large = 9
}
