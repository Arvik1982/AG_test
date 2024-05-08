import styles from './listPage.module.css';
import noProfile from '../../img/no-profile.png';
import like from '../../img/Like.png';
// import noLike from'../../img/noLike.png'
import more from '../../img/Vector.png';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { appPropsType, listPartnersType, partnerDataType } from '../../Types/Types';
import { useEffect, useState } from 'react';
import listPartnersApi from '../../api/listPartnersApi';
import { useNavigate } from 'react-router-dom';

export default function PartnersListPage({ currentPage, setCurrentPage }: appPropsType) {
  const navigate = useNavigate();
  const localAvatar = localStorage.getItem('userAvatar');
  let changedAvatar: string;
  if (localAvatar !== null) {
    changedAvatar = localAvatar;
  }
  const localAvatarId = localStorage.getItem('userAvatarId');
  let changedAvatarId: string;
  if (localAvatarId !== null) {
    changedAvatarId = localAvatarId;
  }

  const [listPartners, setListPartners] = useState<listPartnersType>({
    data: [],
    page: 0,
    per_page: 0,
    support: {},
    total: 0,
    total_pages: 1,
  });
  const [perPage, setPerPage] = useState<number>(listPartners.per_page);
  const [page, setPage] = useState<number>(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    listPartnersApi(page, perPage)
      .then((data): void => {
        setListPartners(data);
        setPage(data.page);
        setPerPage(data.per_page);
      })
      .catch((err): void => {
        console.log(err);
      });
    setCurrentPage ? setCurrentPage('list') : '';
    setMessage('');
  }, [perPage, page]);

  const handleClickMore = () => {
    const allPartnersNumber = listPartners.total;
    const partnersPerPage = listPartners.per_page;
    const pagesTotal = Math.ceil(allPartnersNumber / partnersPerPage);
    if (page !== pagesTotal) {
      perPage < listPartners.total ? setPerPage(perPage + 3) : '';
    } else {
      setMessage('Показаны все');
    }
  };
  const handlePaginateNext = () => {
    const allPartnersNumber = listPartners.total;
    const partnersPerPage = listPartners.per_page;
    const pagesTotal = Math.ceil(allPartnersNumber / partnersPerPage);
    page < pagesTotal ? setPage(page + 1) : '';
  };

  const handlePaginatePrev = () => {
    page > 1 ? setPage(page - 1) : '';
  };

  return (
    <div className={styles.content__block}>
      <HeaderComponent currentPage={currentPage} />
      <div className={styles.content__block_partners}>
        <div className={styles.block__partners_grid}>
          {listPartners?.data.map((el: partnerDataType) => {
            return (
              <div
                key={el.id}
                className={styles.partners__grid_el}
                onClick={() => {
                  navigate(`/partner/${el.id}`);
                }}
              >
                <img
                  className={styles.grid__el_img_mob}
                  src={changedAvatarId === String(el.id) ? changedAvatar : el.avatar ? el.avatar : noProfile}
                  alt="avatar"
                />
                <img
                  className={styles.grid__el_img}
                  src={changedAvatarId === String(el.id) ? changedAvatar : el.avatar ? el.avatar : noProfile}
                  alt="avatar"
                />
                <h2 className={styles.grid__el_text}>{`${el.first_name} ${el.last_name}`}</h2>
                <div className={styles.grid__el_like}>
                  <img src={like} alt="like" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.content__block_footer}>
        <div className={styles.pagination}>
          <div
            onClick={handlePaginatePrev}
            className={styles.pagination__turn}
          >
            {'<<'}
          </div>
          <div className={styles.pagination_buttons}>--{page}--</div>
          <div
            onClick={handlePaginateNext}
            className={styles.pagination__turn}
          >
            {'>>'}
          </div>
        </div>
        {message && <span style={{ color: 'green' }}>{message}</span>}
        <div className={styles.footer__button_block}>
          <button
            onClick={handleClickMore}
            className={styles.block__footer_button}
          >
            Показать еще
          </button>
          <img className={styles.block__footer_img} src={more} alt="more" />
        </div>
      </div>
    </div>
  );
}
