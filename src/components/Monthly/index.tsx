import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { animated, useSpring } from 'react-spring';


import { ReactComponent as Arrowhead } from '../../assets/icons/arrowhead.svg';
import { getDaysBetweenMonths, week, months } from '../../utils/calendar';
import './style.scss';

interface MonthlyProps {
    initialDate: string,
    holidays: [],
    handleDate: (value: string) => void,
};

const Monthly = ({ initialDate, holidays, handleDate }: MonthlyProps) => {
    const [arrayMonth, setoObjectMonth] = useState<any>([]);
    const [month, setMonth] = useState<number>(moment(initialDate).get('month'));
    const handleMonth = (date: string) => {
        setMonth(moment(date).get('month'));
        handleDate(date);
    };

    useEffect(() => {
        const objectMonth = getDaysBetweenMonths(moment(initialDate).get('month'), moment(initialDate).get('year'), holidays);
        setoObjectMonth(objectMonth.customDaysArray)
    }, [month, holidays, initialDate]);

    const props = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(0,150px,0)',
        },
        to: {
            opacity: 1,
            transform: 'translate3d(0,0,0))',
        },
    });

    return (
        <animated.div className="calendar__page--content" style={props}>
            <div className="info">
                <div className="date">
                    {months[moment(initialDate).get('month')]} de {moment(initialDate).get(
                        'year',
                    )}
                </div>
                <div className="actions">
                    <button
                        type="button"
                        onClick={() => handleMonth(moment(initialDate).subtract(1, 'months').format('YYYY-MM-DD'))}>
                        <Arrowhead />
                    </button>
                    <button type="button" onClick={() => handleMonth(moment().format('YYYY-MM-DD'))}>
                        Hoje
                </button>
                    <button
                        type="button"
                        onClick={() => handleMonth(moment(initialDate).add(1, 'months').format('YYYY-MM-DD'))}>
                        <Arrowhead />
                    </button>
                </div>
            </div>
            <div className="calendar__page--month">
                <div className="week">
                    {week.map(w => <div className="day" key={w}>{w.slice(0, 3)}</div>)}
                </div>
                <div className="month">
                    {arrayMonth.map((
                        day: {
                            disabled: any; formatedDate: string; weekDay: number, holiday: { name: string, type: string }
                        },
                        index: number) =>
                        <div key={`${day.formatedDate}-${index}`} className={classnames({ day: true, disabled: day.disabled, })}>
                            <div className="content">
                                <div className="date">
                                    <p>{week[day.weekDay === 7 ? 0 : day.weekDay].slice(0, 3)}</p>
                                    <p> {day.formatedDate}</p>
                                </div>
                                {day.holiday && (
                                    <div className={classnames({ holiday: true, [day.holiday.type]: true })}>
                                        {day.holiday.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </animated.div>
    )
};

export default Monthly;