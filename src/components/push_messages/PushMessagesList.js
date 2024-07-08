import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import PushMessagesTableHeader from './PushMessagesTableHeader'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deletePushMessage } from './fetchPushMessagesService'
import toast from 'react-hot-toast'

const PushMessagesList = ({
  data,
  search,
  setSearch,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  method,
  setMethod,
  fetchData
}) => {
  const { t } = useTranslation()
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const router = useRouter()
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleClickDeleteButton = id => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false)
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deletePushMessage(id).then(res => {
      toast.success(t('success'))
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const RowOptions = ({ id, handleClickDeleteButton }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/push_messages/${id}`)
    }

    const handleDelete = (e, id) => {
      e.stopPropagation()
      setSelectedRowId(id)
      handleClickDeleteButton(id)
    }

    return (
      <>
        <IconButton color='secondary' onClick={e => handleView(e, id)}>
          <Icon icon='tabler:eye' fontSize={20} />
        </IconButton>

        <IconButton color='error' onClick={e => handleDelete(e, id)}>
          <Icon icon='tabler:trash' fontSize={20} />
        </IconButton>
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: t('id'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'title',
      headerName: t('title')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'body',
      headerName: t('body')
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'control',
      headerName: t('control'),
      renderCell: ({ row }) => <RowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  return (
    <div>
      <Card>
        <CardHeader title={t('push_messages')} />
        <CustomDataGrid
          toolbar={PushMessagesTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => setSearch(event.target.value),
            selectedRows: rowSelectionModel,
            fetchData: fetchData
          }}
          rows={data.items}
          columns={columns}
          total={data.total}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          multiSelection={false}
        />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openDeleteSnackbar}
          onClose={handleCloseDeleteSnackbar}
          message={t('are_you_sure')}
          action={
            <SnackbarConfirmActions
              handleConfirm={e => handleDelete(e, selectedRowId)}
              handleClose={handleCloseDeleteSnackbar}
            />
          }
        />
      </Card>
    </div>
  )
}

export default PushMessagesList
