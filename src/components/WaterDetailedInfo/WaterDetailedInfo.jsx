import DailyInfo from './DailyInfo/DailyInfo.jsx/';
import MonthInfo from './MonthInfo/MonthInfo.jsx';
import UserPanel from './UserPanel/UserPanel.jsx/';
import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <div className={css.container}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
