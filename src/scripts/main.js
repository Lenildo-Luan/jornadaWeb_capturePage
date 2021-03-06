const mainForm = document.getElementById('mainForm');

mainForm.addEventListener('submit', function(element) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const requestUrl = 'https://api.convertkit.com/v3/forms/2068822/subscribe/';
    const mainForm = {
        nameInput: document.getElementById('formName'),
        emailInput: document.getElementById('formEmail'),
        checkbox: document.getElementById('checkbox'),
    }
    const requestHeader = new Headers({
        "Content-Type": "application/json",
    })
    const requestBody = {
        api_key: 'iE5kRmVMSkzt2K9H4_FAnA',
        first_name: mainForm.nameInput.value,
        email: mainForm.emailInput.value,
        tags: ['2212726']
    }

    element.preventDefault();

    if (requestBody.first_name == null || !nameRegex.test(requestBody.first_name)) {
        mainForm.nameInput.style.borderColor = '#ff0000';
    } else if (requestBody.email == null || !emailRegex.test(requestBody.email)) {
        mainForm.nameInput.style.borderColor = '#363636';
        mainForm.emailInput.style.borderColor = '#ff0000';
    } else {
        mainForm.emailInput.style.borderColor = '#363636';
        fetch(requestUrl, {
            method: 'post',
            headers: requestHeader,
            body: JSON.stringify(requestBody),
        }).then((response) => {
            location.href = './obrigado.html';
        }).catch(err => {
            console.log(err);
        })
    }
})