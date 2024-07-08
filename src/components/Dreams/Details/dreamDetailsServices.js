import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../../../store'
import { getCookie } from 'cookies-next'

const state = store.getState()

export const fetchDreamDetails = async id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/${id}/show`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)

    return null
  }
}

export const fetchDreamComments = async id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/${id}/comments`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchExperts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}experts`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchExpertsChangingHistory = async id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/${id}/experts-history`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const assignExpert = async (dreamId, expertId) => {
  let data = {
    expert_id: expertId
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}dreams/${dreamId}/assign-expert`, data, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
    toast.success(t('success'))
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const changeStatus = async (dreamId, statusId) => {
  let data = {
    status_id: statusId
  }

  try {
    await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}dreams/${dreamId}/change-status`, data, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
