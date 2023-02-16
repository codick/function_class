import { useState } from "react";
import { redirect } from "react-router-dom";

export default function Log(props) {

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [result, setResult] = useState('')
    const [color, setColor] = useState('green')

    function ChoiseAccount(name, pass) {
        props.accounts.map(account => {
            if (account.name !== name || account.pass !== pass) {
                setResult(<p  style={{ color: 'red' }}>Неверный логин или пароль</p>)
                setColor('red')
            } else {
                setResult('')
                setColor('green')
                props.setUser(account)
                block = redirect("/")
            }
        })
    }
    let block = <div>
        <label  htmlFor="Name">Имя</label>
        <input className="user__input" style={{ borderColor: color }} id="Name" type="text" value={name} onChange={(event)=>setName(event.target.value)}/> <br />
        <label htmlFor="Pass">Пароль</label>
        <input className="user__input" style={{ borderColor: color }} id="Pass" type="password" value={pass} onChange={(event)=>setPass(event.target.value)}/> <br />
        <button onClick={() =>{ChoiseAccount(name, pass); console.log(block);}}>Войти</button>
        {result}
    </div>

    return block
}