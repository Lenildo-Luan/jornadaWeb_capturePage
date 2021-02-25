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
    const requestBody = {
        api_key: 'iE5kRmVMSkzt2K9H4_FAnA',
        first_name: mainForm.nameInput,
        email: mainForm.emailInput,
    }

    element.preventDefault();

    if (mainForm.nameInput == null || !nameRegex.test(mainForm.nameInput)) {
        mainForm.nameInput.style.borderColor = '#D50000';
    } else if (mainForm.emailInput == null || !emailRegex.test(mainForm.emailInput)) {
        mainForm.nameInput.style.borderColor = '#262626';
        mainForm.emailInput.style.borderColor = '#D50000';
    } else if (!mainForm.checkbox.checked) {
        mainForm.emailInput.style.borderColor = '#262626';
        mainForm.checkboxSpan.style.borderColor = '#D50000';
    } else {
        mainForm.checkboxSpan.style.borderColor = '#262626';
        fetch(requestUrl, {
            method: 'post',
            body: JSON.stringify(requestBody),
        }).then((response) => {
            alert(response);
            location.href = './confirmacao.html';
        }).catch(err => {
            alert(err);
            console.log(err);
        })
    }
})