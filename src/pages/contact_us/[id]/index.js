// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchContactUsDetails } from 'src/components/contact_us/Details/ContactUsDetailsServices'
import ContactUsDetails from 'src/components/contact_us/Details/ContactUsDetails'

const ContactUsDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchContactUsDetails', id],
    queryFn: () => fetchContactUsDetails(id),
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
        <ContactUsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default ContactUsDetailsPage
