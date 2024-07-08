// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchPromosDetails } from 'src/components/promo_codes/Details/promosDetailsServices'
import PromoCodesDetails from 'src/components/promo_codes/Details/PromoCodesDetails'

const SettingDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchPromosDetails', id],
    queryFn: () => fetchPromosDetails(id),
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
        <PromoCodesDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default SettingDetails
