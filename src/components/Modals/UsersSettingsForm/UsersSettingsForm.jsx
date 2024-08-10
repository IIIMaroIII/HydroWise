import css from './userSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'src/components/REUSABLE/Button/Button';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/users/selectors.js';
import { useDispatch } from 'react-redux';
import userSettingsFormValidation from 'src/Validation/Forms/userSettingsForm';
import { BsExclamationLg } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { update } from 'src/redux/users/operations.js';
import { changeModal } from 'src/redux/water/slice.js';
import toast from 'react-hot-toast';
import CustomInput from 'src/components/REUSABLE/Input/CustomInput.jsx';
import clsx from 'clsx';
import Container from 'src/components/REUSABLE/Container/Container.jsx';

const UsersSettingsForm = () => {
  const dispatch = useDispatch();
  const [photoPreview, setPhotoPreview] = useState(null);

  const [gender, setGender] = useState('woman');
  const [weight, setWeight] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [dailyNorma, setDailyNorma] = useState(1.9);

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  const handleWeightChange = e => {
    setWeight(e.target.value);
  };

  const handleActiveTimeChange = e => {
    setActiveTime(e.target.value);
  };

  useEffect(() => {
    console.log('gender', gender);
    console.log('weight', weight);
    console.log('activeTime', activeTime);
  }, [activeTime, gender, weight]);

  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(userSettingsFormValidation),
    defaultValues: {
      gender: 'woman',
      weight: 0,
      activeTime: 0,
      email: user.email,
    },
  });

  // let waterAmount = watch('waterIntake', '');

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('photoUrl', data.photoUrl[0]);
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('activeTime', data.activeTime);
    // if (data.waterIntake) {
    //   formData.append('waterIntake', data.waterIntake);
    // }

    dispatch(update(formData))
      .unwrap()
      .then(() => {
        toast.success('You have successfully updated your profile!');
        dispatch(changeModal(false));
        reset();
      });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.settingsForm}>
        <div className={css.photoUrlWrapper}>
          {photoPreview ? (
            <img
              className={css.photoUrl}
              src={photoPreview}
              alt="Photo Preview"
            />
          ) : (
            <img
              className={css.photoUrl}
              src={'src/assets/pictures/userImg.png'}
              alt="Default Preview"
            />
          )}
          <div className={css.fileWrapper}>
            <div className={css.uploadPhotoBtnContainer}>
              <Button addClass={css.uploadPhoto}>
                <FiLogOut className={css.logOutIcon} />
                <p>Upload a photo</p>
                <CustomInput
                  inputClass={css.file}
                  inputType="file"
                  inputName="file"
                  {...register('photoUrl', {
                    onBlur: () => {},
                    onFocus: () => {},
                  })}
                  onChange={handleFileChange}
                />
              </Button>
            </div>
          </div>
        </div>
        {errors.photoUrl && <p>{errors.photoUrl.message}</p>}
        <Container addClass={css.genderIndentityWrapper}>
          <p className={css.genderText}>Your gender identity</p>
          <Container addClass={css.genderWrapper}>
            <CustomInput
              label
              labelName="Woman"
              labelClass={clsx(css.genderLabel, css.rowReverse)}
              inputClass={css.genderInput}
              inputType="radio"
              inputName="gender"
              value="woman"
              checked={gender === 'woman'}
              onChange={handleGenderChange}
            />
            <CustomInput
              label
              labelName="Man"
              labelClass={clsx(css.genderLabel, css.rowReverse)}
              inputClass={css.genderInput}
              inputType="radio"
              inputName="gender"
              value="man"
              checked={gender === 'man'}
              onChange={handleGenderChange}
            />
          </Container>
          {errors.gender && <p>{errors.gender.message}</p>}
        </Container>

        <CustomInput
          label
          labelName="Your name"
          labelClass={clsx(css.genderLabel)}
          inputClass={css.genderInput}
          inputType="text"
          inputName="name"
          {...register('name', {
            onBlur: () => {},
            onFocus: () => {},
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <CustomInput
          label
          labelName="Email"
          labelClass={clsx(css.genderLabel)}
          inputClass={css.genderInput}
          inputType="email"
          inputName="email"
          {...register('email', {
            onBlur: () => {},
            onFocus: () => {},
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <div className={css.dailyNormaWrapper}>
          <p className={css.dailyNormaTitle}>My daily norma</p>
          <div className={css.dailyNormaByGender}>
            <div className={css.dailyNormaByGenderWrapper}>
              <p>For woman:</p>
              <p className={css.accent}>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div className={css.dailyNormaByGenderWrapper}>
              <p>For man:</p>
              <p className={css.accent}>V=(M*0,04) + (T*0,6)</p>
            </div>
          </div>
          <p className={`${css.apFrame} ${css.textInstruction}`}>
            <span className={css.accent}>*</span> V is the volume of the water
            norm in liters per day, M is your body weight, T is the time of
            active sports, or another type of activity commensurate in terms of
            loads (in the absence of these, you must set 0)
          </p>
          <div className={css.exclamatoryTextContainer}>
            <BsExclamationLg className={css.exclamation} />
            <p className={css.exclamatoryText}>Active time in hours</p>
          </div>
        </div>

        <CustomInput
          label
          labelName="Your weight in kilograms:"
          labelClass={clsx(css.genderLabel)}
          inputClass={css.genderInput}
          inputType="number"
          inputName="weight"
          {...register('weight', {
            onBlur: () => {},
            onFocus: () => {},
          })}
        />
        {errors.weight && <p>{errors.weight.message}</p>}

        <CustomInput
          label
          labelName="The time of active participation in sports:"
          labelClass={clsx(css.genderLabel)}
          inputClass={css.genderInput}
          inputType="number"
          inputName="activeTime"
          {...register('activeTime', {
            onBlur: () => {},
            onFocus: () => {},
          })}
        />
        {errors.activeTime && <p>{errors.activeTime.message}</p>}

        <p className={`${css.apText} ${css.reqWaterText}`}>
          The required amount of water in liters per day:
          <span className={css.accent}>{1.8}L</span>
        </p>
        {errors.waterIntake && <p>{errors.waterIntake.message}</p>}

        {/* <label className={`${css.apLabelName} ${css.boldLabel}`}>
          Write down how much water you will drink:
          <input
            className={css.apFrame}
            step="0.1"
            type="number"
            {...register('waterIntake')}
          />
        </label> */}
        {errors.waterIntake && <p>{errors.waterIntake.message}</p>}

        <Button addClass={css.saveButton} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};
export default UsersSettingsForm;
