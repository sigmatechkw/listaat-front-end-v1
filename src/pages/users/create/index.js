import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import UsersForm from "../../../components/Users/UsersForm";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useSelector} from "react-redux";

const defaultValues = {
  image: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  gender: '',
  bio: '',
  country_id: null,
  birthday: null,
  role_id: null,
  is_mail_verified: false,
  is_phone_verified: false,
  active: false,
  lang: '',
  expert_commission_value: 0,
  expert_commission_type: 'fixed',
  is_busy: false,
  notification_enabled: 1,
}

const UsersCreate = () => {
  const auth = useSelector(state => state.auth)
  const {t} = useTranslation()
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setLoading(true)

    data.country_id = data.country_id.id
    data.role_id = data.role_id.id
    if (data.birthday && data.birthday.format('YYYY-MM-DD') !== 'Invalid Date')
      data.birthday = data.birthday.format('YYYY-MM-DD')

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}users`, data, {
        headers: {
          'Authorization': auth.token,
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push('/users')
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  return (
    <Card>
      <UsersForm type={'create'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('user_create')} loading={loading} />
    </Card>
  );
};

export default UsersCreate;
