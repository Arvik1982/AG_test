import { useEffect, useState } from 'react';
import { IRootStoreType, appPropsType, partnerType } from '../../Types/Types';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import styles from './cardPage.module.css';
import phone from '../../img/phone.svg';
import envelope from '../../img/envelope.svg';
import partnerCardApi from '../../api/partnerCardApi';
import { useDispatch, useSelector } from 'react-redux';
import { userText } from '../../var/var';
import { useParams } from 'react-router-dom';

export default function PartnerCardPage({ currentPage, setCurrentPage }: appPropsType) {
  const [partner, setPartner] = useState<partnerType>({
    data: { avatar: '', email: '', first_name: '', id: 0, last_name: '' },
  });
  const dispatch = useDispatch();
  const userNotFound = useSelector((state: IRootStoreType) => state.appRedux.appError);
  const param = useParams();

  useEffect(() => {
    partnerCardApi(param.id, dispatch)
      .then((data: partnerType): void => {
        setPartner(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setCurrentPage ? setCurrentPage('partner') : '';
  }, []);

  return (
    <div className={styles.content__block}>
      <HeaderComponent partner={partner} currentPage={currentPage} />
      {userNotFound && <h2 style={{ color: 'red' }}>Ошибка 404: пользователь не найден </h2>}
      <div className={styles.content__block_info}>
        <div className={styles.block__info_description}>{userText}</div>
        <div className={styles.block__info_contacts}>
          <div className={styles.info__contacts_phone}>
            <img src={phone} alt="phone" />
            <span>+7(123)234-56-78</span>
          </div>
          <div className={styles.info__contacts_mail}>
            <img style={{ width: '24px', height: '24px' }} src={envelope} alt="mail" />
            <span>{partner.data ? partner.data.email : 'email@mail.com'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
