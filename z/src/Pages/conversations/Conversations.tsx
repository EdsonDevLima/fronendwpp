import Styles from "./Conversations.module.css"
import { IoSend } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import {useParams} from "react-router-dom"
import { useEffect,useState,useContext } from "react";
import { UserData } from "../../Types/UserData";
import { IContextUser } from "../../Types/IContextUser";
import {ContextApp} from "../../Context/ContextApp"
import {IMessageUser} from "../../Types/IMessageUser"


import Socket from "../../socket/socker"




const Conversations = () => {
  const { id } = useParams<{ id: string }>(); 
  const [user, setUser] = useState<UserData>(); 
  const [messages, setMessage] = useState<IMessageUser[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const context = useContext(ContextApp);
  const { Id } = context as IContextUser;
  
  // Converter id para número se necessário
  const numericId = id ? parseInt(id) : undefined;
  
  const roomName = [id, Id].sort().join("-_-");

  useEffect(() => {
    const request = async () => {
      const response = await fetch(`http://localhost:4000/one/${id}`);
      const data = await response.json();
      setUser(data);
    };
    request();

    Socket.emit("joinRoomUser", roomName);
    console.log(roomName)
    Socket.on("RoomMessage", (data) => {
      setMessage((prev) => [
        ...prev,
        {
          content: data.Message,
          idUser: Id,
          idrecipient: numericId || 0, // Garantindo que idrecipient nunca seja undefined
        },
      ]);
    });

    return () => {
      Socket.off("RoomMessage");
    };
  }, [id, roomName]);

  const handleMessage = async () => {
    try {
      Socket.emit("sendMessage", { RoomName: roomName, Message: inputMessage });
      setMessage((prev) => [
        ...prev,
        {
          content: inputMessage,
          idUser: Id,
          idrecipient: numericId || 0, // Garantindo que idrecipient nunca seja undefined
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={Styles.chatSection}>
      <header className={Styles.headerChat}>
        <img
          src={user?.ImageProfile || `https://labes.inf.ufes.br/wp-content/uploads/sem-foto.jpg`}
          alt="User Profile"
        />
        <h3>{user?.Name}</h3>
      </header>
      <div className={Styles.conteinerMessages}>
        {messages &&
          messages.map((message, index) => <span key={index}>{message.content}</span>)}
      </div>
      <div className={Styles.chatConteiners}>
        <FaFileUpload className={Styles.iconSend} />
        <input type="text" onChange={(e) => setInputMessage(e.target.value)} />
        <IoSend className={Styles.iconSend} onClick={handleMessage} />
      </div>
    </section>
  );
};

export default Conversations;
