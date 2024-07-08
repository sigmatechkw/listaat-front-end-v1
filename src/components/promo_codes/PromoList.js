import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import PromoTableHeader from './PromoTableHeader'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deletePromo } from './fetchPromosService'
import toast from 'react-hot-toast'

const PromoList = ({
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
    deletePromo(id).then(res => {
      toast.success(t('success'))
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const RowOptions = ({ id, handleClickDeleteButton }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/promo_codes/${id}`)
    }

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/promo_codes/edit/${id}`)
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
      flex: 0.25,
      minWidth: 120,
      field: 'name',
      headerName: t('name')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'code',
      headerName: t('code'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
          {row.code}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'promo_type',
      headerName: t('promo type'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
          {row.promo_type.name}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'amount',
      headerName: t('amount'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
          {row.amount}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'usage_type',
      headerName: t('usage type'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
          {row.usage_type.name}
        </Typography>
      )
    },
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

    /*     {
      flex: 0.250,
      minWidth: 80,
      field: 'dream',
      headerName: t('value'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary', textAlign: 'center'}}>
          {row.value ? row.value : '-'}
        </Typography>
      )
    }, */
  ]

  const handleSearch = value => {
    setSearchValue(value)
  }

  return (
    <div>
      <Card>
        <CardHeader title={t('promo_codes')} />

        <CustomDataGrid
          toolbar={PromoTableHeader}
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

export default PromoList
