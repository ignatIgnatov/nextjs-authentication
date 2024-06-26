export const userRegistrationFormControls = [
    {
        name: 'username',
        label: 'Username',
        placeholder: 'Please enter your username',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Please enter your email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Please enter your password',
        componentType: 'input',
        type: 'password'
    }
];

export const userLoginFormControlls = [{
    name: 'email',
    label: 'Email',
    placeholder: 'Please enter your email',
    componentType: 'input',
    type: 'email'
},
{
    name: 'password',
    label: 'Password',
    placeholder: 'Please enter your password',
    componentType: 'input',
    type: 'password'
}]

export const initialSignUpFormData = {
    username: '',
    email: '',
    password: ''
}

export const initialLoginFormData = {
    email: '',
    password: ''
}