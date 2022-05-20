import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../reducers/auth';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';
import { useSigninMutation } from '../../app/RtkQuery';
import { SigninType } from '../../app/apiTypes';
import { saveTokenToLS } from '../../features/ls-load-save';
import './SignIn.scss';
import { Modal } from '../../components';
import { ErrorSign } from '../../components/modal/components';

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signinUser] = useSigninMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { login: '', password: '' },
  });

  const onSubmit = async (user: SigninType) => {
    console.log(user);
    signinUser(user)
      .unwrap()
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
        <div className="form__title">Sign In</div>

        <label className="form__nickname" title="Only numbers and english letters">
          <span className="form__label-tittle">Nickname:</span>
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

        <input type="submit" value="Sign In" className="form__submit" />
      </form>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div>
          <ErrorSign errorMsg={errorMsg} />
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
