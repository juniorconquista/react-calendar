import moment from 'moment';
import isSafeInteger from 'lodash/isSafeInteger';

export const getDaysBetweenMonths = (
    referenceMonth: number,
    referenceYear: number,
) => {
    if (!isSafeInteger(referenceMonth) || !isSafeInteger(referenceYear)) {
        const today = new Date();
        referenceMonth = today.getMonth();
        referenceYear = today.getFullYear();
    }

    const period = getCurrentPeriod(referenceMonth, referenceYear);
    const { startDate, endDate } = period;
    console.log(startDate.format('DD-MM-YYYY'));
    const returnObject = {
        days: endDate.diff(startDate, 'days') + 1,
        startDate,
        endDate,
        customDaysArray: getDaysBetweenDates(startDate, endDate),
        customDatesArray: getDatesBetweenDates(startDate, endDate),
    };
    return returnObject;
};

export const getCurrentPeriod = (month: number, year: number) => {
    const baseDate = moment()
        .set('month', month)
        .set('year', year);

    const weekDay = baseDate.startOf('month').isoWeekday();

    return {
        startDate: baseDate
            .clone()
            .startOf('month')
            .subtract(weekDay !== 7 ? weekDay : 0, 'day'),
        endDate: baseDate.clone().endOf('month'),
    };
};

const getDaysBetweenDates = (date: moment.Moment, endDate: moment.Moment) => {
    const dateArray = [];

    while (date <= endDate) {
        dateArray.push(moment(date).get('date'));
        date = moment(date).add(1, 'days');
    }

    return dateArray;
};

const getDatesBetweenDates = (date: moment.Moment, endDate: moment.Moment) => {
    const dateArray = [];
    while (date <= endDate) {
        dateArray.push(moment(date).format('DD-MM-YYYY'));
        date = moment(date).add(1, 'days');
    }

    console.log(moment(date).format('DD-MM-YYYY'));
    console.log(dateArray);

    return dateArray;
};

export const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

export const week = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
];
