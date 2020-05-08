import * as React from "react";
import { PizzaScreens } from "./models";

export default function AppNav(props: any) {
  const { setActiveScreenIndex, activeIndex, size, crust } = props;

  const canNext = () => {
    let value = false;
    switch (activeIndex) {
        case PizzaScreens.chooseYourSize:
            value = !!size.value
            break;
        case PizzaScreens.chooseYourCrust:
            value = !!crust.value
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
    <div className="nav-group">
      {activeIndex > PizzaScreens.chooseYourSize ? (
        <button className="nav" onClick={() => setActiveScreenIndex("prev")}>Back</button>
      ) : null}
      {activeIndex < PizzaScreens.checkYourCustomPizza ? (
        <button className="nav" onClick={() => setActiveScreenIndex("next")} disabled={!canNext()}>Next</button>
      ) : null}
    </div>
  );
}
