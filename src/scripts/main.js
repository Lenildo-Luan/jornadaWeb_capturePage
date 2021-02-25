const mainForm = document.getElementById('mainForm');

mainForm.addEventListener('submit', function(element) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const requestUrl = 'https://api.convertkit.com/v3/forms/2068822/subscribe/';
    const mainForm = {
        nameInput: document.getElementById('formName'),
        emailInput: document.getElementById('formEmail'),
        checkbox: document.getElementById('checkbox'),
        checkboxSpan: document.getElementById('checkboxSpan'),
    }
    const requestHeader = new Headers({
        "Content-Type": "application/json",
    })
    const requestBody = {
        api_key: 'iE5kRmVMSkzt2K9H4_FAnA',
        first_name: mainForm.nameInput.value,
        email: mainForm.emailInput.value,
    }

    element.preventDefault();

    if (requestBody.first_name == null || !nameRegex.test(requestBody.first_name)) {
        mainForm.nameInput.style.borderColor = '#D50000';
    } else if (requestBody.email == null || !emailRegex.test(requestBody.email)) {
        mainForm.nameInput.style.borderColor = '#262626';
        mainForm.emailInput.style.borderColor = '#D50000';
    } else if (!mainForm.checkbox.checked) {
        mainForm.emailInput.style.borderColor = '#262626';
        mainForm.checkboxSpan.style.borderColor = '#D50000';
    } else {
        mainForm.checkboxSpan.style.borderColor = '#262626';
        fetch(requestUrl, {
            method: 'post',
            headers: requestHeader,
            body: JSON.stringify(requestBody),
        }).then((response) => {
            location.href = './confirmacao.html';
        }).catch(err => {
            console.log(err);
        })
    }
})