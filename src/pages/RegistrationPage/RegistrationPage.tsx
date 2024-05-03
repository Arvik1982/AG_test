import { useEffect, useState } from 'react';
import InputComponent from '../../components/InputComponent/InputComponent';
import styles from './regPage.module.css';
import registrationApi from '../../api/registrationApi';
import { useDispatch, useSelector } from 'react-redux';
import { validMail } from '../../var/var';
import { useNavigate } from 'react-router-dom';
import { IRootStoreType, errorType } from '../../Types/Types';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localToken = localStorage.getItem('newUser') !== null ? JSON.parse(localStorage.getItem('newUser') || '') : '';

  const userMail = useSelector((state: IRootStoreType) => state.regRedux.email);
  const userPassword1 = useSelector((state: IRootStoreType) => state.regRedux.password1);
  const userPassword2 = useSelector((state: IRootStoreType) => state.regRedux.password2);
  const appError = useSelector((state: IRootStoreType) => state.appRedux.appError);

  const [inputOk, setInputOk] = useState<boolean>(!userMail ? true : validMail.test(userMail) ? true : false);

  const [regError, setRegError] = useState<errorType>({ message: '' });

  const inputHandleValidate = (elementType: string) => {
    elementType === 'mail' ? setInputOk(validMail.test(userMail)) : '';
  };

  const regHandleClick = () => {
    if (userPassword1 !== userPassword2) {
      !userPassword2 ? setRegError({ message: 'Подтвердите пароль' }) : '';
      
    } else {
      registrationApi(userMail, userPassword1, dispatch)
        .then(() => {
          navigate('/partners');
        })
        .catch((err): void => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setRegError({ message: '' });
  }, [userMail, userPassword1, userPassword2]);

  return (
    <div className={styles.content__block}>
      <div className={styles.content__block_header}>
        <h2 className={styles.block__header_text}>Регистрация</h2>
      </div>
      <div className={styles.content__block_inputs}>
        <InputComponent inputOk={inputOk} setInputOk={setInputOk} elementType={'name'} />
        <InputComponent inputOk={inputOk} setInputOk={setInputOk} elementType={'mail'} />
        <InputComponent inputOk={inputOk} setInputOk={setInputOk} elementType={'password1'} />
        <InputComponent inputOk={inputOk} setInputOk={setInputOk} elementType={'password2'} />
      </div>
      <button
        onClick={() => {
          inputHandleValidate('mail');
          regHandleClick();
        }}
        type="button"
        className={styles.content__block_button}
      >
        {localToken ? 'Войти' : 'Зарегистрироваться'}
      </button>
      {regError && (
        <span style={{ color: 'red', position: 'absolute', top: '79%', fontSize: '15px' }}>{regError.message}</span>
      )}
      {appError && <h1 style={{ fontSize: '16px', color: 'red', alignSelf: 'center' }}>{appError}</h1>}
    </div>
  );
}
