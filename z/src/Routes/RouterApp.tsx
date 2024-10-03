import { BrowserRouter,Routes,Route } from "react-router-dom"
import Conversations from "../Pages/conversations/Conversations"
import Auth from "../Pages/Auth/Auth"
import Home from "../Pages/Home/Home"
import ContextProvider from "../Context/ContextApp"
const RouterApp = ()=>{

  return(
    
    <BrowserRouter><ContextProvider>
      <Routes>
        
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/" element={<Home/>}>
            <Route path="user/:id" element={<Conversations/>}/>
        </Route>
        
      </Routes></ContextProvider> 
    </BrowserRouter>
   
  )
}


export default  RouterApp