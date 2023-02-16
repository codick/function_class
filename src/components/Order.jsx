import { useRef } from "react";
import '../App.css'

export default function Order(props) {
  let sum = useRef(0).current;
  console.log(props);
  let result = props.user.basket.map((order) => {
    if (order.order) {
            let product = GetProductById(order.id);
        sum += order.kol * product.price;
        return (
        <div key={product.id} className="block">
            <h1 className="title">{product.name}</h1>
            <p className="text">Описание:{product.description}</p>
            <p className="text">Цена 1 продукта:{product.price}</p>
            <p>Количество: {order.kol}</p>
            <p className="text">
            Общая цена продукта:{product.price * order.kol}
            </p>
        </div>
        );
    }
   
  });

  function GetProductById(id) {
    for (let product of props.products) {
      if (product.id === id) return product;
    }
  }

  return (
    <div>
      {result}
      <p className="text">Общая стоимость: {sum}</p>
    </div>
  );
}
