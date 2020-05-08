export interface IPizzaAddon {
  title: string;
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

export enum PizzaScreens {
  chooseYourSize = 0,
  chooseYourCrust,
  chooseYourToppings,
  checkYourCustomPizza,
}
