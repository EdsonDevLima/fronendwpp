import Styles from "./Auth.module.css"
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import {ContextApp} from "../../Context/ContextApp"
import { useContext } from "react";
import { IContextUser } from "../../Types/IContextUser";

const Auth  = ()=>{
const [isLogin,setIsLogin] = useState<boolean>(false)
const usecontext = useContext<IContextUser | null>(ContextApp)

//data user
const [name,setName] = useState<string>("")
const [email,setEmail] = useState<string>("")
const [password,setPassword] = useState<string>("")
const [confirmPassword,setConfirmPass]  = useState<string>("")




const handleSubmit = async (e:React.FormEvent<HTMLElement>)=>{

    e.preventDefault()
    if(isLogin && usecontext){
      const {Login} = usecontext
      const dataRequest = await Login(email,password)
      console.log(dataRequest)
      
    }else if(!isLogin && usecontext){
      const {Register} = usecontext
      const dataRequest = await Register(name,email,password,confirmPassword)
      console.log(dataRequest)

    }








}






return (
    <section className={Styles.sectionLogin}>
      <header>
        <div>
          <FaWhatsapp  className={Styles.iconwpp}/>
          <h2>WhatNode web</h2>
        </div>
      </header>
      <div className={Styles.conteinerFormMedia}>
      <form className={Styles.formLogin} onSubmit={handleSubmit}>
          <h1>{!isLogin ? "Registrar-se": "Login"}</h1>
          <p>{!isLogin ? "Registre-se": "faça o login"} para ter acesso a suas conversas</p>

          <label>Email:
            <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
          </label>
          {!isLogin &&
              <>
          <label>Nome:
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
          </label>          
            <label>Confirmaçao de senha:
              <input type="text" onChange={(e)=>setConfirmPass(e.target.value)}/>
            </label></>

            
          }
          <label>Senha:
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
          </label>
            <input type="submit" value={!isLogin ? "Registrar-se": "Fazer login"}/>
          
          
      </form>  
      <button className={Styles.buttonT} onClick={(  )=>isLogin ? setIsLogin(false) : setIsLogin(true)}>{!isLogin ? "Ainda nao me cadastrei": "ja possuo login"}</button>
      {isLogin && <div className={Styles.skipLogin}>
        <h1>Pular Login</h1>
        <p> Email:User22</p>
        <p> Senha:Convite1</p>
        </div>}</div>
    </section>


  )



}






export default Auth