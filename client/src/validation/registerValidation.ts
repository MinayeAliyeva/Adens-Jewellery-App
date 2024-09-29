import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your first name')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Please enter your last name')
    .min(2, 'Last name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Please enter your email'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
