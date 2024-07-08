import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import PromoCodesForm from 'src/components/promo_codes/PromoCodesForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  code: '',
  start_date: new Date(),
  end_date: new Date().setDate(new Date().getDate() + 1),
  first_order_only: '',
  min_order_amount: '',
  max_applied_amount: '',
  amount: '',
  applied_users_type: ''
}

const PromoCodesCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [showUsersSelect, setShowUsersSelect] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [active, setActive] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues
  } = useForm({ defaultValues })

  const formatDate = dateString => {
    const date = new Date(dateString)

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Use 24-hour format
    }).format(date)

    // Manually construct the "Y-m-d H:i:s" format
    const [datePart, timePart] = formattedDate.split(', ') // Split date and time parts
    const [month, day, year] = datePart.split('/').map(part => part.padStart(2, '0')) // Ensure leading zeros
    const [hour, minute, second] = timePart.split(':').map(part => part.padStart(2, '0')) // Ensure leading zeros

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  const fetchUsers = async (search, filtered) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users?${search ? 'search=' + search : ''}`, {
      params: {
        filters: { role: 2 }
      },
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    if (!filtered) {
      const ids = selectedUsers.map(user => user.id)
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setUsers(filteredUsers)
    } else {
      const ids = filtered
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setUsers(filteredUsers)
    }
  }

  const checkIfStartDateGreater = (startDateString, endDateString) => {
    const parseDateString = dateString => {
      const [datePart, timePart] = dateString.split(' ')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hour, minute, second] = timePart.split(':').map(Number)

      return new Date(year, month - 1, day, hour, minute, second)
    }

    // Parse the date strings to Date objects
    const endDate = parseDateString(endDateString)
    const startDate = parseDateString(startDateString)

    // Check if start date is after end date
    return startDate > endDate
  }

  const onSubmit = data => {
    setLoading(true)

    if (checkIfStartDateGreater(formatDate(data.start_date), formatDate(data.end_date))) {
      setLoading(false)
      toast.error('end date must be date after start date')
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_KEY}promo-codes`,
          {
            ...data,
            ...(showUsersSelect && { users: selectedUsers.map(u => u.id) }),
            applied_users_type: data.applied_users_type.id,
            start_date: formatDate(data.start_date),
            end_date: formatDate(data.end_date),
            usage_type: data.usage_type.id,
            promo_type: data.promo_type.id,
            active: +active
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
          router.push('/promo_codes')
          reset()
        })
        .catch(error => {
          setLoading(false)
          toast.error(error.response.data.message)
        })
    }
  }

  return (
    <Card>
      <PromoCodesForm
        getValues={getValues}
        active={active}
        setActive={setActive}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        showUsersSelect={showUsersSelect}
        setShowUsersSelect={setShowUsersSelect}
        fetchUsers={fetchUsers}
        users={users}
        setUsers={setUsers}
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('promo_codes')}
        loading={loading}
      />
    </Card>
  )
}

export default PromoCodesCreate
