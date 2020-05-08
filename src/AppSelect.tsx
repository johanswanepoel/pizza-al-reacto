import * as React from "react";
import { IPizzaAddon, AddonType, PizzaScreens, IPizzaOptions } from "./models";


export default function AppSelect(props: IPizzaAddon & any) {
    const { title, type, options, updatePizza, activeIndex, selection } = props;

    const isActive = (id: string) => {
        let isactive = false;
        switch (activeIndex) {
            case PizzaScreens.chooseYourSize:
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
            {options.map((opt: IPizzaOptions) => {
            const {price, textDisplay, id, maxTopping} = opt 
              return (
                <>
                  <div key={id} onClick={() => updatePizza({type, ...opt})} className={`option ${isActive(id)} ${type}`} >
                    <img src={type === AddonType.topping ? require(`./img/${id}.png`) : null} alt={''} />
                    <p>{textDisplay}: ${price}</p>
                  </div>
                  {/* {maxTopping ? <p>Max toppings: {maxTopping}</p> : null} */}
                </>
              );
            })}
          </div>
        </div>
      );
  }