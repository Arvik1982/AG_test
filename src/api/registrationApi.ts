import { Action, Dispatch } from "@reduxjs/toolkit"
import { setAppErr } from "../store/slices/appSlice"
import { setRegResponseUser } from "../store/slices/regSlice"
import { host, validMail } from "../var/var"




export default async function registrationApi(email:string, password:string,dispatch:Dispatch<Action>):Promise<void>{
  
  if(validMail.test(email)&&password){
   
        try {
          
          const response = await fetch(`${host}register`, {
            method: 'POST',
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
              
            }),
            headers: { 'content-type': 'application/json' },
          })
          if (!response.ok) {
            const answerError = await response.json() 
                       
            throw new Error(answerError.error)
          }
          const newUser = await response.json()          
          
          dispatch(setRegResponseUser({token:newUser.token, id:newUser.id}))
          localStorage.setItem('newUser', JSON.stringify({token:newUser.token, id:newUser.id}))
          
          return newUser

        } 
        catch (error) {

          if (error instanceof Error) {
            dispatch(setAppErr(error.message))
            throw new Error(error.message)
          }    
          else{
            console.log(error)
            throw new Error('unknown error')
          }          
        }
      


} else{dispatch(setAppErr('Введите логин и пароль'))}

}