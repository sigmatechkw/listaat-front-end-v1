import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchItemsDetails } from 'src/components/Items/Details/ItemsDetailsServices'
import ItemsForm from 'src/components/Items/ItemsForm'

const defaultValues = {
    name: '',
    cost : '',
    user_id : null,
    item_group_id: null,
    country_id: null,
    extra_cost: '',
    width: '',
    height: '',
    length: '',
    unit: null,
    notes: '',
    source_name: '',
    source_address: '',
    source_website: '',
    image: '',
    receipt : '',
    collections_ids : [],
    sort :'',
    active: false
}

const ItemsEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [itemImg, setItemImg] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [receiptImg, setReceiptImg] = useState('')
  const [receiptSrc, setReceiptSrc] = useState('')

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)


    if(testBase64(imgSrc)){
      data.image = imgSrc;
    }else{
      delete data.image;
    }

    if(testBase64(receiptSrc)){
      data.receipt = receiptSrc;
    }else{
      delete data.receipt;
    }

    data.user_id = data.user_id?.id;
    data.country_id = data.country_id?.id;
    data.item_group_id = data.item_group_id?.id;
    data.collections_ids = data?.collections_ids.length > 0 ? data?.collections_ids.map(item => item = item.id) : [];
    data.unit = data.unit?.id;
    data.source = {
      source_name : data.source_name,
      source_address : data.source_address,
      source_website : data.source_website,
    };

    console.log(data);

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}items/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/items/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchItemsDetails = () => {
    setValue('name', type.name)
    setValue('cost', type.cost)
    setValue('user_id', type.user)
    setValue('country_id', type.country ?? '')
    setValue('extra_cost', type.extra_cost ?? '')
    setValue('width', type.width ?? '')
    setValue('height', type.height ?? '')
    setValue('length', type.length ?? '')
    setValue('unit', type.unit)
    setValue('notes', type.notes ?? '')
    setValue('image', type.image)
    setImgSrc(type.image)
    setValue('receipt', type.receipt)
    setReceiptSrc(type.receipt)
    setValue('collections_ids', type.collections ?? [])
    setValue('source_name', type.source ? type.source.source_name : '')
    setValue('source_address', type.source ? type.source.source_address : '')
    setValue('source_website', type.source ? type.source.source_website : '')
    setValue('sort', type.sort)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
        fetchItemsDetails()
    }
  }, [id])

  return (
    <Card>
        <ItemsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        itemImg={itemImg}
        setItemImg={setItemImg}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        receiptImg={receiptImg}
        setReceiptImg={setReceiptImg}
        receiptSrc={receiptSrc}
        setReceiptSrc={setReceiptSrc}
        title={t('item_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchItemsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ItemsEdit
