const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
    fetch('/logout')
        .then(response => response.json())
        .then(response => {
            swal(
                'OK!',
                'Logged out',
                'success'
            ).then(() => {
                location.href = '/';
            });
        });
});