import {service} from '../utils/request';
export function addMatch(data) {
    return service({
        url: '/match',
        method: 'post',
        data: data,
    });
}
export function getMatches() {
    return service({
        url: '/matches',
        method: 'get',
    });
}
export function getMessages(data) {
    return service({
        url: '/messages',
        method: 'post',
        data: data,
    });
}
export function updateMessage({id, body}) {
    return service({
        url: `/message/${id}`,
        method: 'put',
        data: body,
    });
}
export function deleteMessage({id}) {
    return service({
        url: `/message/${id}`,
        method: 'delete',
    });
}
