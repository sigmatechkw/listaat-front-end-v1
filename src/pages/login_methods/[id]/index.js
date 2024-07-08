// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoginMethodsDetails from 'src/components/login_methods/Details/LoginMethodsDetails'
import { fetchLoginMethodsDetails } from 'src/components/login_methods/Details/LoginMethodsServices'

const LoginMethodsListDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchLoginMethodsDetails', id],
    queryFn: () => fetchLoginMethodsDetails(id),
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
        <LoginMethodsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default LoginMethodsListDetails
