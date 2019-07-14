import React, { memo, ReactNode } from 'react';
import moment from 'moment';

import { ReactComponent as Arrowhead } from '../../assets/icons/arrowhead.svg';
import { months } from '../../utils/calendar';
import './style.scss';


interface ContentProps {
    children: ReactNode,
    date: string,
    setDate: (value: string) => void,
};

const Content = ({ children, date, setDate }: ContentProps) => (
    <div className="calendar__page--content">
        <div className="info">
            <div className="date">{months[moment(date).get('month')]} de {moment(date).get('year')}</div>
            <div className="actions">
                <button type="button" onClick={() => setDate(moment(date).subtract(1, 'months').format('YYYY-MM-DD'))}>
                    <Arrowhead />
                </button>
                <button type="button">
                    Hoje
                </button>
                <button type="button" onClick={() => setDate(moment(date).add(1, 'months').format('YYYY-MM-DD'))}>
                    <Arrowhead />
                </button>
            </div>
        </div>
        {children}
    </div >
);

export default memo(Content);