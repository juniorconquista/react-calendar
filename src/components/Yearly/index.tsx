import React, { memo } from 'react';
import moment from 'moment';
import classnames from 'classnames';

import { week, getMonthsBetweenYear } from '../../utils/calendar';
import './style.scss';

interface YearlyProps {
    date: string,
};

const Yearly = ({ date }: YearlyProps) => {
    const months = getMonthsBetweenYear(moment(date).get('year'));
    return (
        <div className="calendar__page--yearly">
            <div className="months">
                {Object.keys(months).map(month => (
                    <div className="month">
                        <div className="name">
                            {month}
                        </div>
                        <div className="content">
                            <div className="week">
                                {week.map((w: string) => <div className="day">{w.slice(0, 1)}</div>)}
                            </div>
                            <div className="days">
                                {months[month].map((day: { formatedDate: string; disabled: boolean; }) =>
                                    <div className={classnames({ day: true, disabled: day.disabled })}>{day.formatedDate}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(Yearly);