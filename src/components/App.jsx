import { ImageFinder } from './ImageFinder/ImageFinder';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.parent}>
      <ImageFinder />
    </div>
  );
};
