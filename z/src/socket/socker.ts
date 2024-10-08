import {io,Socket}from "socket.io-client"


//eventos do servidor
interface ServerToClientEvents{
  RoomMessage:(message:{Message:string})=>void
}
//eventos do client
interface ClientToServerEvents{
  joinRoomUser:(Room:string)=>void
  sendMessage:(data:{RoomName:string,Message:string})=>void

}


const Io:Socket<ServerToClientEvents,ClientToServerEvents> = io("http://localhost:4000")


export default Io