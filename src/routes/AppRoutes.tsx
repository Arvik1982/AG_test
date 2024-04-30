import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import PartnersListPage from '../pages/PartnersListPage/PartnersListPage';
import PartnerCardPage from '../pages/PartnerCardPage/PartnerCardPage';
import { IRootStoreType, appPropsType } from '../Types/Types';
import { ProtectedRoute } from './Protected';
import { useSelector } from 'react-redux';
import ErrPage from '../pages/ErrorPage/ErrorPage';

export default function AppRoutes({ currentPage, setCurrentPage }: appPropsType) {
  const token = useSelector((state: IRootStoreType) => state.regRedux.regResponseUser.token);
  const localToken = localStorage.getItem('newUser') ? JSON.parse(localStorage.getItem('newUser') || '').token : '';

  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />}></Route>
      <Route path="*" element={<ErrPage />}></Route>
      <Route element={<ProtectedRoute isAllowed={Boolean(token ? token : localToken)} />}>
        <Route
          path="/partners"
          element={<PartnersListPage currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        ></Route>
        <Route
          path="/partner/:id"
          element={<PartnerCardPage currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        ></Route>
      </Route>
    </Routes>
  );
}
