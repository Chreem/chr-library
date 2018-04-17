export function getAuthority() {
    return localStorage.getItem('authorize');
}

export function setAuthority(authority) {
    return localStorage.setItem('authorize', authority)
}