import config from "./config";

export default (state, initState, renderForm, renderFormFields) => {
    const form = document.querySelector('form');
    form.addEventListener('submit',async (e) => {
        e.preventDefault();
        state.status = 'sending';
        renderForm(form, state);
        try {
            const url = new URL(form.elements.url.value);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.keys(state.fields).reduce((obj, fieldName) => {
                    obj[fieldName] = state.fields[fieldName].value;
                    return obj;
                }, {})),
            });
            if (response.status === 200) {
                Object.keys(state.fields).forEach((fieldName) => {
                    state.fields[fieldName] = { ...state.fields[fieldName], ...initState.fields[fieldName] };
                });
                state.status = 'filling';
                state.uiState.status = 'seccess';
            } else {
                console.log(response);
                state.status = 'valid';
                state.uiState.status = 'failure';
                state.uiState.error = `${response.status} ${response.statusText}`;
            }
        } catch (e) {
            console.error(e);
            state.uiState.status = 'failure';
            state.uiState.error = e.message;
            state.status = 'valid';
        };
        renderForm(form, state);
    });

    form.addEventListener('input', (e) => {
        const fieldName = e.target.name;
        if (!Object.keys(state.fields).includes(fieldName)) return;
        const value = e.target.value;
        const { isValid, error } = state.fields[fieldName].validator(value, config);
        state.fields[fieldName] = {...state.fields[fieldName], value, error, isValid};
        const isValidForm = Object.keys(state.fields).every((fieldName) => state.fields[fieldName].isValid);
        state.status = isValidForm ? 'valid' : 'invalid';
        state.uiState.status = 'new';
        renderFormFields(form, state);
        renderForm(form, state);
    });
};