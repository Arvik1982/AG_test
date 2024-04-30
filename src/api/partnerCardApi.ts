import { Dispatch } from "react"
import { setAppErr } from "../store/slices/appSlice"
import { host } from "../var/var"
import { Action } from "@reduxjs/toolkit"


export default async function partnerCardApi(
  id:string|undefined, 
  dispatch:Dispatch<Action>
){  
  dispatch(setAppErr(''))
    try {
      const response = await fetch(`${host}users/${id}`, {
        method: 'GET',
      })
      if (!response.ok) {
        response.status===404?dispatch(setAppErr('404')):''
        const answerError = await response.json() 
        console.log(answerError)              
        throw new Error(answerError.error )
      }
      const currentUser = await response.json()
      
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