import Styles from "./Conversations.module.css"
import { IoSend } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react";
import { UserData } from "../../Types/UserData";


import Socket from "../../socket/socker"




const Conversations = ()=>{
  const {id} = useParams() 
  const [user,setUser] = useState<UserData>(); 
  const roomName = `User-Chat-room-${id}`
  const [messages,setMessage] = useState<string[]>(["vou me atrasar!!","vou me atrasar!!","vou me atrasar!!",]);
  const [inputMessage,setInputMessage] = useState<string>("")
  
  useEffect(()=>{


    const request = async ()=>{
     
      const response = await fetch(`http://localhost:4000/one/${id}`)
      const data = await response.json()
      setUser(data)
    }
    request()
    Socket.emit("joinRoomUser",roomName)
    Socket.on("RoomMessage",(data)=>{setMessage((prev)=>[...prev,data.Message])})
      return ()=>{
        Socket.off("RoomMessage");
      }


  },[id,roomName])

    const handleMessage = ()=>{
        Socket.emit("sendMessage",{RoomName:roomName,Message:inputMessage})
    }
  

  return (
    <section className={Styles.chatSection}>
      <header className={Styles.headerChat}><img src={user?.ImageProfile || `https://labes.inf.ufes.br/wp-content/uploads/sem-foto.jpg`}/><h3>{user?.Name}</h3></header>
      <div className={Styles.conteinerMessages}>
        {messages && messages.map((message)=><span>{message}</span>)}
      </div>
      <div className={Styles.chatConteiners}>
      <FaFileUpload className={Styles.iconSend}  /><input type="text" onChange={(e)=>setInputMessage(e.target.value)}/><IoSend className={Styles.iconSend}   onClick={handleMessage}/>
      </div>
    </section>
  )




}


export default Conversations