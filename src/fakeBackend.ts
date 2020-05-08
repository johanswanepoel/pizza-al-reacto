import { IPizzaAddon, AddonType } from "./models";

export const PizzaSizeOptions: IPizzaAddon = {
  title: "How hungry are you?",
  type: AddonType.size,
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

export const PizzaCrustOptions: IPizzaAddon = {
  title: "Select your crust preference",
  type: AddonType.crust,
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

export const PizzaToppingsOptions: IPizzaAddon = {
  title: "Add your toppings",
  type: AddonType.topping,
  options: [
    {
      id: "pepperoni",
      textDisplay: "Pepperoni",
      price: 0.5,
    },
    {
      id: "mushrooms",
      textDisplay: "Mushrooms",
      price: 0.5,
    },
    {
      id: "onions",
      textDisplay: "Onions",
      price: 0.5,
    },
    {
      id: "sausage",
      textDisplay: "Sausage",
      price: 0.5,
    },
    {
      id: "bacon",
      textDisplay: "Bacon",
      price: 0.5,
    },
    {
      id: "extra_cheese",
      textDisplay: "Extra cheese",
      price: 0.5,
    },
    {
      id: "black_olives",
      textDisplay: "Black olives",
      price: 0.5,
    },
    {
      id: "green_peppers",
      textDisplay: "Green peppers",
      price: 0.5,
    },
    {
      id: "pineapple",
      textDisplay: "Pineapple",
      price: 0.5,
    },
    {
      id: "spinach",
      textDisplay: "Spinach",
      price: 0.5,
    },
  ],
};
