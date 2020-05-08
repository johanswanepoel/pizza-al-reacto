import React from "react";

export default function AppFinalPizza(props: any) {
  const {
    toppings,
    size,
    crust,
    totalPrice,
    toppingPrice,
    freeToppings,
  } = props;
  return (
    <div>
      <h1>Your custom pizza:</h1>

      <table>
        <tbody>
          <tr>
            <th>Size</th>
            <td>{size.value}</td>
            <td>${size.price}</td>
          </tr>
          <tr>
            <th>Crust</th>
            <td>{crust.value}</td>
            <td>${crust.price}</td>
          </tr>
          <tr>
            <th>Toppings</th>
            <td>{toppings.length}x toppings</td>
            <td>${toppings.slice(freeToppings).length * toppingPrice}</td>
          </tr>
          <tr>
            <th>Total due:</th>
            <td></td>
            <td>
              <strong>${totalPrice}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
