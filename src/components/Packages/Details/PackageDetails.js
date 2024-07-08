import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import SnackbarConfirmActions from "../../Shared/SnackbarConfirmActions";
import Snackbar from "@mui/material/Snackbar";
import {deletePackages} from "../packagesServices";
import Icon from "../../../@core/components/icon";
import Box from "@mui/material/Box";

const PackageDetails = ({ packageDetails }) => {
  const {t} = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deletePackages([packageDetails.id]).then(res => {
      toast.success(t('success'));
      setOpenDeleteSnackbar(false)
      router.replace('/packages')
    })
  }

  const handleClickDeleteButton = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Typography variant={'h3'} sx={{ px: 3, pt: 3 }}>{t('package')}</Typography>
          <CardContent>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('name')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('description')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.description}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('price')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.price} {t('kwd')}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('balance')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.balance} {t('kwd')}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('discount')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.discount} {t('kwd')}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('order')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.order}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('is_active')}:</Typography>
              {
                packageDetails.active ?
                  <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                  :
                  <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
              }
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('created_at')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{packageDetails.created_at}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/packages/edit/${packageDetails.id}`)}>
              {t('edit')}
            </Button>
            <Button color='error' variant='tonal' onClick={handleClickDeleteButton}>
              {t('delete')}
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </Grid>
  )
}

export default PackageDetails
