// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import PushMessagesDetails from 'src/components/push_messages/Details/PushMessagesDetails'
import { fetchPushMessagesDetails } from 'src/components/push_messages/Details/PushMessagesServices'

const PushMessagesListDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchPushMessagesDetails', id],
    queryFn: () => fetchPushMessagesDetails(id),
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
        <PushMessagesDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default PushMessagesListDetails
