import { RotatingLines } from 'react-loader-spinner';

import css from './loader.module.css';

const Loader = ({ insideButton = false }) => {
  return (
    <div className={insideButton ? css.insideButton : css.wrapper}>
      <RotatingLines
        visible={true}
        height="48"
        width="48"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
