import { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './InputComponent.module.css'
import hidePassImg from'../../img/Eye Off.svg'
import showPassImg from'../../img/eyeOn.svg'
import { setUserMail, setUserPass1, setUserPass2 } from '../../store/slices/regSlice'
import { setAppErr } from '../../store/slices/appSlice'
import { IRootStoreType } from '../../Types/Types'

type inputPropsType={
    elementType:string 
    inputOk:boolean
    setInputOk:Dispatch<React.SetStateAction<boolean>>
}

export default function InputComponent({elementType, inputOk,setInputOk}:inputPropsType){
    
    const dispatch=useDispatch()
   
    const [inputType, setInputType]=useState('')
    const [inputName, setInputName]=useState('')

    const userMail = useSelector((state:IRootStoreType)=>state.regRedux.email)
    const userPass1 = useSelector((state:IRootStoreType)=>state.regRedux.password1)
    const userPass2 = useSelector((state:IRootStoreType)=>state.regRedux.password2)

    const [passwordHide, setPasswordHide ]=useState(true)

    const inputValue = elementType ==='name'?inputName:
    elementType === 'mail'?userMail:
    elementType === 'password1'?userPass1:userPass2
               
    
    const errorMail = !inputOk&&elementType==='mail'
    const errorPass = (userPass1!==userPass2)&&((elementType === 'password1')||(elementType === 'password2'))&&userPass2!==''
    const passwordInput= elementType === 'password1'||elementType === 'password2'
    const mailInput = elementType==='mail'
    const passwordHidden = passwordHide?'password':'text'
    

    const placeHolder = elementType ==='name'?'Артур':
    elementType === 'mail'?'example@mail.ru':
    elementType === 'password1'?'******':'******'

    const defineInputType=():void=>{
        elementType ==='name'?
        setInputType('Имя'):elementType==='mail'?
        setInputType('Электронная почта'):elementType==='password1'?
        setInputType('Пароль'):setInputType('Подтвердите пароль')
    }

    const inputHandleChange=(e:ChangeEvent<HTMLInputElement>):void=>{

        elementType === 'mail'?setInputOk(true):''

        elementType ==='name'?
        setInputName(e.target.value):elementType === 'mail'?        
        dispatch(setUserMail(e.target.value.toLowerCase())):elementType === 'password1'?
        dispatch(setUserPass1(e.target.value)):dispatch(setUserPass2(e.target.value))
        dispatch(setAppErr(''))
    }

    const passwordHandleShow = ():void=>{
        passwordHide?setPasswordHide(false):setPasswordHide(true)
    }

    useEffect(()=>{
        defineInputType()        
},[])
    return (    
    <div className={styles.block__input}>
        <span className={styles.block__inputs_label}>{inputType}</span>
        <input
            placeholder={placeHolder} 
            value={inputValue}  
            onChange={(e)=> inputHandleChange(e)} 
            type={mailInput?'mail':passwordInput?passwordHidden:'text'}
            className={errorMail?`${styles.input__element_error}`:`${styles.input__element}`}>
        </input>
        {errorMail&&<span className={styles.inputs__label_error}>Ошибка</span>}
        {errorPass&&<span className={styles.inputs__label_error}>Пароли не совпадают</span>}     
        {passwordInput&&<div onClick={()=>{passwordHandleShow()}} className={styles.inputs__label_hide}>
        <img src={passwordHide?hidePassImg:showPassImg} alt="hide" /></div>}
    </div> 
)
}