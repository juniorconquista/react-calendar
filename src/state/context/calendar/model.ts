import * as repository from './repository';
import { toast } from 'react-toastify';

import { key } from '../../../utils/constants';

export const calendar = {
    state: {
        holidays: {},
    },
    reducers: {
        holidays(state: any, payload: any) {
            return {
                holidays: { ...state.holidays, ...payload },
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: (dispatch: any) => ({
        async getHolidaysAsync(year: number, getState: any) {
            try {
                const {
                    calendar: { holidays },
                } = getState;
                // if (!holidays[year]) {
                //     const response = await repository.getHolidays({
                //         api_key: key,
                //         country: 'BR',
                //         year,
                //     });
                //     return dispatch.calendar.holidays({
                //         [year]: response.data.holidays.holidays,
                //     });
                // }
            } catch (error) {
                toast.error(
                    'Ops :( Algo deu errado tente novamente !',
                );
            }
        },
        clearStores() {
            dispatch.calendar.clearStore();
        },
    }),
};
