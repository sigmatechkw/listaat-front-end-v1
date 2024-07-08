import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const defaultValues = {
  name: '',
  guard_name: '',
  active: ''
}
import { store } from 'src/store'
import { getCookie } from 'cookies-next'
import RolesForm from 'src/components/roles/RolesForm'

const state = store.getState()

const RolesCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)

  const [rows, setRows] = useState([])
  const [permissionsIds, setPermissionsIds] = useState([])

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setLoading(true)

    const { permissions, editable, id, slug, ...rest } = data
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_KEY}roles`,
        {
          ...rest,
          permission_ids: permissionsIds.length > 0 ? permissionsIds.map(item => item.id) : []
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
        router.push('/roles')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}permissions`, {
        headers: {
          Authorization: state.auth.token,
          'Accepted-Language': state.lang ?? 'en'
        }
      })

      setRows(response.data.data.items)
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [id])

  return (
    <Card>
      <RolesForm
        permissionsIds={permissionsIds}
        setPermissionsIds={setPermissionsIds}
        type={'edit'}
        permissions={rows}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('edit')}
        loading={loading}
      />
    </Card>
  )
}

export default RolesCreate
