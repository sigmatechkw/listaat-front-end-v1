import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import PushMessagesForm from 'src/components/push_messages/PushMessagesForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  title_en: '',
  title_ar: '',
  body_ar: '',
  body_en: ''
}

const PushMessagesCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pushMessageImg, setPushMessageImg] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedExperts, setSelectedExperts] = useState([])
  const [enableSelectExpert, setEnableSelectExpert] = useState(false)
  const [enableSelectUser, setEnableSelectUsers] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = imgSrc => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(imgSrc)
  }

  const onSubmit = data => {
    setLoading(true)

    /*  if (selectedUsers.length == 0) {  */
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_KEY}push-message`,
        {
          ...data,
          ...(imgSrc && imgSrc != '/images/avatars/15.png' && { image: imgSrc }),

          ...((!enableSelectUser || !enableSelectExpert) && { users: [...selectedUsers, ...selectedExperts] }),
          ...(enableSelectUser && { all_users: true }),

          //...(!enableSelectExpert && { experts: selectedExperts }),
          ...(enableSelectExpert && { all_experts: true })
        },
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/push_messages')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
    /*  } else {
        setLoading(false)
        toast.error('please selecte users');
    } */
  }

  return (
    <Card>
      <PushMessagesForm
        selectedExperts={selectedExperts}
        setSelectedExperts={setSelectedExperts}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        pushMessageImg={pushMessageImg}
        setPushMessageImg={setPushMessageImg}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('push_messages')}
        loading={loading}
        enableSelectExpert={enableSelectExpert}
        setEnableSelectExpert={setEnableSelectExpert}
        enableSelectUser={enableSelectUser}
        setEnableSelectUsers={setEnableSelectUsers}
      />
    </Card>
  )
}

export default PushMessagesCreate
