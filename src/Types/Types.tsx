import { Dispatch } from 'react';
import store from '../store/indexStore';

export type partnerDataType = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};
export type partnerType = {
  data: partnerDataType;
};
export type appPropsType = {
  currentPage: string;
  setCurrentPage?: Dispatch<React.SetStateAction<string>>;
  partner?: partnerType;
};

export type listPartnersType = {
  data: [];
  page: number;
  per_page: number;
  support: {};
  total: number;
  total_pages: number;
};

export type errorType = {
  message: string;
};

export type catchErrorType = {
  error: string;
};

export type regResponse = {
  token: string;
  id: number;
};

export type IRootStoreType = ReturnType<typeof store.getState>;
