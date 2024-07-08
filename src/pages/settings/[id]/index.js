// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchSettingsDetails } from 'src/components/Settings/Details/settingsDetailsServices'
import SettingsDetails from 'src/components/Settings/Details/SettingsDetails'

const SettingDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchSettingsDetails', id],
    queryFn: () => fetchSettingsDetails(id),
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
        <SettingsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default SettingDetails
