import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';
import css from './ChartComponent.module.css';
import { useMediaQuery } from '@mui/material';
import sprite from '../../assets/pictures/HomePage/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthlyWaterItems } from 'src/redux/water/selectors';
import { useEffect } from 'react';
import { fetchMonthlyWater } from 'src/redux/water/operations';
import { format } from 'date-fns';

const CustomTooltip = ({ active = false, payload = [], coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      <svg
        className={css.tooltipIcon}
        width="80"
        height="48"
        style={{ left: x, top: y }}
      >
        <use href={`${sprite}#icon-Combined-Shape`}></use>
        <text className={css.label}>{`${payload[0].value} ml`}</text>
      </svg>
    );
  }
  return null;
};

const ChartComponent = () => {
  const dispatch = useDispatch();
  const monthlyWaterItems = useSelector(selectMonthlyWaterItems);

  useEffect(() => {
    dispatch(fetchMonthlyWater());
  }, [dispatch]);

  const chartData = [];

  if (monthlyWaterItems && Array.isArray(monthlyWaterItems)) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    console.log(sevenDaysAgo);

    const dataMap = monthlyWaterItems.reduce((acc, item) => {
      const itemDate = new Date(item.date);
      const day = format(itemDate, 'd');

      if (itemDate >= sevenDaysAgo) {
        acc[day] = (acc[day] || 0) + item.volume;
      }

      return acc;
    }, {});

    for (const [date, volume] of Object.entries(dataMap)) {
      chartData.push({ date, volume });
    }
  }
  console.log(chartData);
  console.log(monthlyWaterItems);

  const formatYAxis = tickItem => {
    if (tickItem === 0) {
      return '0%';
    }
    const yTicks = tickItem / 1000;
    return `${yTicks} L`;
  };

  const isSmallScreen = useMediaQuery('(max-width:767px)');
  const isTabletScreen = useMediaQuery(
    '(min-width:768px) and (max-width:1439px)',
  );

  const yAxisPadding = isSmallScreen ? 5 : isTabletScreen ? 14 : 14;

  const tickStyle = {
    fontWeight: 400,
    lineHeight: isSmallScreen ? '129%' : '149%',
  };

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 256 : 273}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient
              id="colorValue"
              x1="189.618"
              y1="207"
              x2="193.11"
              y2="7.79258"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9be1a0" stopOpacity={0} />
              <stop offset="1" stopColor="#9be1a0" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#323f47',
              fontSize: 15,
              ...tickStyle,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            // ticks={yTicks}
            tick={{
              fill: '#323f47',
              fontSize: isSmallScreen ? 14 : 15,
              ...tickStyle,
            }}
            padding={{ bottom: yAxisPadding }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            dataKey="volume"
            stroke="#87d28d"
            strokeWidth={isSmallScreen ? 2 : 3}
            fill="url(#colorValue)"
            dot={{
              r: isSmallScreen ? 6 : 9,
              stroke: '#87d28d',
              fill: '#ffffff',
              fillOpacity: 1,
              strokeWidth: isSmallScreen ? 2 : 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
