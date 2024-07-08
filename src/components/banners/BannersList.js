import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import { Avatar, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import BannersTableHeader from './BannersTableHeader'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deleteBanner } from './fetchBannersService'
import toast from 'react-hot-toast'

const BannersList = ({
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

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const router = useRouter()

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
    deleteBanner([selectedRowId]).then(res => {
      toast.success(t('success'))
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const RowOptions = ({ id, handleClickDeleteButton }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/banners/${id}`)
    }

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/banners/edit/${id}`)
    }

    const handleDelete = e => {
      e.stopPropagation()
      handleClickDeleteButton(id)
    }

    return (
      <>
        <IconButton color='secondary' onClick={e => handleView(e, id)}>
          <Icon icon='tabler:eye' fontSize={20} />
        </IconButton>
        <IconButton color='warning' onClick={e => handleEdit(e, id)}>
          <Icon icon='tabler:edit' fontSize={20} />
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
      flex: 0.3,
      minWidth: 80,
      field: 'name',
      headerName: t('name')
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'type',
      headerName: t('type')
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'clicks',
      headerName: t('clicks')
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'views',
      headerName: t('views')
    },
    /*     {
      flex: 0.250,
      minWidth: 120,
      field: 'image_ios',
      headerName: t('banner'),
      renderCell: ({row}) => (
        <Avatar
        alt={row.name}
        src= {row.image_ios ? row.image_ios : '/images/avatars/1.png'}
        sx={{ width: 60, height: 40, borderRadius: 0 }}
      />
      )
    }, */
    {
      flex: 0.125,
      minWidth: 80,
      field: 'active',
      headerName: t('active'),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.active == 1 ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
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
        <CardHeader title={t('banners')} />

        <CustomDataGrid
          toolbar={BannersTableHeader}
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
          multiSelection={true}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openDeleteSnackbar}
          onClose={handleCloseDeleteSnackbar}
          message={t('are_you_sure')}
          action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
        />
      </Card>
    </div>
  )
}

export default BannersList
