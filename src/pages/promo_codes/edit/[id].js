import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PromosEditForm from 'src/components/promo_codes/PromosEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  name_ar: '',
  name_en: '',
  first_order_only: '',
  description_ar: '',
  description_en: '',
  code: '',
  start_date: null,
  end_date: null,
  min_order_amount: '',
  max_applied_amount: '',
  amount: '',
  applied_users_type: '',
  usage_type: '',
  promo_type: '',
  active: ''
}

const PromosEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [promoTypes, setPromoTypes] = useState([])
  const [promoUsageType, setPromoUsageType] = useState([])
  const [appliedUsersTypes, setAppliedUsersTypes] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState([])
  const [active, setActive] = useState([])
  const [showUsersSelect, setShowUsersSelect] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    fetchPromoTypes()
  }, [])

  const fetchUsers = async (search, filtered) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users${search ? '?search=' + search : ''}`, {
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

    //setUsers(response.data.data.items)
  }

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const fetchPromoTypes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}getPromoCodeTypes`, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? 'en'
        }
      })
      .then(res => {
        const formatedAppliedUsers = res.data.data.items.promo_user_type.map(item => {
          return {
            id: item.id,
            label: item.name
          }
        })

        setAppliedUsersTypes(formatedAppliedUsers)

        setPromoTypes(res.data.data.items.promo_type)
        setPromoUsageType(res.data.data.items.promo_usage_type)
        fetchPromosDetails(res.data.data.items, formatedAppliedUsers)
      })
  }

  const formatToOriginalDate = date => {
    const [datePart, timePart] = date.split(' ')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute] = timePart.split(':').map(Number)

    return new Date(year, month - 1, day, hour, minute)
  }

  const fetchPromosDetails = (pt, appliedUsers) => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}promo-codes/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const data = res.data.data.promo
          console.log(res.data.data.promo.start_date)
          //console.log(formatToOriginalDate(res.data.data.promo.start_date))
          setValue('start_date', formatToOriginalDate(res.data.data.promo.start_date))
          setValue('end_date', formatToOriginalDate(res.data.data.promo.end_date))

          setEndDate(formatToOriginalDate(res.data.data.promo.end_date))

          setStartDate(formatToOriginalDate(res.data.data.promo.start_date))

          setSelectedUsers(data.users)

          const { promo_type, active, usage_type, applied_users_type, ...rest } = data

          const selectedPromoType = pt.promo_type
            .filter(p => p.id == data.promo_type)
            .map(i => {
              return {
                id: JSON.stringify(i.id),
                name: i.name
              }
            })[0]

          const selectedUsageType = pt.promo_usage_type
            .filter(p => p.id == data.usage_type)
            .map(i => {
              return {
                id: JSON.stringify(i.id),
                name: i.name
              }
            })[0]

          //console.log('valueeeeeee' ,  data.applied_users_type)
          //console.log(appliedUsers)

          const selectedAppliedUser = appliedUsers.filter(p => p.id == data.applied_users_type)[0]

          setShowUsersSelect(selectedAppliedUser.id == 2)

          //if (selectedAppliedUser.id == 2) {
          fetchUsers(
            false,
            data.users.map(i => i.id)
          )
          //}
          //console.log('valueeeeeee11111' , selectedAppliedUser.id)
          setActive(active)
          reset({
            ...rest,
            promo_type: selectedPromoType,
            usage_type: selectedUsageType,
            applied_users_type: selectedAppliedUser
          })
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

  const checkIfStartDateGreater = (startDateString, endDateString) => {
    // Function to parse date string to Date object
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
    const { promo_type, usage_type, start_date, end_date, applied_users_type, ...rest } = data

    if (getValues('applied_users_type').id == 2 && selectedUsers.length == 0) {
      toast.error('users field is required')
      setLoading(false)
    } else if (checkIfStartDateGreater(formatDate(startDate), formatDate(endDate))) {
      setLoading(false)
      toast.error('end date must be date after start date')
    } else {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_KEY}promo-codes/${id}`,
          {
            ...rest,
            promo_type: promo_type.id,
            usage_type: usage_type.id,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            applied_users_type: applied_users_type.id,
            ...(showUsersSelect && { users: selectedUsers.map(user => user.id) }),
            active: +active
          },
          {
            headers: {
              Authorization: getCookie('token'),
              'Accepted-Language': getCookie('lang') ?? 'en'
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
      <PromosEditForm
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
        setUsers={setUsers}
        getValues={getValues}
        active={active}
        setActive={setActive}
        showUsersSelect={showUsersSelect}
        setShowUsersSelect={setShowUsersSelect}
        fetchUsers={fetchUsers}
        users={users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        appliedUsersTypes={appliedUsersTypes}
        promoTypes={promoTypes}
        promoUsageType={promoUsageType}
        type={'edit'}
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

export default PromosEdit
