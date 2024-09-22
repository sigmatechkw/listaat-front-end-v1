import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/router'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'


const ProjectTabTypesDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Typography variant={'h3'} sx={{ px: 3, pt: 3 }}>
            {t('project_tab_types')}
          </Typography>
        

            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {type.image && (
                <CustomAvatar
                  src={type.image}
                  variant='rounded'
                  alt={type.name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              )}
              </CardContent>

          <CardContent>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('description')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('hint')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.hint}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('sort')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.sort}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('is_active')}:</Typography>
              {type.active ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('created_at')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.created_at}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/project-tab-types/edit/${type.id}`)}>
              {t('edit')}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectTabTypesDetails
