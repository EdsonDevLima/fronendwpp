import { createContext } from "react"
import { IContextUser } from "../Types/IContextUser"
import { useState } from "react"
import { useNavigate } from "react-router-dom"






export const ContextApp = createContext<IContextUser | null>(null)





 const ContextProvider = ({children}:{children:React.ReactNode})=>{
const navigate = useNavigate()
const [Name,setName] = useState<string>("")
const [Email,setEmail] = useState<string>("")
const [Id,setId] = useState<number>(0)
const [Authenticate,setAuthenticate] = useState<boolean>(false)  

const Login =async (email:string,password:string)=>{
  try{
  const request = await fetch("http://localhost:4000/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})})
  const response = await request.json()
   localStorage.setItem("token",JSON.stringify(response.token)) 
   navigate("/") 
  }catch(err){
      console.log(err)
      navigate("/auth")
  }

   

}


const Logout = async()=>{
  localStorage.removeItem("token")
  navigate("/auth")

}


const Register = async(name:string,email:string,password:string,confirmPassword:string)=>{

  try{
  const request = await fetch("http://localhost:4000/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password,name,confirmPassword})})
  const response = await request.json()
   localStorage.setItem("token",JSON.stringify(response.token))  
   navigate("/")  
  }catch(err){
      console.log(err)
      navigate("/auth")
      
  }

}

const authentication =async (route?:string)=>{
  try{
    const tokenB = localStorage.getItem("token")
    const token = JSON.parse(tokenB || "")
    console.log(token,tokenB)
    const request = await fetch("http://localhost:4000/auth/authenticate",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:token})})
    const response = await request.json()
    setId(response.id)
    setEmail(response.email)
    setName(response.name)
    setAuthenticate(true)
    if(route){
      navigate(`/${route}`)
    }else{
      navigate("")
    }
    

  }
  catch(err){
      console.log(err)
      navigate("/auth")
  }
}

return (
    <ContextApp.Provider value={{Authenticate,Id,Email,Name,Login,Logout,Register,setEmail,setAuthenticate,setId,setName,authentication}}>
      {children}
    </ContextApp.Provider>
  )
}

export default ContextProvider