import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchPackagesDetails} from "../../../components/Packages/Details/packagesDetailsServices";
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

const PackagesEdit = ({packageDetails, id}) => {
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

    data.description = {
      en: data.description_en,
      ar: data.description_ar
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}packages/${id}`, data, {
        headers: {
          'Authorization': getCookie('token') ?? auth.token,
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'));
        router.push(`/packages/details/${id}`)
        reset();
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });

  };

  const fetchPackageDetails = () => {
    setValue('name_en', packageDetails.name_en)
    setValue('name_ar', packageDetails.name_ar)
    setValue('description_en', packageDetails.description_en)
    setValue('description_ar', packageDetails.description_ar)
    setValue('price', packageDetails.price)
    setValue('balance', packageDetails.balance)
    setValue('order', packageDetails.order)
    setValue('active', packageDetails.active)
  }

  useEffect(() => {
    if(id) {
      fetchPackageDetails();
    }
  }, [id]);

  return (
    <Card>
      <PackagesForm type={'edit'} onSubmit={handleSubmit(onSubmit)} control={control} watch={watch} setValue={setValue} errors={errors} title={t('package_edit')} loading={loading} />
    </Card>
  );
};

export const getServerSideProps = async (context) => {
  const packageDetails = await fetchPackagesDetails(context.params.id, context.req.cookies)

  return {
    props: {packageDetails, id: context.params.id}
  }
}

export default PackagesEdit;
