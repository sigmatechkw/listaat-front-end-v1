import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deleteProjects } from '../projectsServices'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ProjectModeratorsTable from './ProjectModeratorsTable'
import ProjectParentTable from './ProjectParentTable'
import ProjectTabsSubTabsTable from 'src/components/ProjectTabs/Details/ProjectTabsSubTabsTable'
import ProjectItemGroupsTable from './ProjectItemGroupsTable'
import ProjectFoldersTable from './ProjectFoldersTable'
import ProjectItemsTable from './ProjectItemsTable'
import ProjectSharesTable from './ProjectSharesTable'

const ProjectDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjects([type.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/projects')
    })
  }

  const handleClickDeleteButton = () => {
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h3" sx={{ px: 3, pt: 3 }}>
              {t('projects')}
            </Typography>
            <CardContent>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('budget')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.budget}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('total_cost')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.total_cost}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('area')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.area}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('length')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('width')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.width}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('height')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.height}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('project_type')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.project_type.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('notes')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.notes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('is_active')}:</Typography>
                {type.active ? (
                  <Icon icon="tabler:circle-check" color="green" fontSize="1.5rem" />
                ) : (
                  <Icon icon="tabler:xbox-x" color="red" fontSize="1.5rem" />
                )}
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('created_at')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{type.created_at}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="tonal" sx={{ mr: 2 }} onClick={() => router.push(`/projects/edit/${type.id}`)}>
                {t('edit')}
              </Button>
              <Button color="error" variant="tonal" onClick={handleClickDeleteButton}>
                {t('delete')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <ProjectModeratorsTable data={type.moderators} />
        </Grid>

        {type.parent && 
        <Grid item xs={12}>
          <ProjectParentTable data={[type.parent]} />
        </Grid>
        }

        <Grid item xs={12}>
          <ProjectTabsSubTabsTable data={type.project_tabs} />
        </Grid>

        <Grid item xs={12}>
          <ProjectItemGroupsTable data={type.item_groups} />
        </Grid>

        <Grid item xs={12}>
          <ProjectItemsTable data={type.items} />
        </Grid>
        
        <Grid item xs={12}>
          <ProjectFoldersTable data={type.folders} />
        </Grid>

        <Grid item xs={12}>
          <ProjectSharesTable data={type.project_shares} />
        </Grid>

      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </>
  );
};


export default ProjectDetails
