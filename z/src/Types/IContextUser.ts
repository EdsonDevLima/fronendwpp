export interface IContextUser{
  Authenticate:boolean,
  Id:number,
  Email:string,
  Name:string,
  Login:(email:string,password:string)=>Promise<void>,
  Logout:()=>Promise<void>
  Register:(name:string,email:string,password:string,confirmPassword:string)=>Promise<void>,
  setEmail:(Email:string)=>void,
  setAuthenticate:(Authenticate:boolean)=>void,
  setId:(Id:number)=>void,
  setName:(Name:string)=>void
  authentication:(route?:string)=>Promise<void>
}