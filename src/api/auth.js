import {service} from '../utils/request';

export function getOTP(data) {
    return service({
        url: '/get-otp',
        method: 'post',
        data: data,
    });
}

export function continueFaceBookUser(data) {
    return service({
        url: '/with-facebook',
        method: 'post',
        data: data,
    });
}

export function updateProfile(data) {
    return service({
        url: '/profile',
        method: 'put',
        data: data,
    });
}
export function updateProfilePhoto(data) {
    return service({
        url: '/profile-photo',
        method: 'put',
        data: data,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    });
}

export function getProfile() {
    return service({
        url: '/profile',
        method: 'get',
    });
}

export function logout() {
    return service({
        url: '/logout',
        method: 'post',
    });
}

export function blockAccount() {
    return service({
        url: '/block',
        method: 'put',
    });
}

export function verifyOTP(data) {
    return service({
        url: '/verify-otp',
        method: 'put',
        data: data,
    });
}

export function addFcmToken(data) {
    return service({
        url: '/fcm-token',
        method: 'put',
        data: data,
    });
}

export function removeFcmToken(data) {
    return service({
        url: '/fcm-token',
        method: 'delete',
        data: data,
    });
}

export function updatePhoto(data) {
    return service({
        url: '/user/photo',
        method: 'post',
        data: data,
        config: {
            headers: {'Content-Type': 'multipart/form-data'},
        },
    });
}
