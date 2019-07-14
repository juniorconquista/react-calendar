import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import { getDaysBetweenMonths, week } from '../../utils/calendar';

import './style.scss';

interface MonthlyProps {
    date: string,
};

const Monthly = ({ date }: MonthlyProps) => {
    const array = getDaysBetweenMonths(moment(date).get('month'), moment(date).get('year'))
    console.log(array)

    return (
        <div className="calendar__page--month">
            <div className="week">
                {week.map(w => <div className="day">{w.slice(0, 3)}</div>)}
            </div>
            <div className="month">
                {array.customDaysArray.map(day =>
                    <div className={classnames({ day: true, disabled: day.disabled })}>{day.formatedDate}</div>
                )}
            </div>
        </div>
    )
};

export default Monthly;