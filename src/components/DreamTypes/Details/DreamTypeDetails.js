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
import {deleteDreamTypes} from "../dreamTypesServices";
import Icon from "../../../@core/components/icon";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const DreamTypeDetails = ({ type }) => {
  const {t} = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteDreamTypes([type.id]).then(res => {
      toast.success(t('success'));
      setOpenDeleteSnackbar(false)
      router.replace('/dream-types')
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
          <Typography variant={'h3'} sx={{ px: 3, pt: 3 }}>{t('dream_type')}</Typography>
          <CardContent>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('name')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('price')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.price} {t('kwd')}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('waiting_for_approve_time')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.waiting_for_approve_time} {type.waiting_for_approve_time ? type.waiting_for_approve_time === 1 ? t('minute') : t('minutes') : ''}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('waiting_for_response_time')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.waiting_for_response_time} {type.waiting_for_response_time ? type.waiting_for_response_time === 1 ? t('minute') : t('minutes') : ''}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('letters_limit')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.letters_limit}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('audio_limit')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.audio_limit} {type.audio_limit ? type.audio_limit === 1 ? t('minute') : t('minutes') : ''}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('special_flag')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.special_flag}</Typography>
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('is_public')}:</Typography>
              {
                type.public ?
                  <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                  :
                  <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
              }
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('is_fast')}:</Typography>
              {
                type.fast ?
                  <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                  :
                  <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
              }
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('is_active')}:</Typography>
              {
                type.active ?
                  <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                  :
                  <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
              }
            </Box>
            <Box sx={{display: 'flex', mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('created_at')}:</Typography>
              <Typography sx={{color: 'text.secondary'}}>{type.created_at}</Typography>
            </Box>
            <Box sx={{mb: 3}}>
              <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('notes')}:</Typography>
              <List sx={{mx: 8, listStyleType: 'disc'}}>
                {
                  type.notes && type.notes.length > 0 &&
                    type.notes.map(note => (
                      <ListItem key={note.id} sx={{display: 'list-item', p: 0}}>
                        <ListItemText>{note.text}</ListItemText>
                      </ListItem>
                    ))
                }
              </List>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/dream-types/edit/${type.id}`)}>
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

export default DreamTypeDetails
