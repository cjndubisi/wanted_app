export default [
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
      const passwordValid = form.password?.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      );

      return passwordValid ? '' : 'Invalid Password format';
    },
  },
];
