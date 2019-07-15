import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from '../../components/Header';
import handleFactory from './handleFactory';

import './style.scss';

interface CalendarProps {
    calendar: {
        holidays: any
    },
    getHolidays: (value: number) => void,
};

const Calendar = ({ calendar, getHolidays }: CalendarProps) => {
    const [period, setPeriod] = useState<string>('yearly'); // monthly - yearly
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [year, setYear] = useState<number>(moment().get('year'));

    const handleDate = (date: string) => {
        const newYear = moment(date).get('year')
        if (year !== newYear) {
            setYear(newYear)
        }
        setDate(date)
    }

    useEffect(() => {
        getHolidays(moment().set('year', year).get('year'))
    }, [getHolidays, year]);

    const Component = handleFactory(period);

    return (
        <div className="calendar__page">
            <Header period={period} setPeriod={setPeriod} />
            <Component
                setPeriod={setPeriod}
                handleDate={handleDate}
                initialDate={date}
                holidays={calendar.holidays[year] || []}
                year={year}
            />
        </div>
    );
};

const mapState = (state: any) => ({
    calendar: state.calendar,
});

const mapDispatch = (dispatch: any) => ({
    getHolidays: (payload: any) =>
        dispatch.calendar.getHolidaysAsync(payload),
});



export default connect(mapState, mapDispatch)(memo(Calendar));
