export default [
  {
    placeholder: 'First Name',
    key: 'first_name',
    validation: (form): string => {
      const firstValid = form.first_name?.length > 2;
      return firstValid ? '' : 'First name is too short';
    },
  },
  {
    placeholder: 'Last Name',
    key: 'last_name',
    validation: (form): string => {
      const firstValid = form.last_name?.length > 2;
      return firstValid ? '' : 'Last name is too short';
    },
  },
  {
    placeholder: 'Email',
    key: 'email',
    validation: (form): string => {
      const emailValid = form.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? '' : 'Invalid email';
    },
  },
  {
    placeholder: 'Password',
    key: 'password',
    validation: (form): string => {
      const passwordValid = form.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      );
      return passwordValid ? '' : 'Invalid Password format';
    },
  },
  {
    placeholder: 'Confirm Passwod',
    key: 'confirm_password',
    validation: (form): string => {
      if (form.password !== form.confirm_password) {
        return 'Password does not match';
      }
      return '';
    },
  },
];
