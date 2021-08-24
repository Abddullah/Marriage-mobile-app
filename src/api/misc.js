import {service} from '../utils/request';

export function getCountries() {
    return service({
        url: `/countries/mobile`,
        method: 'get',
    });
}
