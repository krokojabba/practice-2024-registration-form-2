const clearForm = (form) => {
    const existFeedbacks = form.querySelectorAll('.invalid-feedback');
    if (existFeedbacks) existFeedbacks.forEach((feedback) => feedback.remove());
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => input.classList.remove('is-valid', 'is-invalid'));
    const existMessage = document.querySelectorAll('#message');
    if (existMessage) existMessage.forEach((message) => message.remove());
};

const renderForm = (form, state) => {
    // console.log(JSON.stringify(state, null, 2));
    switch (state.status) {
        case 'filling': {
            clearForm(form);
            form.elements.button.disabled = true;
            Object.keys(state.fields).forEach((fieldName) => {
                form.elements[fieldName].value = '';
            });
            break;
        }
        case 'valid': {
            form.elements.button.disabled = false;
            break;
        }
        case 'sending':
        case 'invalid': {
            form.elements.button.disabled = true;
            break;
        }
        default:
            break;
    }

    switch (state.uiState.status) {
        case 'seccess': {
            const p = document.createElement('p');
            p.textContent = 'Form data was successfully send';
            p.classList.add('success-message');
            p.id = 'message';
            document.querySelector('h1').after(p);
            break;
        }
        case 'failure': {
            const p = document.createElement('p');
            p.textContent = `Form data sending failure: "${state.uiState.error}"`;
            p.classList.add('failure-message');
            p.id = 'message';
            document.querySelector('h1').after(p);
            break;
        }
        case 'new':
        default:
            break;
    }
};

const renderFormFields = (form, state) => {
    clearForm(form);
    Object.keys(state.fields).forEach((fieldName) => {
        if (state.fields[fieldName].value === null) return;
        if (state.fields[fieldName].isValid) form.elements[fieldName].classList.add('is-valid');
        else {
            form.elements[fieldName].classList.add('is-invalid');
            const invalidMessage = document.createElement('div');
            invalidMessage.textContent = state.fields[fieldName].error;
            invalidMessage.classList.add('invalid-feedback');
            invalidMessage.id = `${fieldName}Feedback`;
            form.elements[fieldName].parentElement.after(invalidMessage);
        }
    });
};

export { renderForm, renderFormFields };
