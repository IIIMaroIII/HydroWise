import css from './chooseDate.module.css';
import useChosenDate from 'src/hooks/useChosenDate.js';

const ChooseDate = () => {
  const { checkIfToday } = useChosenDate();
  return <div className={css.day}>{checkIfToday()}</div>;
};

export default ChooseDate;
