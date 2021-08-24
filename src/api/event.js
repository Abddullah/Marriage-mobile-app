import {service} from '../utils/request';

export function joinEvent(data) {
    return service({
        url: '/join-event',
        method: 'put',
        data: data,
    });
}
export function leaveEvent(data) {
    return service({
        url: '/leave-event',
        method: 'put',
        data: data,
    });
}

export function attendEvent(data) {
    return service({
        url: `/attend-event/${data.event}`,
        method: 'put',
        data: data,
    });
}
export function unAttendEvent(data) {
    return service({
        url: `/unattend-event/${data.event}`,
        method: 'put',
        data: data,
    });
}
export function getEvents({countryCode, country}) {
    return service({
        url: `/events/${country}`,
        method: 'get',
    });
}

export function getAccessToken(data) {
    return service({
        url: '/vidoe/room',
        method: 'post',
        data: data,
    });
}

export function getUserDetail(id) {
    return service({
        url: `/user/${id}`,
        method: 'get',
    });
}

export function reportCall(data) {
    return service({
        url: `/report-call/${data.eventId}`,
        method: 'post',
        data: data,
    });
}
