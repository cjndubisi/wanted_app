export default [
  {
    placeholder: 'First Name',
    key: 'first_name',
    validation: (value): string => {
      const firstValid = value.length > 2;
      return firstValid ? '' : 'First name is too short';
    },
  },
  {
    placeholder: 'Last Name',
    key: 'last_name',
    validation: (value): string => {
      const firstValid = value.length > 2;
      return firstValid ? '' : 'Last name is too short';
    },
  },
  {
    placeholder: 'Email',
    key: 'email',
    validation: (value): string => {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? '' : 'Invalid email';
    },
  },
  {
    placeholder: 'Password',
    key: 'password',
    validation: (value): string => {
      const passwordValid = value.length >= 6;
      return passwordValid ? '' : 'Password is too short';
    },
  },
  {
    placeholder: 'Confirm Passwod',
    key: 'confirm_password',
    validation: (value): string => {
      const passwordValid = value.length > 6;
      return passwordValid ? '' : 'Password does not match';
    },
  },
];
