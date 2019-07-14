import React, { memo } from 'react';
import classnames from 'classnames';

import './style.scss';

interface HeaderProps {
    period: string,
    setPeriod: (value: string) => void
};

const Header = ({ period, setPeriod }: HeaderProps) => (
    <div className="calendar__page--header">
        <button
            className={classnames({ active: period === 'weekly' })}
            onClick={() => setPeriod('weekly')}
            type="button">
            Semana
        </button>
        <button
            className={classnames({ active: period === 'monthly' })}
            onClick={() => setPeriod('monthly')}
            type="button">
            Mês
        </button>   
        <button
            className={classnames({ active: period === 'yearly' })}
            onClick={() => setPeriod('yearly')}
            type="button">
            Ano
        </button>
    </div>
);

export default memo(Header);