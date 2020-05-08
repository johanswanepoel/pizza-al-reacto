import * as React from "react";
import { IPizzaAddon, AddonType, PizzaScreens } from "./models";


export default function AppSelect(props: IPizzaAddon & any) {
    const { title, type, options, updatePizza, activeIndex, selection } = props;

    const isActive = (id: string) => {
        let isactive = false;
        switch (activeIndex) {
            case PizzaScreens.chooseYourSize:
                console.log(selection, id)
                isactive = selection.size === id
                break;
            case PizzaScreens.chooseYourCrust:
                isactive = selection.crust === id
                break;
            case PizzaScreens.chooseYourToppings:
                isactive = selection.toppings.includes(id)
                break;
        
            default:
                break;
        }
        return isactive ? 'active' : '';
    }
   
    return (
        <div>
          <h1>{title}</h1>
          <div className="options-container">
            {options.map((opt: any) => {
            const {price, textDisplay, id} = opt 
              return (
                <div key={id}>
                  <div onClick={() => updatePizza({type, ...opt})} className={"option " + isActive(id)} >
                    <img src={type === AddonType.topping ? require(`./img/${id}.jpeg`) : null} />
                    <p>{textDisplay} - ${price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
  }