import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect } from 'react';
import FaqsForm from 'src/components/Faqs/FaqsForm'
import {useTranslation} from "react-i18next";
import Error404 from "../../404";
import {useSelector} from "react-redux";
import {store} from "../../../store";
import {getCookie} from "cookies-next";

const defaultValues = {
  question_en: '',
  question_ar: '',
  answer_en: '',
  answer_ar: '',
  order: '',
  active: false
}

const FaqsEdit = ({ faq, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t} = useTranslation()
  const router = useRouter();
  // const { id } = router.query;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const fetchFaqDetails = () => {
    reset({
      question_en: faq.question_en,
      question_ar: faq.question_ar,
      answer_en: faq.answer_en,
      answer_ar: faq.answer_ar,
      order: faq.order,
      active: faq.active
    });
    // if(!isNaN(id)){
    //   axios
    //     .get(`${process.env.NEXT_PUBLIC_API_KEY}faqs/${id}`)
    //     .then(res => {
    //       const data = res.data.data.items;
    //       reset({
    //         question_en: data.question_en,
    //         question_ar: data.question_ar,
    //         answer_en: data.answer_en,
    //         answer_ar: data.answer_ar,
    //         order: data.order,
    //         active: data.active
    //       });
    //     })
    //     .catch(error => {
    //       toast.error(t('error'));
    //     });
    // } else {
    //   router.push('/404')
    // }
  }

  useEffect(() => {
    // if(id) {
      fetchFaqDetails();
    // }
  }, []);

  const onSubmit = async (data) => {
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}faqs/${id}`, data, {
        headers: {
          'Authorization': getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        toast.success(t('success'));
        router.push('/faqs')
      })
      .catch(error => {
        toast.error(t('error'));
      });
  };

  return (
    <Card>
      <FaqsForm onSubmit={handleSubmit(onSubmit)} control={control} errors={errors} title={t('faq_edit')} />
    </Card>
  );
};

export const getServerSideProps = async ({params}) => {
  const state = store.getState()

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}faqs/${params.id}`, {
    headers: {
      'Accepted-Language': state.lang ?? 'en'
    }
  })
  const faq = await res.data.data.items

  return {
    props: { faq, id: params.id }
  }
}

export default FaqsEdit;
