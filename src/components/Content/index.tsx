import React, { memo, ReactNode } from 'react';
import moment from 'moment';

import { ReactComponent as Arrowhead } from '../../assets/icons/arrowhead.svg';
import { getLabel } from '../../utils/calendar';
import './style.scss';


interface ContentProps {
    period: string
    children: ReactNode,
    date: string,
    setDate: (value: string) => void,
};

const Content = ({ children, date, setDate, period }: ContentProps) => (
    <div className="calendar__page--content">
        <div className="info">
            <div className="date">
                {getLabel(period, date)}
            </div>
            <div className="actions">
                <button type="button"
                    onClick={() => setDate(moment(date).subtract(1, period === 'monthly' ? 'months' : 'year').format('YYYY-MM-DD'))}>
                    <Arrowhead />
                </button>
                <button type="button" onClick={() => setDate(moment().format('YYYY-MM-DD'))}>
                    Hoje
                </button>
                <button type="button"
                    onClick={() => setDate(moment(date).add(1, period === 'monthly' ? 'months' : 'year').format('YYYY-MM-DD'))}>
                    <Arrowhead />
                </button>
            </div>
        </div>
        {children}
    </div >
);

export default memo(Content);