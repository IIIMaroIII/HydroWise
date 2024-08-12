import css from './signUpForm.module.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'src/components/REUSABLE/Button/Button';
import { signIn, signUp, userInfo } from 'src/redux/users/operations.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import toast from 'react-hot-toast';
import Logo from 'src/components/REUSABLE/Logo/Logo';
import Container from 'src/components/REUSABLE/Container/Container.jsx';
import CustomInput from 'src/components/REUSABLE/Input/CustomInput.jsx';
import clsx from 'clsx';
import CustomNavLink from 'src/components/REUSABLE/CustomNavLink/CustomNavLink.jsx';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Repeat Password is required'),
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
    const { email, password } = data;
    dispatch(signUp({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(signIn({ email, password }))
          .unwrap()
          .then(() => {
            dispatch(userInfo());
            toast.success(
              `We are so exited to meet you ${email} in WaterWise App! 🎊`,
            );
            navigate('/tracker');
          });
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
          <h2 className={css.title}>Sign Up</h2>

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

          <CustomInput
            label={true}
            labelName="Repeat password"
            labelClass={css.label}
            inputType={showPassword ? 'text' : 'password'}
            inputClass={clsx(css.input, css.inputPassword)}
            placeholder="Repeat password"
            error={errors.password ? true : false}
            {...register('repeatPassword', {
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

          {errors.repeatPassword && (
            <p className={css.errorMessage}>{errors.repeatPassword.message}</p>
          )}
          <Button
            disabled={!isDirty || !isValid}
            addClass={css.button}
            type="submit"
          >
            Sign Up
          </Button>
          <div className={css.spanSignIn}>
            <p>Already have an account?</p>
            <CustomNavLink addClass={css.link} to="/signin">
              Sign In
            </CustomNavLink>
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default SignUpForm;

/*
 <div className={css.inputContainer}>
              <label className={css.formLabel}>Repeat password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Repeat password"
                {...register('repeatPassword')}
              />
              <span
                className={css.togglePassword}
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              {errors.repeatPassword && (
                <p className={css.error}>{errors.repeatPassword.message}</p>
              )}
            </div>




<p className={css.alreadyHaveAcc}>
              <span className={css.translucentText}>
                {' '}
                Already have an account?
              </span>{' '}
              <a href="/signin" className={css.signInRef}>
                Sign In
              </a>
            </p>
*/
