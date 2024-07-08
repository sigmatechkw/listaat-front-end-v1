// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomChip from '../../../@core/components/mui/chip'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { assignExpert, fetchExperts, fetchExpertsChangingHistory } from './dreamDetailsServices'
import toast from 'react-hot-toast'
import Divider from '@mui/material/Divider'
import CustomLoader from '../../Shared/CustomLoader'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const DreamAssignExpertDialog = ({ dreamId, show, setShow }) => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    isPending: expertsIsPending,
    data: experts,
    error: expertsError
  } = useQuery({
    queryKey: ['fetchExperts'],
    queryFn: fetchExperts,
    enabled: show
  })

  const {
    isPending: expertsHistoryIsPending,
    data: expertsHistory,
    error: expertsHistoryError
  } = useQuery({
    queryKey: ['fetchExpertsHistory'],
    queryFn: () => fetchExpertsChangingHistory(dreamId),
    enabled: show
  })

  const handleAssignExpert = () => {
    if (selectedExpert) {
      setLoading(true)
      assignExpert(dreamId, selectedExpert.id).then(res => {
        queryClient.invalidateQueries({ queryKey: ['fetchExpertsHistory'] })
        setLoading(false)
      })
    } else {
      toast.error(t('please_select_expert'))
      setLoading(false)
    }
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              {t('assign_expert')}
            </Typography>
          </Box>
          {expertsIsPending || expertsHistoryIsPending ? (
            <CustomLoader />
          ) : (
            <>
              <CustomAutocomplete
                autoHighlight
                sx={{ mb: 6 }}
                id='experts-list'
                options={experts}
                ListboxComponent={List}
                getOptionLabel={option => option.full_name || ''}
                value={selectedExpert}
                onChange={(e, newValue) => {
                  setSelectedExpert(newValue)
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <CustomTextField {...params} label={t('assign_expert')} placeholder={t('choose_expert')} />
                )}
                renderOption={(props, expert) => (
                  <ListItem {...props}>
                    <ListItemAvatar>
                      <Avatar src={expert.image} alt={expert.full_name} sx={{ height: 28, width: 28 }} />
                    </ListItemAvatar>
                    <ListItemText primary={expert.full_name} />
                  </ListItem>
                )}
              />
              <Box
                sx={{
                  rowGap: 2,
                  columnGap: 4,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'end',
                  mb: 4
                }}
              >
                <Button
                  variant='contained'
                  color={'success'}
                  onClick={handleAssignExpert}
                  disabled={loading || !selectedExpert}
                >
                  {t('assign_expert')}
                </Button>
              </Box>
              <Divider />
              <Typography variant='h4' sx={{ mt: 4 }}>
                {t('experts_change_history')}
              </Typography>
              <List
                dense
                sx={{
                  mb: 3,
                  '& .MuiListItemText-primary': {
                    ...theme.typography.body1,
                    fontWeight: 500,
                    color: 'text.secondary'
                  },
                  '& .MuiListItemText-secondary': {
                    ...theme.typography.body1,
                    fontWeight: 500,
                    color: 'text.disabled'
                  }
                }}
              >
                {expertsHistory.map(history => {
                  return (
                    <ListItem key={history.id} sx={{ px: 0, py: 2, display: 'flex', justifyContent: 'space-between' }}>
                      {history.from_expert ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                          <ListItemAvatar>
                            <Avatar
                              src={history.from_expert?.image}
                              alt={history.from_expert?.full_name}
                              sx={{ height: 38, width: 38 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ m: 0 }}
                            primary={history.from_expert?.full_name}
                            secondary={history.from_expert?.email}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ height: 38, width: 38 }} />
                          </ListItemAvatar>
                          <ListItemText sx={{ m: 0 }} primary={t('none')} />
                        </Box>
                      )}
                      <Box sx={{ flex: 1 }}>
                        <CustomChip skin={'light'} label={t('to')} color={'success'} />
                      </Box>
                      {history.to_expert ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                          <ListItemAvatar>
                            <Avatar
                              src={history.to_expert?.image}
                              alt={history.to_expert?.full_name}
                              sx={{ height: 38, width: 38 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ m: 0 }}
                            primary={history.to_expert?.full_name}
                            secondary={history.to_expert?.email}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ height: 38, width: 38 }} />
                          </ListItemAvatar>
                          <ListItemText sx={{ m: 0 }} primary={t('none')} />
                        </Box>
                      )}
                    </ListItem>
                  )
                })}
              </List>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DreamAssignExpertDialog
