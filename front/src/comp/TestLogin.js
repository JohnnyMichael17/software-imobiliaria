import api from "../services/api"
import {login} from "../services/auth"
import {  useState } from "react"

const Login = () => {
    const [data, setData] = useState({email:"", password:""})
    const doLogin = () => {
        api.post("/Login", data)
            .then((response) => {
            login (response.data.data.token)
        }).catch((error) => {
            console.log(error)
        })

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        doLogin()
    }
    const onChange = (e) => {
        const {name,value}=e.target
        setData ({
            ...data, [name]:value,
            
        })
        
    }
    return <div>
        <form>
            <input type = "text" name = "email" value={data.email} onChange={(e) => onChange(e)} 
                placeholder = "e-mail"/>
            <input type = "text" name = "password" value={data.password} onChange={(e) => onChange(e)} 
                placeholder = "password"/>
            <button type ="button" onClick = {(e) => handleSubmit(e)} >Enviar</button>
        </form>
    </div>
}
export default Login 