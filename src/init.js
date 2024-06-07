export default () => {
    const state = {
        fields: {
            firstName: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^[a-zA-Zа-яА-ЯёЁ]{1,20}$/.test(value)) return ({ isValid: true, error: 'aaa' });
                    return ({ isValid: false, error: 'The first name must contain from 1 to 20 characters. Numbers and special characters are not allowed.' });
                },
                error: '',
            },
            lastName: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^[a-zA-Zа-яА-ЯёЁ]{1,20}$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'The last name must contain from 1 to 20 characters. Numbers and special characters are not allowed.' });
                },
                error: '',
            },
            email: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^.+@.+\..+$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'Invalid email' });
                },
                error: '',
            },
            phoneNumber: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'Enter valid phone numder, for example: +79876543210 or 8(987)654-32-10' });
                },
                error: '',
            },
            text: {
                value: null,
                isValid: null,
                validator: (value, config) => {
                    if (value.length > config.maxTextLength) return ({ isValid: false, error: `Text length must maximum ${config.maxTextLength} letters` });
                    if (value.length < 1) return ({ isValid: false, error: 'Enter text' });
                    return ({ isValid: true, error: '' });
                },
                error: '',
            },
        },
        status: 'filling', // valid, invalid, sending
        uiState: {
            status: 'new', // seccess, failure
            error: '',
        }
    };
    return state;
};
