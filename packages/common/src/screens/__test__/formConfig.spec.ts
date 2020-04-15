import formConfig from './../EmailAuth/formConfig';

const form = {
  first_name: 'random',
  last_name: 'random',
  email: 'random@random.com',
  password: 'random',
  confirm_password: 'random1',
};

describe('Form Validaiton Execptions', () => {
  test('First name should be more than 2', () => {
    const form = { first_name: 'ss' };
    const validation = formConfig.filter((item) => item.key === 'first_name')[0];
    const error = validation.validation(form);

    expect(error).toBe('First name is too short');
  });

  test('Last name should be more than 2', () => {
    const form = { last_name: 'ss' };
    const validation = formConfig.filter((item) => item.key === 'last_name')[0];
    const error = validation.validation(form);

    expect(error).toBe('Last name is too short');
  });

  test('Email should be valid', () => {
    const form = { email: 'ss@asdf' };
    const validation = formConfig.filter((item) => item.key === 'email')[0];
    const error = validation.validation(form);

    expect(error).toBe('Invalid email');
  });
  describe.each([['asd', '$Ra0', '#Rand0m']])('Password validation', (letter, all, value) => {
    test('Password should have one letter', () => {
      const form = { password: letter };
      const validation = formConfig.filter((item) => item.key === 'password')[0];
      const error = validation.validation(form);

      expect(error).toBe('Invalid Password format');
    });

    test('requires length to be 6', () => {
      const form = { password: all };
      const validation = formConfig.filter((item) => item.key === 'password')[0];
      const error = validation.validation(form);

      expect(error).toBe('Invalid Password format');
    });

    test('validates correct passord', () => {
      const form = { password: value };
      const validation = formConfig.filter((item) => item.key === 'password')[0];
      const error = validation.validation(form);

      expect(error).toBe('');
    });

    test('validates matching confirm passsword', () => {
      const form = { password: value, confirm_password: value };
      const validation = formConfig.filter((item) => item.key === 'confirm_password')[0];
      const error = validation.validation(form);

      expect(error).toBe('');
    });
  });
});
