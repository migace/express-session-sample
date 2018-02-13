const addBtn = document.getElementById('add-user'),
      loginBtn = document.getElementById('login-user');

addBtn.addEventListener('click', event => {
    event.preventDefault();

    const loginEl = document.getElementById('login'),
          passwordEl = document.getElementById('password'),
          login = loginEl.value,
          password = passwordEl.value;

    fetch(
        '/users/add', 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                login,
                password
            })
        })
        .then(response => response.json())
        .then(response => { 
            const state = response.status === 'OK' ? 'success' : 'error';                
                swal(
                    response.status,
                    response.message,
                    state
                ).then(() => {
                    loginEl.value = '';
                    passwordEl.value = '';
                });
        });
});

loginBtn.addEventListener('click', event => {
    event.preventDefault();

    const loginEl = document.getElementById('login-login'),
          passwordEl = document.getElementById('password-login'),
          login = loginEl.value,
          password = passwordEl.value;

    fetch(
        '/login', 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                login,
                password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === "OK") {
                swal(
                    'OK!',
                    'Logged',
                    'success'
                ).then(() => {
                    loginEl.value = '';
                    passwordEl.value = '';
                });
            } else {
                swal(
                    'Error!',
                    'Bad data!',
                    'error'
                  ).then(() => {
                    loginEl.value = '';
                    passwordEl.value = '';
                });
            }
        });
});