import * as React from "react";
import { PizzaScreens } from "./models";

export default function AppNav(props: any) {
  const { setActiveScreenIndex, activeIndex, selection } = props;

  const canNext = () => {
    let value = false;
    switch (activeIndex) {
        case PizzaScreens.chooseYourSize:
            value = !!selection.size
            break;
        case PizzaScreens.chooseYourCrust:
            value = !!selection.crust
            break;
        case PizzaScreens.chooseYourToppings:
            value = true
            break;
    
        default:
            value = true
            break;
    }
    return value;
  }

  return (
    <div>
      {activeIndex > PizzaScreens.chooseYourSize ? (
        <button onClick={() => setActiveScreenIndex("prev")}>Back</button>
      ) : null}
      {activeIndex < PizzaScreens.checkYourCustomPizza ? (
        <button onClick={() => setActiveScreenIndex("next")} disabled={!canNext()}>Next</button>
      ) : null}
    </div>
  );
}
