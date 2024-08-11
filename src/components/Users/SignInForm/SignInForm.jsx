import css from './signInForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signIn, userInfo } from 'src/redux/users/operations.js';
import Button from 'src/components/REUSABLE/Button/Button';
import Logo from 'src/components/REUSABLE/Logo/Logo';
import CustomNavLink from 'src/components/REUSABLE/CustomNavLink/CustomNavLink';
import CustomInput from 'src/components/REUSABLE/Input/CustomInput.jsx';
import clsx from 'clsx';
import Container from 'src/components/REUSABLE/Container/Container.jsx';

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    dispatch(signIn(data))
      .unwrap()
      .then(res => {
        dispatch(userInfo());
        toast.success(res.message);
        reset();
        navigate('/tracker');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container addClass={css.signInFormContainer}>
      <Logo addClass={css.logo} />
      <Container addClass={css.formWrapper}>
        {' '}
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={css.title}>Sign In</h2>

          <CustomInput
            label={true}
            labelName="Email"
            labelClass={css.label}
            inputType="email"
            inputClass={css.input}
            placeholder="Enter your email"
            error={errors.email ? true : false}
            {...register('email', {
              onBlur: () => {},
              onFocus: () => {},
            })}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
          <CustomInput
            label={true}
            labelName="Password"
            labelClass={css.label}
            inputType={showPassword ? 'text' : 'password'}
            inputClass={clsx(css.input, css.inputPassword)}
            placeholder="Enter your password"
            error={errors.password ? true : false}
            {...register('password', {
              onBlur: () => {},
              onFocus: () => {},
            })}
          >
            <span
              className={css.togglePassword}
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </CustomInput>

          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
          <Button
            disabled={!isDirty || !isValid}
            addClass={css.button}
            type="submit"
          >
            Sign In
          </Button>
          <div className={css.spanSignIn}>
            <p>Don’t have an account? </p>
            <CustomNavLink addClass={css.link} to="/signup">
              Sign Up
            </CustomNavLink>
          </div>
        </form>
      </Container>
    </Container>
  );
};
export default SignInForm;
