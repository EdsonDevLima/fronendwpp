import Styles from "./ContactsList.module.css"
import { useNavigate} from "react-router-dom"
import { useEffect,useState } from "react"
import { UserData } from "../Types/UserData"
const ContactsList = ()=>{

const [Users,setUsers] = useState<UserData[]>([])

useEffect(()=>{

const requestUsers = async ()=>{

const response = await fetch("http://localhost:4000/all")
const data = await response.json()
setUsers(data.AllUsers)
}

requestUsers()

},[])



const nav = useNavigate()


return(
  <nav className={Styles.ListUsers}>
    <div className={Styles.FilterUsers}>
      <h1>Conversas</h1>
      <input type="text" placeholder="Pesquisar"/>
      <div className={Styles.ConteinerBtns}>
      <button>Tudo</button>        
      <button>Grupos</button>        
      <button>Desconectar</button>        
      </div>

      
      </div>
    { Users.map((user)=><div onClick={()=>nav(`user/${user.id}`)}  key={user.id}><img src={user.ImageProfile ||`https://labes.inf.ufes.br/wp-content/uploads/sem-foto.jpg`}></img><h3>{user.Name}</h3><span>13:00</span></div>)}
  </nav>
)

}


export default ContactsList