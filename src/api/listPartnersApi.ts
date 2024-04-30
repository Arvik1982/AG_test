import { host } from "../var/var"


export default async function listPartnersApi(page:number,perPage:number){  
       
        try {
          const response = await fetch(`${host}users?page=${page}&per_page=${perPage}`, {
            method: 'GET',
          })
            if (!response.ok) {
            const answerError = await response.json() 
            console.log(answerError)              
            throw new Error(answerError.error)
          }
          const listUsers = await response.json()
       
          return listUsers

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