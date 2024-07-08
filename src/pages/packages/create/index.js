import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useSelector} from "react-redux";
import DreamTypesForm from "../../../components/DreamTypes/DreamTypesForm";
import PackagesForm from "../../../components/Packages/PackagesForm";
import {getCookie} from "cookies-next";

const defaultValues = {
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: '',
  price: '',
  balance: '',
  order: '',
  active: false,
}

const PackagesCreate = () => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
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

    data.name = {
      en: data.name_en,
      ar: data.name_ar
    }

    data.description = {
      en: data.description_en,
      ar: data.description_ar
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}packages`, data, {
        headers: {
          'Authorization': getCookie('token') ?? auth.token,
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push('/packages')
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  return (
    <Card>
      <PackagesForm type={'create'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('package_create')} loading={loading} />
    </Card>
  );
};

export default PackagesCreate;
