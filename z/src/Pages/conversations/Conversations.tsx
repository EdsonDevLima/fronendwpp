import Styles from "./Conversations.module.css"
import { IoSend } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react";
import { UserData } from "../../Types/UserData";

const Conversations = ()=>{
  const {id} = useParams() 
  const [user,setUser] = useState<UserData>(); 
  
  useEffect(()=>{
    
    const request = async ()=>{
     
      const response = await fetch(`http://localhost:4000/one/${id}`)
      const data = await response.json()
      setUser(data)
    }
    request()




  },[id])
  

  return (
    <section className={Styles.chatSection}>
      <header className={Styles.headerChat}><img src={user?.ImageProfile || `https://labes.inf.ufes.br/wp-content/uploads/sem-foto.jpg`}/><h3>{user?.Name}</h3></header>
      <div className={Styles.chatConteiners}>
      <FaFileUpload className={Styles.iconSend} /> <input type="text"/><IoSend className={Styles.iconSend} />
      </div>
    </section>
  )




}


export default Conversations