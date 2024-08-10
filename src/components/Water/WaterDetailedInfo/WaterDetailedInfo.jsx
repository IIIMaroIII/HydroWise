import UserPanel from 'src/components/Users/UserPanel/UserPanel.jsx';
import css from './WaterDetailedInfo.module.css';
import MonthInfo from './MonthInfo/MonthInfo.jsx';
import DailyInfo from './DailyInfo/DailyInfo.jsx';
import Container from 'src/components/REUSABLE/Container/Container.jsx';

const WaterDetailedInfo = () => {
  return (
    <Container className={css.waterDetailedInfoContainer}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </Container>
  );
};

export default WaterDetailedInfo;
