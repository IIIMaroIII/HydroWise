import { useDispatch, useSelector } from 'react-redux';
import css from './deleteWaterModal.module.css';
import { changeDeleteWaterModalOpen, changeModal } from 'src/redux/water/slice';
import Button from 'src/components/REUSABLE/Button/Button.jsx';
import toast from 'react-hot-toast';
import { deleteWater } from 'src/redux/water/operations.js';
import { selectChosenWaterCardId } from 'src/redux/water/selectors.js';

const DeleteWaterModal = ({ children, ...otherProps }) => {
  const chosenWaterCardId = useSelector(selectChosenWaterCardId);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteWater())
      .unwrap()
      .then(() => {
        toast.success('Delete successful!');
        dispatch(changeDeleteWaterModalOpen(false));
        dispatch(changeModal(false));
      })
      .catch(() => toast.error('Oops, delete went wrong, please try again!'));
  };
  return (
    <div className={css.deleteModal}>
      <h2 className={css.title}>Delete</h2>
      <p className={css.text}>Do you really delete?</p>
      <div className={css.btnWrap}>
        <Button addClass={css.btn} onClick={handleSubmit} {...otherProps}>
          {children || 'Delete'}
        </Button>
        <Button
          addClass={css.cancelBtn}
          onClick={() => {
            dispatch(changeDeleteWaterModalOpen(false));
            dispatch(changeModal(false));
          }}
        >
          {children || 'Cancel'}
        </Button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
