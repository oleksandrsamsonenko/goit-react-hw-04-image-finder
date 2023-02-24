import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <InfinitySpin width="250" color="#3F51B5" />
    </div>
  );
};
