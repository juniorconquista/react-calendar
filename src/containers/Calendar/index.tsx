import React, { memo, useState } from 'react';
import moment from 'moment';

import Header from '../../components/Header';
import Content from '../../components/Content';
import handleFactory from './handleFactory';

import './style.scss';

const Calendar = () => {
    const [period, setPeriod] = useState<string>('yearly'); // monthly - yearly
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const Component = handleFactory(period);

    return (
        <div className="calendar__page">
            <Header period={period} setPeriod={setPeriod} />
            <Content period={period} date={date} setDate={setDate} >
                <Component date={date} />
            </Content>
        </div>
    );
};

export default memo(Calendar);
