import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  useDeleteUserMutation,
  useSigninMutation,
  useUpdateUserMutation,
} from '../../app/RtkQuery';
import { Modal } from '../../components';
import { ErrorSign } from '../../components/modal/components';
import { localizationObj } from '../../features/localization';
import { saveTokenToLS } from '../../features/ls-load-save';
import { loginUser, logoutUser } from '../../reducers/auth';
import { setEmptyUser } from '../../reducers/userReducer';
import { ChangeTitleBtns } from '../../components/buttons';
import './UserProfile.scss';

export type UserEditValues = {
  name: string;
  login: string;
  oldpassword: string;
  newpassword: string;
};

const UserProfile: FC = () => {
  const { userId, userName, userLogin } = useAppSelector((state) => state.userStorage);
  const [updateUser] = useUpdateUserMutation();
  const [signinUser] = useSigninMutation();
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [deleteMsg, setDeleteMsg] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPassChanging, setIsPassChanging] = useState<boolean>(false);
  const { lang } = useAppSelector((state) => state.langStorage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEditValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { name: userName, login: userLogin, oldpassword: '', newpassword: '' },
  });

  useEffect(() => {
    if (!activeModal) {
      setErrorMsg('');
      setSuccessMsg('');
      setDeleteMsg(false);
    }
  }, [activeModal]);

  const onSubmit = async ({ name, login, oldpassword, newpassword }: UserEditValues) => {
    const body = {
      name: isPassChanging ? userName : name,
      login: isPassChanging ? userLogin : login,
      password: isPassChanging ? newpassword : oldpassword,
    };
    signinUser({ login: userLogin, password: oldpassword })
      .unwrap()
      .then(() => {
        return updateUser({ userId, body }).unwrap();
      })
      .then(() => {
        return signinUser({
          login: isPassChanging ? userLogin : login,
          password: isPassChanging ? newpassword : oldpassword,
        }).unwrap();
      })
      .then(({ token }) => {
        dispatch(loginUser(token));
        saveTokenToLS(token);
      })
      .then(() => {
        reset({
          name: name,
          login: login,
          oldpassword: '',
          newpassword: '',
        });
        setIsEditing(false);
        setActiveModal(true);
        setSuccessMsg(
          isPassChanging
            ? `${localizationObj[lang].password} ${localizationObj[lang].updateSuccessful}`
            : `${localizationObj[lang].user} ${localizationObj[lang].updateSuccessful}`
        );
      })
      .catch((error) => {
        setActiveModal(true);
        if (error.data.statusCode === 403) {
          setErrorMsg(localizationObj[lang].wrongPassword);
        } else {
          setErrorMsg(error.data.message);
        }
      });
  };

  const deleteHandler = async () => {
    deleteUser(userId)
      .unwrap()
      .then((data) => {
        if (!data) {
          dispatch(logoutUser());
          dispatch(setEmptyUser());
          saveTokenToLS('');
        }
      })
      .catch((error) => {
        setActiveModal(true);
        setErrorMsg(error.data.message);
      });
  };

  useEffect(() => {
    if (!activeModal) {
      setSuccessMsg('');
      setErrorMsg('');
    }
  }, [activeModal]);

  return (
    <>
      {!isEditing && (
        <div className="user-profile">
          <div className="form__title">{localizationObj[lang].profile}</div>
          <div className="user-profile-name">
            <div className="user-profile__field">{localizationObj[lang].name}:</div>
            <div className="user-profile__value">{userName}</div>
          </div>
          <div className="user-profile-name">
            <div className="user-profile__field">{localizationObj[lang].login}: </div>
            <div className="user-profile__value">{userLogin}</div>
          </div>
          <div className="user-profile__buttons">
            <button
              className="user-profile__button"
              onClick={() => {
                setIsEditing(true);
                setIsPassChanging(false);
              }}
            >
              {localizationObj[lang].editUser}
            </button>
            <button
              className="user-profile__button"
              onClick={() => {
                setIsEditing(true);
                setIsPassChanging(true);
              }}
            >
              {localizationObj[lang].changePassword}
            </button>
            <button
              className="user-profile__button"
              onClick={() => {
                setActiveModal(true);
                setDeleteMsg(true);
              }}
            >
              {localizationObj[lang].deleteUser}
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <form className="signup" onSubmit={handleSubmit(onSubmit)}>
          {!isPassChanging && (
            <>
              <label className="form__nickname" title="Only numbers and english letters">
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
                <span className="form__label-tittle">{localizationObj[lang].login}:</span>
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
            </>
          )}
          <label className="form__password">
            <span className="form__label-tittle">{localizationObj[lang].oldPassword}:</span>
            <input
              className="signup__password"
              type="password"
              {...register('oldpassword', {
                required: localizationObj[lang].emptyField,
                validate: {
                  passLength: (v) =>
                    v.length > 3 ||
                    `${localizationObj[lang].password}${localizationObj[lang].lessThanFour}`,
                },
              })}
              placeholder={localizationObj[lang].enterYourPassword}
            />
            {errors.oldpassword && <div className="form__error">{errors.oldpassword.message}</div>}
          </label>

          {isPassChanging && (
            <label className="form__password">
              <span className="form__label-tittle">{localizationObj[lang].newPassword}:</span>
              <input
                className="signup__password"
                type="password"
                {...register('newpassword', {
                  required: localizationObj[lang].emptyField,
                  validate: {
                    passLength: (v) =>
                      v.length > 3 ||
                      `${localizationObj[lang].password}${localizationObj[lang].lessThanFour}`,
                  },
                })}
                placeholder={localizationObj[lang].enterYourPassword}
              />
              {errors.newpassword && (
                <div className="form__error">{errors.newpassword.message}</div>
              )}
            </label>
          )}
          <div className="board__column-btns space">
            <button className="button-modal__wrapper button-modal-width" type="submit">
              <div className="button-modal button__submit" />
              <div className="button-modal__description">{localizationObj[lang].update}</div>
            </button>
            <button
              className="button-modal__wrapper button-modal-width"
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              <div className="button-modal button__cancel" />
              <div className="button-modal__description">{localizationObj[lang].cancel}</div>
            </button>
          </div>
        </form>
      )}

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <>
          {!!errorMsg && <ErrorSign errorMsg={errorMsg} />}
          {!!successMsg && (
            <div className="error-modal">
              <h3 className="error-modal__title green">{localizationObj[lang].success}</h3>
              <div>{successMsg}</div>
            </div>
          )}
          {!!deleteMsg && (
            <div className="modal__text">
              <h2>{`${localizationObj[lang].doYouWantToDelete} '${userName}' ?`}</h2>
              <div>{localizationObj[lang].afterDeleteRedirect}</div>
              <ChangeTitleBtns
                onClickSubmit={deleteHandler}
                onClickCancel={() => {
                  setActiveModal(false);
                  setDeleteMsg(false);
                }}
              />
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export { UserProfile };
