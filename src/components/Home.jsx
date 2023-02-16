import { useState } from "react";

export default function Home(props) {

    let [products, setProduct] = useState(props.initProducts)


    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === elem) {
                return true;
            }
        }
        return false;
    }

    function setAnimation(id, text) {
        setProduct(products.map(product => {
            if (product.id === id) {
                product.animation = text
            }
            return product
        }))
    }



    function AddProduct(id) {
        setProduct(products.map(product => {
            if (product.id === id && !contains(props.user.basket, id)) {
                let copy = Object.assign({}, props.user)
                copy.basket.push({id:id, kol:1, order:false})
                props.setUser(copy)
                console.log(props.user.basket);
            } else if (product.id === id && contains(props.user.basket, id)) {
                let copy = Object.assign({}, props.user)
                copy.basket = copy.basket.map((elem) => {
                    if (elem.id === id) {
                        elem.kol += 1
                    }
                    return elem
                })
                props.setUser(copy)
                
            }
            return product
        }))
    }

    let result = products.map(product => {
        return <div key={product.id} className={product.animation}>
            <h1 className="title">{product.name}</h1>
            <p className="text">Описание:{product.description}</p>
            <p className="text">Цена:{product.price}</p>
            {props.user !== null ?  <button onClick={() => {AddProduct(product.id); setAnimation(product.id, 'block active'); setTimeout(() => setAnimation(product.id, 'block'), 500)}}>Добавить в корзину</button>: ''}
        </div>
    })

    return result
}