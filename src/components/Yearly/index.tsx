import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Tippy from '@tippy.js/react';
import { animated, useSpring } from 'react-spring';


import { ReactComponent as Arrowhead } from '../../assets/icons/arrowhead.svg';
import { week, getMonthsBetweenYear } from '../../utils/calendar';
import './style.scss';

Tippy.defaultProps = {
    animation: 'fade',
    arrow: true,
    delay: 150,
    theme: 'light',
};

interface YearlyProps {
    initialDate: string,
    year: number,
    holidays: [],
    handleDate: (value: string) => void,
    setPeriod: (value: string) => void
};

const Yearly = ({ initialDate, handleDate, year, holidays, setPeriod }: YearlyProps) => {
    const [months, setMonths] = useState<any>({});

    useEffect(() => {
        const objectMonths = getMonthsBetweenYear(moment(initialDate).get('year'), holidays);
        setMonths(objectMonths)
    }, [year, initialDate, holidays]);


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
                    {moment(initialDate).get('year')}
                </div>
                <div className="actions">
                    <button
                        type="button"
                        onClick={() => handleDate(moment(initialDate).subtract(1, 'year').format('YYYY-MM-DD'))} >
                        <Arrowhead />
                    </button>
                    <button type="button" onClick={() => handleDate(moment().format('YYYY-MM-DD'))}>
                        Hoje
                </button>
                    <button
                        type="button"
                        onClick={() => handleDate(moment(initialDate).add(1, 'year').format('YYYY-MM-DD'))}>
                        <Arrowhead />
                    </button>
                </div>
            </div>
            <div className="calendar__page--yearly">
                <div className="months">
                    {Object.keys(months).map((month, index) => (
                        <div className="month" key={month}>
                            <button
                                type="button"
                                className="name"
                                onClick={() => {
                                    handleDate(moment(initialDate).set('month', index).format('YYYY-MM-DD'));
                                    setPeriod('monthly');
                                }}>

                                {month}
                            </button>
                            <div className="content">
                                <div className="week">
                                    {week.map((w: string) => <div key={w} className="day">{w.slice(0, 1)}</div>)}
                                </div>
                                <div className="days">
                                    {months[month].map((
                                        day: { formatedDate: string; disabled: boolean; holiday: { type: string, name: string } },
                                        index: number) => day.holiday ? (
                                            <Tippy
                                                key={`${day.formatedDate}-${index}`}
                                                content={day.holiday.name}
                                                placement="bottom"
                                                animateFill
                                                animation="scale"
                                            >
                                                <div className={classnames({
                                                    day: true,
                                                    disabled: day.disabled,
                                                    [day.holiday.type]: true
                                                })}>
                                                    {day.formatedDate}
                                                </div>
                                            </Tippy>
                                        ) : (
                                                <div
                                                    key={`${day.formatedDate}-${index}`}
                                                    className={
                                                        classnames({
                                                            day: true,
                                                            disabled: day.disabled,
                                                        })}>
                                                    {day.formatedDate}
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </animated.div>
    )
};

export default memo(Yearly);