import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchDreamTypesDetails} from "../../../components/DreamTypes/Details/dreamTypesDetailsServices";
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

const DreamTypesEdit = ({type, id}) => {
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

    data.name = {
      en: data.name_en,
      ar: data.name_ar
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}dreams/types/${id}`, data, {
        headers: {
          'Authorization': auth.token,
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push(`/dream-types/details/${id}`)
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  const fetchDreamTypeDetails = () => {
    setValue('name_en', type.name_en)
    setValue('name_ar', type.name_ar)
    setValue('public', type.public)
    setValue('price', type.price)
    setValue('letters_limit', type.letters_limit)
    setValue('audio_limit', type.audio_limit)
    setValue('special_flag', type.special_flag)
    setValue('waiting_for_approve_time', type.waiting_for_approve_time)
    setValue('waiting_for_response_time', type.waiting_for_response_time)
    setValue('active', type.active)
    setValue('fast', type.fast)
    let notes = type.notes
    notes = notes.map(note => {
      return {
        id: note.id,
        text: {
          en: note.text_en,
          ar: note.text_ar
        }
      }
    })
    setValue('notes', notes)
  }

  useEffect(() => {
    if(id) {
      fetchDreamTypeDetails();
    }
  }, [id]);

  return (
    <Card>
      <DreamTypesForm type={'edit'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('dream_type_edit')} loading={loading} />
    </Card>
  );
};

export const getServerSideProps = async (context) => {
  const type = await fetchDreamTypesDetails(context.params.id, context.req.cookies)

  return {
    props: {type, id: context.params.id}
  }
}

export default DreamTypesEdit;
