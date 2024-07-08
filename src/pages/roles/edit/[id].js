import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RolesEditForm from 'src/components/roles/RolesEditForm'

const defaultValues = {
  name: '',
  guard_name: '',
  active: ''
}
import { store } from 'src/store'
import { getCookie } from 'cookies-next'

const state = store.getState()

const RolesEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)

  const [rows, setRows] = useState([])
  const [permissionsIds, setPermissionsIds] = useState([])
  const [guardName, setGuardName] = useState('')

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setLoading(true)

    const { permissions, editable, id, slug, ...rest } = data
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}roles/${id}`,
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

  const fetchRolesDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}roles/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const data = res.data.data.items
          if (data.editable == 1) {
            setValue('active', data.active)
            setValue('name', data.active)

            setPermissionsIds(data.permissions)
            reset(data)
            setValue('guard_name', data.slug)
            setGuardName(data.slug)
          } else {
            router.push('/roles')
          }
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message)
          }
        })
    } else {
      router.push('/404')
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}permissions`, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
        }
      })

      setRows(response.data.data.items)
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchPermissions()

    if (id) {
      fetchRolesDetails()
    }
  }, [id])

  return (
    <Card>
      <RolesEditForm
        guardName={guardName}
        getValues={getValues}
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

export default RolesEdit
