export function goToLoginPage() {
    localStorage.setItem('unauthorized', "1")
    setTimeout(() => {
        localStorage.setItem('unauthorized', "0")
    }, 1000)
    window.location.href = '/login';
}