import { Action, Dispatch } from "@reduxjs/toolkit"
import { setAppErr } from "../store/slices/appSlice"
import { host } from "../var/var"


export default async function updateAvatar(avatar:string, id:number, dispatch:Dispatch<Action>){
   
    try {
        const response = await fetch(`${host}users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                avatar: `${avatar}`,
          
            }),
            headers: { 'content-type': 'application/json' },
          })
          
        if (!response.ok) {
          response.status===404?dispatch(setAppErr('404')):''
          const answerError = await response.json() 
          console.log(answerError)              
          throw new Error(answerError.error )
        }
        const currentUser = await response.json()
        console.log(currentUser)
        // localStorage.setItem('userAvatar',currentUser.avatar)
        return currentUser
  
      } 
      catch (error) {    
        if (error instanceof Error) {
          throw new Error(error.message)
        }    
        else{
          console.log(error)
          throw new Error('unknown error')
        }               
      }
}