import './App.css';
import Home from './components/Home';
import { useState } from 'react';
import uuid from "react-uuid";
import {BrowserRouter as  Router,
  Routes,
  Route,
  Link,
  Navigate
  } from 'react-router-dom'
import Reg from './components/Reg';
import Log from './components/Log';
import Basket from './components/Basket';
import Order from './components/Order';

function App() {

  let initProducts = [
    {id:id(), name:'обычный сникерс', price: 50, description: 'Вкусный обычный сникерс всем советую', animation: 'block'},
    {id:id(), name:'сникерс лесной орех', price: 75, description: 'Вкусный необычный сникерс, топчик', animation: 'block'},
    {id:id(), name:'сникерс белый', price: 60, description: 'Сникерс, но только белый', animation: 'block'},
    {id:id(), name:'сникерс с ароматом кокоса', price: 100, description: 'Лимитированый коллаб сникерса и баунти', animation: 'block'}
  ]

  let [products, setProduct] = useState(initProducts)

  function id() {
    return uuid()
  }

  let initAccounts = [
    {id:1, name: 'Amirchik', age:10, pass: '123123', basket: []},
    {id:2, name: 'Timurchik',age:1010, pass: '123123', basket: []},
    {id:3, name: 'Azatick',age:16, pass: '123123', basket: []}
  ]
  const [accounts, setAccounts] = useState(initAccounts)
  const [user, setUser] = useState(null)


    return <Router>
      <header className='header'>
        <nav className='menu'>
          <ul className='list'>
            <li className='elem'>{user !== null ? <p>Здравствуйте, {user.name}</p> : ''}</li>
            {user !== null ? <><li className='elem'><button onClick={() => setUser(null)}>Выйти</button></li> <li className='elem'><Link to='Basket'>Корзина</Link></li></> : <><li className='elem'><Link to='reg'>Регистрация</Link></li>
            <li className='elem'><Link to='log'>Войти</Link></li></>}
            <li className='elem'><Link to='/' >Домой</Link></li>
          </ul>
        </nav> 
      </header>
      <section className='container'>
        <Routes>
        <Route path='/' element={<Home user={user} initProducts={products} setUser={(copy) => setUser(copy)} />} />
        <Route path='reg' element={user ? <Navigate to="/" /> :  <Reg accounts={accounts} user={user} setUser={(copy) => setUser(copy)} setAccounts={(copy) => setAccounts(copy)}/>} />
        <Route path='log' element={user ? <Navigate to="/" /> :  <Log accounts={accounts} user={user} setUser={(copy) => setUser(copy)} setAccounts={(copy) => setAccounts(copy)}/>} />
        <Route path='basket'element={!user ? <Navigate to="/" /> : <Basket user={user} initProducts={products} setUser={(copy) => setUser(copy)} setProducts={setProduct}/>} />
        <Route path='/order'element={!user ? <Navigate to="/" /> : <Order user={user} products={products}/>} />
      </Routes>
      </section>
    </Router>  
}
export default App;
