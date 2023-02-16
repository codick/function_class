import { useState } from "react";
import { Link, redirect } from "react-router-dom";

export default function Reg(props) {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [pass, setPass] = useState('')
    const [result, setResult] = useState('')
    const [color, setColor] = useState('green')

    function AddAccount(name, age, pass) {
        let obj = {id:props.accounts.length - 1, name: name, age: age, pass: pass, basket: []}
        let copy = Object.assign([], props.accounts)
        copy.push(obj)
        props.setAccounts(copy)
        props.setUser(obj)
    }

    function Valid(name, age, pass) {
        if (typeof(name) !== 'string' || name.length <= 2) {
            setResult(<p style={{ color: 'red' }}>Вы ввели некоректно имя</p>)
            setColor('red')
        }
        else if (age < 12) {
            setResult(<p style={{ color: 'red' }}>Ваш возраст меньше 12 лет</p>)
            setColor('red')
        }
        else if (pass.length < 8) {
            setResult(<p style={{ color: 'red' }}>Длина пароля меньше 8 символов</p>)
            setColor('red')
        } else {
            setColor('green')
            setResult('')
            AddAccount(name, age, pass)
        }
        
    }
    let block = <div>
        <label htmlFor="Name">Имя</label>
        <input className="user__input" style={{ borderColor: color }} id="Name" type="text" value={name} onChange={(event)=>setName(event.target.value)}/> <br />
        <label htmlFor="Age">Возраст</label>
        <input className="user__input" style={{ borderColor: color }} id="Age" type="number" value={age} onChange={(event)=>setAge(event.target.value)}/> <br />
        <label htmlFor="Pass">Пароль</label>
        <input className="user__input" style={{ borderColor: color }} id="Pass" type="password" value={pass} onChange={(event)=>setPass(event.target.value)}/> <br />
        <button onClick={() => Valid(name, age, pass)}>Зарегестрироваться</button>
        {result}
    </div>

    return block
}