import Styles from "./Home.module.css"
import ContactsList from "../../Components/ContactsList"
import { Outlet } from "react-router-dom"
import { ContextApp } from "../../Context/ContextApp"
import { useContext,useEffect } from "react"
import { IContextUser } from "../../Types/IContextUser"



const Home = ()=>{
const ContextAppp = useContext(ContextApp)



useEffect(()=>{
const {authentication} = ContextAppp as IContextUser
const VerifyInitial = async ()=>{
 await authentication()
}
VerifyInitial()
 

},[])






  return (
    <section className={Styles.sectionHome}>
        <ContactsList/>
        <Outlet/>
    </section>
  )


}

export default Home