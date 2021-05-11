import * as React from 'react';
import { IPizzaAddon, AddonType, PizzaScreens, IPizzaOptions } from './models';

export default function AppSelect(props: IPizzaAddon & any) {
  const { type, options, updatePizza, activeIndex, size, crust, toppings } = props;

  const isActive = (id: string) => {
    let isactive = false;
    switch (activeIndex) {
      case PizzaScreens.chooseYourSize:
        isactive = size.value === id;
        break;
      case PizzaScreens.chooseYourCrust:
        isactive = crust.value === id;
        break;
      case PizzaScreens.chooseYourToppings:
        isactive = toppings.includes(id);
        break;

      default:
        break;
    }
    return isactive ? 'active' : '';
  };

  return (
    <div>
      <div className='options-container'>
        {options.map((opt: IPizzaOptions) => {
          const { price, textDisplay, id, maxTopping } = opt;
          return (
            <div key={id} onClick={() => updatePizza({ type, ...opt })} className={`option ${isActive(id)} ${type}`}>
              <img src={type === AddonType.topping ? require(`./img/${id}.png`) : null} alt={''} />
              <p className='uppercase'>
                {textDisplay}: ${price}
              </p>
              {maxTopping && <small className='toppings'>(Toppings: {maxTopping})</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
