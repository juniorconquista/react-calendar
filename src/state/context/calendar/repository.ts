import apiClient from '../../../utils/api-client';

export const getHolidays = (params: {
    api_key: string;
    country: string;
    year: number;
}) =>
    apiClient.get('/holidays', {
        params: { ...params },
    });
