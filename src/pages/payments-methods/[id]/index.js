// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchPaymentsDetails } from 'src/components/payments/Details/paymentsServices'
import PaymentsDetails from 'src/components/payments/Details/PaymentsDetails'

const PaymentsListDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchPaymentsDetails', id],
    queryFn: () => fetchPaymentsDetails(id),
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
        <PaymentsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default PaymentsListDetails
