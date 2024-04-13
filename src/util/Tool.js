export function goToLoginPage() {
    localStorage.setItem('unauthorized', "1")
    window.location.href = '/login';
}