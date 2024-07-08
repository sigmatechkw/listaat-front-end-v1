import {forwardRef, useEffect, useState} from 'react'
import Fade from '@mui/material/Fade'
import {styled, useTheme} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import toast from 'react-hot-toast'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomLoader from '../../Shared/CustomLoader'
import CustomAutocomplete from '../../../@core/components/mui/autocomplete'
import List from '@mui/material/List'
import CustomTextField from '../../../@core/components/mui/text-field'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CustomChip from '../../../@core/components/mui/chip'
import {fetchDreamsStatuses} from '../dreamsServices'
import {changeStatus} from './dreamDetailsServices'
import {DREAM_STATUS} from "../../../constants/constants";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({theme}) => ({
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

const DreamChangeStatusDialog = ({dreamId, currentStatus, show, setShow}) => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const {t} = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    isPending,
    data: statuses,
    error
  } = useQuery({
    queryKey: ['fetchDreamsStatuses'],
    queryFn: fetchDreamsStatuses,
    enabled: show,
    refetchOnWindowFocus: false
  })

  const handleChangeStatus = () => {
    if (selectedStatus) {
      setLoading(true)
      changeStatus(dreamId, selectedStatus.id).then(res => {
        toast.success(t('success'))
        queryClient.invalidateQueries({ queryKey: ['fetchDreamDetails'] })
        setShow(false)
        setLoading(false)
      })
    } else {
      toast.error(t('please_select_expert'))
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isPending) {
      setSelectedStatus(statuses.find(status => status.id === currentStatus))
    }
  }, [isPending])

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
        sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem'/>
          </CustomCloseButton>
          <Box sx={{mb: 4, textAlign: 'center'}}>
            <Typography variant='h3' sx={{mb: 3}}>
              {t('change_status')}
            </Typography>
          </Box>
          {
            isPending ?
              <CustomLoader/>
              :
              <>
                <CustomAutocomplete
                  autoHighlight
                  sx={{mb: 6}}
                  id='statuses-list'
                  options={statuses}
                  ListboxComponent={List}
                  getOptionLabel={option => option.name || ''}
                  value={selectedStatus}
                  onChange={(e, newValue) => {
                    setSelectedStatus(newValue)
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={params => (
                    <CustomTextField {...params} label={t('change_status')} placeholder={t('select_status')}/>
                  )}
                  renderOption={(props, status) => (
                    <ListItem {...props} key={status.id}>
                      <ListItemText primary={status.name}/>
                    </ListItem>
                  )}
                  getOptionDisabled={(option, value) => option.id === 7}
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
                    onClick={handleChangeStatus}
                    disabled={loading || !selectedStatus}
                  >
                    {t('change_status')}
                  </Button>
                </Box>
              </>
          }
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DreamChangeStatusDialog
