import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import FaqsForm from "src/components/Faqs/FaqsForm"
import {useTranslation} from "react-i18next";
import {getCookie} from "cookies-next";
import {useSelector} from "react-redux";

const defaultValues = {
  question_en: '',
  question_ar: '',
  answer_en: '',
  answer_ar: '',
  order: '',
  active: false
}

const FaqsCreate = () => {
  const {t} = useTranslation()
  const router = useRouter()
  const lang = useSelector(state => state.lang)

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}faqs`,data, {
        headers: {
          'Authorization': getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        toast.success(t('success'));
        router.push('/faqs')
        reset();
      })
      .catch(error => {
        toast.error(t('error'));
      });
  };

  return (
    <Card>
      <FaqsForm onSubmit={handleSubmit(onSubmit)} control={control} errors={errors} title={t('faq_create')} />
    </Card>
  );
};

export default FaqsCreate;
