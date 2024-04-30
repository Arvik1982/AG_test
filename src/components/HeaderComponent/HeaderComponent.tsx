import { appPropsType, partnerDataType } from '../../Types/Types';
import ExitButton from '../ExitButtonComponent/ExitButton';
import styles from './header.module.css';
import noProfile from '../../img/no-profile.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exitMob from '../../img/exit_mob.svg';
import backMob from '../../img/back_mob.svg';
import updateAvatar from '../../api/updateAvatar';
import { useDispatch } from 'react-redux';


export default function HeaderComponent({ currentPage, partner }: appPropsType) {
  const [partnerData, setPartnerData] = useState<partnerDataType>({
    avatar: '',
    email: '',
    first_name: '',
    id: 0,
    last_name: '',
  });
  const h1Text = 'Наша команда';
  const h2Text =
    'Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.';
  const listPage = currentPage === 'list';
  const partnerPage = currentPage === 'partner';
  const partnerNameString = `${partnerData ? partnerData.first_name : ''} ${partnerData ? partnerData.last_name : ''}`;
  const partnerAvatar = partnerData ? partnerData.avatar : noProfile;
  const userIdAvatar = Number(localStorage.getItem('userAvatarId'));

  const [avatarSrc, setAvatarSrc] = useState('');

  const localAvatar = partnerData?.id === userIdAvatar ? localStorage.getItem('userAvatar') : '';

  const exitHandleClickMob = (): void => {
    localStorage.removeItem('newUser');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userAvatarId');
    navigate('/');
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const realUpload = useRef<HTMLInputElement | null>(null);

  const realUploadHandler = (): void => {
    if (realUpload.current !== null) realUpload.current.click();
  };

  const backHandleClick = (): void => {
    partnerPage ? navigate('/partners') : listPage ? navigate('/') : '';
  };

  const inputAvatarHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    localStorage.removeItem('userAvatar');
    if (e.target.files !== null) {
      e.target.files[0] ? setAvatarSrc(URL.createObjectURL(e.target.files[0])) : '';
      localStorage.setItem('userAvatar', URL.createObjectURL(e.target.files[0]));
      localStorage.setItem('userAvatarId', String(partnerData?.id));
      partner ? updateAvatar(URL.createObjectURL(e.target.files[0]), partner.data.id, dispatch) : '';
    }
  };
  useEffect(() => {
    if (partner) {
      partnerPage ? setPartnerData(partner?.data) : '';
    }
  }, [partner, localAvatar]);

  return (
    <div className={styles.content__block_header}>
      <button
        onClick={() => {
          backHandleClick();
        }}
        className={styles.block__header_button}
      >
        Назад
      </button>
      {/* Если карточка партнера  */}
      {partnerPage && (
        <div className={styles.block__header_info}>
          <input
            onChange={(e) => {
              inputAvatarHandleChange(e);
            }}
            style={{ display: 'none' }}
            ref={realUpload}
            type="file"
          />
          <img className={styles.header__info_img_mob} src={localAvatar ? localAvatar : partnerAvatar}></img>
          <img
            onClick={() => {
              realUploadHandler();
            }}
            className={styles.header__info_img}
            src={avatarSrc ? avatarSrc : localAvatar ? localAvatar : partnerAvatar}
            alt="profile"
          />
          <div className={styles.header__info_text}>
            <h1 className={styles.header__text_name}>{partnerNameString}</h1>
            <span className={styles.header__text_partner}>{'Партнер'}</span>
          </div>
          <div
            onClick={() => {
              backHandleClick();
            }}
            className={styles.header__back_mob}
          >
            <img src={backMob} alt="back" />
          </div>
        </div>
      )}
      {/* Если список партнеров   */}
      {listPage && (
        <div className={styles.block__header_text}>
          <h1 className={styles.header__text1}>{h1Text}</h1>
          <h2 className={styles.header__text2}>{h2Text}</h2>
        </div>
      )}
      <div
        onClick={() => {
          exitHandleClickMob();
        }}
        className={styles.header__exit_mob}
      >
        <img src={exitMob} alt="exit" />
      </div>
      <ExitButton />
    </div>
  );
}
