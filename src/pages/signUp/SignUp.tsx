import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../reducers/auth';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';
import { useSigninMutation, useSignupMutation } from '../../app/RtkQuery';
import { SignupType } from '../../app/apiTypes';
import { saveTokenToLS } from '../../features/ls-load-save';
import { Modal } from '../../components';
import { ErrorSign } from '../../components/modal/components';

export type SignUpValues = {
  name: string;
  login: string;
  password: string;
  repeatPassword: string;
};

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signupUser] = useSignupMutation();
  const [signinUser] = useSigninMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { name: '', login: '', password: '', repeatPassword: '' },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async ({ name, login, password }: SignUpValues) => {
    const user: SignupType = {
      name,
      login,
      password,
    };
    signupUser(user)
      .unwrap()
      .then((data) => console.log(data))
      .then(() => {
        console.log('Registration ok');
        console.log({ login, password });
        return signinUser({ login, password }).unwrap();
      })
      .then(({ token }) => {
        console.log('Token to redux ok');
        dispatch(loginUser(token));
        console.log('Save to ls ok');
        saveTokenToLS(token);
      })
      .then(() => {
        reset();
        navigate(PATHS.main, { replace: true });
      })
      .catch((error) => {
        setActiveModal(true);
        setErrorMsg(error.data.message);
      });
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">Sign Up</div>
        <label className="form__nickname" title="Only numbers and english letters">
          <span className="form__label-tittle">Name:</span>
          <input
            className="signup__name"
            {...register('name', {
              required: 'Empty name',
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Only numbers and english letters!',
              },
              validate: {
                nameLength: (v) => v.length > 3 || 'Name can not be less than 4 letters',
              },
            })}
            placeholder="Enter your name"
          />
          {errors.name && <div className="form__error">{errors.name.message}</div>}
        </label>

        <label className="form__nickname" title="Only numbers and english letters">
          <span className="form__label-tittle">Login:</span>
          <input
            className="signup__name"
            {...register('login', {
              required: 'Empty login',
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Only numbers and english letters!',
              },
              validate: {
                nameLength: (v) => v.length > 3 || 'Login can not be less than 4 letters',
              },
            })}
            placeholder="Enter your login"
          />
          {errors.login && <div className="form__error">{errors.login.message}</div>}
        </label>

        <label className="form__password">
          <span className="form__label-tittle">Password:</span>
          <input
            className="signup__password"
            type="password"
            {...register('password', {
              required: 'Empty password',
              validate: {
                passLength: (v) => v.length > 3 || 'Password can not be less than 4 letters',
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && <div className="form__error">{errors.password.message}</div>}
        </label>

        <label className="form__password">
          <span className="form__label-tittle">Repeat password:</span>
          <input
            className="signup__password"
            type="password"
            {...register('repeatPassword', {
              required: 'Empty password',
              validate: {
                passLength: (v) => v.length > 3 || 'Password can not be less than 4 letters',
                passRepeat: (v) => v === password.current || 'The passwords do not match',
              },
            })}
            placeholder="Repeat your password"
          />
          {errors.repeatPassword && (
            <div className="form__error">{errors.repeatPassword.message}</div>
          )}
        </label>
        <input type="submit" value="Sign Up" className="form__submit" />
      </form>
      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div>
          <ErrorSign errorMsg={errorMsg} />
        </div>
      </Modal>
    </>
  );
};

export default SignUp;
