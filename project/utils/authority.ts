export function getAuthority() {
    return localStorage.getItem('authorize');
}

export function setAuthority(authority?: string) {
    return localStorage.setItem('authorize', authority || 'test')
}