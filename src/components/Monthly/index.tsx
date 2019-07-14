import React from 'react';
import moment from 'moment';

import { getDaysBetweenMonths, week } from '../../utils/calendar';

import './style.scss';

interface MonthlyProps {
    date: string,
};

const Monthly = ({ date }: MonthlyProps) => {
    const array = getDaysBetweenMonths(moment(date).get('month'), moment(date).get('year'))
    console.log(moment('2019-07-15').isoWeekday())

    return (
        <div className="calendar__page--month">
            <div className="week">
                {week.map(w => <div className="day">{w.slice(0, 3)}</div>)}
            </div>
            <div className="month">
                {array.customDaysArray.map(day =>
                    <div className="day">{day}</div>
                )}
            </div>
        </div>
    )
};

export default Monthly;