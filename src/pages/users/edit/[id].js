import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import UsersForm from "../../../components/Users/UsersForm";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {store} from "../../../store";

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

const UsersEdit = ({user, id}) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t} = useTranslation()
  const router = useRouter()
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

    if (!data.image) {
      data.deleted_image = [user.image_id]
    }

    if (data.image === user.image) {
      delete data.image
    }

    if (!data.password && !data.password_confirmation) {
      delete data.password
      delete data.password_confirmation
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}users/${id}`, data, {
        headers: {
          'Authorization': auth.token,
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push(`/users/${id}`)
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  const fetchUserDetails = () => {
    setValue('image', user.image)
    setValue('first_name', user.first_name)
    setValue('last_name', user.last_name)
    setValue('email', user.email)
    setValue('phone', user.phone)
    setValue('gender', user.gender)
    setValue('bio', user.bio ?? '')
    setValue('country_id', { id: user.country.id, label: user.country.name})
    setValue('birthday', dayjs(new Date(user.birthday)))
    setValue('role_id', { id: user.roles[0]?.id, label: user.roles[0]?.name})
    setValue('is_mail_verified', user.email_verified)
    setValue('is_phone_verified', user.phone_verified)
    setValue('expert_commission_value', user.commission_value)
    setValue('expert_commission_type', user.commission_type)
    setValue('active', user.active)
    setValue('is_busy', user.is_busy)
    setValue('lang', user.preferred_language)
    setValue('notification_enabled', user.notification_enabled)
    // if(!isNaN(id)){
    //   axios
    //     .get(`${process.env.NEXT_PUBLIC_API_KEY}users/${id}`, {
    //       headers: {
    //         'Accepted-Language': lang ?? 'en'
    //       }
    //     })
    //     .then(res => {
    //       const data = res.data.data.items;
    //       setValue('image', data.image)
    //       setValue('first_name', data.first_name)
    //       setValue('last_name', data.last_name)
    //       setValue('email', data.email)
    //       setValue('phone', data.phone)
    //       setValue('gender', data.gender)
    //       setValue('bio', data.bio ?? '')
    //       setValue('country_id', { id: data.country.id, label: data.country.name})
    //       setValue('birthday', dayjs(new Date(data.birthday)))
    //       setValue('role_id', { id: data.roles[0].id, label: data.roles[0].name})
    //       setValue('is_mail_verified', data.email_verified)
    //       setValue('is_phone_verified', data.phone_verified)
    //       setValue('active', data.active)
    //       setValue('lang', data.preferred_language)
    //     })
    //     .catch(err => {
    //       if (err.response) {
    //         toast.error(err.response.data.message);
    //       }
    //     });
    // } else {
    //   router.push('/404')
    // }
  }

  useEffect(() => {
    if(id) {
      fetchUserDetails();
    }
  }, [id]);

  return (
    <Card>
      <UsersForm type={'edit'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('user_edit')} loading={loading} />
    </Card>
  );
};

export const getServerSideProps = async ({params}) => {
  const state = store.getState()

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users/${params.id}`, {
      headers: {
        'Accepted-Language': state.lang ?? 'en'
      }
    })

  const user = await res.data.data.items

  return {
    props: {user, id: params.id}
  }
}

export default UsersEdit;
