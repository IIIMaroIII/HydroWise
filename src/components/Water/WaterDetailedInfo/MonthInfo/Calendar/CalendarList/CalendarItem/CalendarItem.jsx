import { useDispatch } from 'react-redux';
import Button from '../../../../../../REUSABLE/Button/Button';
import css from './calendarItem.module.css';

import useChosenDate from 'src/hooks/useChosenDate.js';
import { fetchDailyWater } from 'src/redux/water/operations.js';
import clsx from 'clsx';

export const CalendarItem = ({ day, activeDay, setActiveDay, percentage }) => {
  const dispatch = useDispatch();
  const { setChosenDay } = useChosenDate();

  return (
    <>
      <li className={css.item} id={day}>
        <Button
          id={day}
          addClass={clsx(css.btn, { [css.active]: activeDay === day })}
          onClick={() => {
            setActiveDay(day);
            setChosenDay(day);
            dispatch(fetchDailyWater());
          }}
        >
          {day}
        </Button>
        <p className={css.text}>{`${percentage}%`}</p>
      </li>
    </>
  );
};

export default CalendarItem;
