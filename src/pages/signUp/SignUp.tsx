import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../reducers/auth';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';
import { useSigninMutation, useSignupMutation } from '../../app/RtkQuery';
import { SignupType } from '../../app/apiTypes';
import { saveTokenToLS } from '../../features/ls-load-save';
import { Modal } from '../../components';
import { ErrorSign } from '../../components/modal/components';
import { localizationObj } from '../../features/localization';

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
  const { lang } = useAppSelector((state) => state.langStorage);
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
    reValidateMode: 'onChange',
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
        <div className="form__title">{localizationObj[lang].signUp}</div>
        <label className="form__nickname" title={localizationObj[lang].onlyNumbersLetters}>
          <span className="form__label-tittle">{localizationObj[lang].name}:</span>
          <input
            className="signup__name"
            {...register('name', {
              required: localizationObj[lang].emptyField,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: localizationObj[lang].onlyNumbersLetters,
              },
              validate: {
                nameLength: (v) =>
                  v.length > 3 ||
                  `${localizationObj[lang].name}${localizationObj[lang].lessThanFour}`,
              },
            })}
            placeholder={localizationObj[lang].enterYourName}
          />
          {errors.name && <div className="form__error">{errors.name.message}</div>}
        </label>

        <label className="form__nickname" title={localizationObj[lang].onlyNumbersLetters}>
          <span className="form__label-tittle">{localizationObj[lang].login}</span>
          <input
            className="signup__name"
            {...register('login', {
              required: localizationObj[lang].emptyField,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: localizationObj[lang].onlyNumbersLetters,
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

        <label className="form__password">
          <span className="form__label-tittle">{localizationObj[lang].repeatPassword}:</span>
          <input
            className="signup__password"
            type="password"
            {...register('repeatPassword', {
              required: localizationObj[lang].emptyField,
              validate: {
                passLength: (v) =>
                  v.length > 3 ||
                  `${localizationObj[lang].password}${localizationObj[lang].lessThanFour}`,
                passRepeat: (v) => v === password.current || localizationObj[lang].passwordsMatch,
              },
            })}
            placeholder={localizationObj[lang].repeatPassword}
          />
          {errors.repeatPassword && (
            <div className="form__error">{errors.repeatPassword.message}</div>
          )}
        </label>
        <input type="submit" value={localizationObj[lang].signUp} className="form__submit" />
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
