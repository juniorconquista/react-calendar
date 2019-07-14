import React, { memo, useState } from 'react';
import moment from 'moment';

import Header from '../../components/Header';
import Content from '../../components/Content';
import handleFactory from './handleFactory';

import './style.scss';

const Calendar = () => {
    const [period, setPeriod] = useState<string>('monthly'); // weekly - monthly - yearly
    const [date, setDate] = useState<string>(moment('2019-06-01').format('YYYY-MM-DD'));
    const Component = handleFactory(period);

    return (
        <div className="calendar__page">
            <Header period={period} setPeriod={setPeriod} />
            <Content date={date} setDate={setDate} >
                <Component date={date} />
            </Content>
        </div>
    );
};

export default memo(Calendar);
