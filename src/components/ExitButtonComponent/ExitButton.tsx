import { useNavigate } from 'react-router-dom'
import styles from './exitButton.module.css'

export default function ExitButton(){
    const exitHandleClick=():void=>{
        localStorage.removeItem('newUser');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userAvatarId');
        ;navigate('/')}

   const navigate=useNavigate()
    return(
        <button onClick={()=>{exitHandleClick()}} className={styles.block__header_button}>Выход</button>
    )
}