import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useSelector} from "react-redux";
import DreamTypesForm from "../../../components/DreamTypes/DreamTypesForm";

const defaultValues = {
  name_en: '',
  name_ar: '',
  public: false,
  price: '',
  letters_limit: '',
  audio_limit: '',
  special_flag: '',
  waiting_for_approve_time: '',
  waiting_for_response_time: '',
  active: false,
  fast: false,
  notes: [],
}

const DreamTypesCreate = () => {
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

    data.name = {
      en: data.name_en,
      ar: data.name_ar
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}dreams/types`, data, {
        headers: {
          'Authorization': auth.token,
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push('/dream-types')
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  return (
    <Card>
      <DreamTypesForm type={'create'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('dream_type_create')} loading={loading} />
    </Card>
  );
};

export default DreamTypesCreate;
