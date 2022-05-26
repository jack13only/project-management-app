import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../reducers/auth';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';
import { useSigninMutation } from '../../app/RtkQuery';
import { SigninType } from '../../app/apiTypes';
import { saveTokenToLS } from '../../features/ls-load-save';
import './SignIn.scss';
import { Modal } from '../../components';
import { ErrorSign } from '../../components/modal/components';
import { localizationObj } from '../../features/localization';

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signinUser] = useSigninMutation();
  const { lang } = useAppSelector((state) => state.langStorage);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { login: '', password: '' },
  });

  const onSubmit = async (user: SigninType) => {
    console.log(user);
    signinUser(user)
      .unwrap()
      .then(({ token }) => {
        dispatch(loginUser(token));
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
        <div className="form__title">{localizationObj[lang].signIn}</div>

        <label className="form__nickname" title={localizationObj[lang].onlyNumbersLetters}>
          <span className="form__label-tittle">{localizationObj[lang].login}:</span>
          <input
            className="signup__name"
            {...register('login', {
              required: localizationObj[lang].emptyField,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: `${localizationObj[lang].onlyNumbersLetters}`,
              },
              validate: {
                nameLength: (v) =>
                  v.length > 3 ||
                  `${localizationObj[lang].login}${localizationObj[lang].lessThanFour}`,
              },
            })}
            placeholder={localizationObj[lang].enterYourLogin}
          />
          {errors.login && <div className="form__error">{errors.login.message}</div>}
        </label>

        <label className="form__password">
          <span className="form__label-tittle">{localizationObj[lang].password}:</span>
          <input
            className="signup__password"
            type="password"
            {...register('password', {
              required: localizationObj[lang].emptyField,
              validate: {
                passLength: (v) =>
                  v.length > 3 ||
                  `${localizationObj[lang].password}${localizationObj[lang].lessThanFour}`,
              },
            })}
            placeholder={localizationObj[lang].enterYourPassword}
          />
          {errors.password && <div className="form__error">{errors.password.message}</div>}
        </label>

        <input type="submit" value={localizationObj[lang].signIn} className="form__submit" />
      </form>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="error-content">
          <ErrorSign errorMsg={errorMsg} />
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
