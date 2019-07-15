import moment from 'moment';
import isSafeInteger from 'lodash/isSafeInteger';

export const getDaysBetweenMonths = (
    referenceMonth: number,
    referenceYear: number,
    holidays: [],
) => {
    if (!isSafeInteger(referenceMonth) || !isSafeInteger(referenceYear)) {
        const today = new Date();
        referenceMonth = today.getMonth();
        referenceYear = today.getFullYear();
    }
    const period = getCurrentPeriod(referenceMonth, referenceYear);
    const { startDate, endDate } = period;
    const returnObject = {
        days: endDate.diff(startDate, 'days') + 1,
        startDate,
        endDate,
        customDaysArray: getDaysBetweenDates(startDate, endDate, holidays),
    };
    return returnObject;
};

export const getMonthsBetweenYear = (year: number, holidays: []) => {
    const monthsInYear = months.reduce(
        (prev: any, curr: string, index: number) => {
            const startDate = moment()
                .set('month', index)
                .set('year', year)
                .startOf('month');
            const endDate = moment()
                .set('month', index)
                .set('year', year)
                .endOf('month');
            const weekDay = startDate.startOf('month').isoWeekday();
            const days = getDaysBetweenDates(
                startDate.subtract(weekDay !== 7 ? weekDay : 0, 'day'),
                endDate,
                holidays,
            );
            prev[curr] = days;
            return prev;
        },
        {},
    );
    return monthsInYear;
};

export const getLabel = (period: string, date: string) => {
    switch (period) {
        case 'monthly':
            return `${months[moment(date).get('month')]} de ${moment(date).get(
                'year',
            )}`;
        default:
            return moment(date).get('year');
    }
};

const getCurrentPeriod = (month: number, year: number) => {
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

const getDaysBetweenDates = (
    date: moment.Moment,
    endDate: moment.Moment,
    holidays: [],
) => {
    const dateArray = [];
    while (date <= endDate) {
        dateArray.push({
            weekDay: moment(date).isoWeekday(),
            formatedDate: moment(date).get('date'),
            holiday: holidays.find(
                (holiday: { date: string }) =>
                    holiday.date === moment(date).format('YYYY-MM-DD'),
            ),
            disabled: !moment(endDate)
                .startOf('month')
                .isSameOrBefore(moment(date)),
        });
        date = moment(date).add(1, 'days');
    }
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
