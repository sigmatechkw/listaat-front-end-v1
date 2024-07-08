// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchSmsMethodsDetails } from 'src/components/sms_methods/Details/SmsMethodsServices'
import SmsMethodsDetails from 'src/components/sms_methods/Details/SmsMethodsDetails'

const SmsMethodsDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchSmsMethodsDetails', id],
    queryFn: () => fetchSmsMethodsDetails(id),
    enabled: !!id
  })

  if (isPending) {
    return <CustomLoader />
  }

  if (error) {
    toast.error(error.response.data.message)
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SmsMethodsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default SmsMethodsDetailsPage
