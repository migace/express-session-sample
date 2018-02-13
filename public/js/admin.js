dataTable = document.getElementById('data');

function getData(resultEl) {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            let result = '';

            data.forEach(user => {
                result += `
                    <tr>
                        <td>${user.login}</td>
                        <td>${user.password}</td>
                        <td>
                            <button class="delete-user button is-small is-danger" data-id="${user._id}">
                                <i class="delete-user fas fa-trash-alt" data-id="${user._id}"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            resultEl.innerHTML = result;
        });
}

document.querySelector('#data').addEventListener('click', e => {
    if (e.target.classList.contains('delete-user')) {
        fetch('/users', {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: e.srcElement.getAttribute('data-id')})
            })
            .then(response => response.json())
            .then(response => {
                swal(
                    response.status,
                    response.message,
                    'success'
                ).then(() => {
                    getData(dataTable.querySelector('tbody'));
                });
            });
    }
});

getData(dataTable.querySelector('tbody'));
