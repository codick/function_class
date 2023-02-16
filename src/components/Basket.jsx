import { useState } from "react";
import { Link } from "react-router-dom";

export default function Basket(props) {
  let [products, setProduct] = useState(props.initProducts);

  function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === elem) {
        return true;
      }
    }
    return false;
  }

  function AddOrder(user) {
    let copy = Object.assign({}, user);
    console.warn(copy);
    for (let i = 0; i < copy.basket.length; i++) {
      copy.basket[i].order = true;
    }
    props.setUser(copy);
  }

  function DelProduct(id) {
    setProduct(
      products.map((product) => {
        if (product.id == id && contains(props.user.basket, id)) {
          let copy = Object.assign({}, props.user);
          for (let i = 0; i < copy.basket.length; i++) {
            if (copy.basket[i].id === id) {
              copy.basket.splice(i, 1);
            }
          }
          props.setUser(copy);
        }
        return product;
      })
    );
  }

  function setNum(num, id) {
    let copy = Object.assign({}, props.user);
    for (var i = 0; i < copy.basket.length; i++) {
      if (copy.basket[i].id === id) {
        copy.basket[i].kol = num;
      }
    }

    props.setUser(copy);
  }
  let result = props.user.basket.map((order, index) => {
    let product;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === order.id) {
        console.log(products, order);
        product = products[i];
        return (
          <div key={product.id} className="block">
            <h1 className="title">{product.name}</h1>
            <p className="text">Описание:{product.description}</p>
            <p className="text">Цена:{product.price}</p>
            {props.user !== null ? (
              <label htmlFor="Num">Колличество: </label>
            ) : (
              ""
            )}
            {props.user !== null ? (
              <input
              className="NumInput"
                id="Num"
                type="number"
                value={props.user.basket[index].kol}
                onChange={(event) => {
                  setNum(event.target.value, props.user.basket[index].id);
                }}
              />
            ) : (
              ""
            )}
            {props.user !== null ? (
              <button onClick={() => DelProduct(product.id)}>
                Удалить с корзины
              </button>
            ) : (
              ""
            )}
          </div>
        );
      }
    }
  });

  return (
    <div>
      {result}
      <button
        onClick={() => {
          AddOrder(props.user);
        }}
      >
        Добавить в заказ
      </button>
      <Link className="order" to="/order">Перейти на заказ</Link>
    </div>
  );
}
