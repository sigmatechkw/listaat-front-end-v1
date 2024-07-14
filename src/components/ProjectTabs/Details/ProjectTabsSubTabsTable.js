import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Icon from '../../../@core/components/icon'
import Snackbar from '@mui/material/Snackbar'
import SnackbarConfirmActions from 'src/components/Shared/SnackbarConfirmActions'
import { deleteProjectTabs } from '../projectTabsServices'
import ProjectTabsRowOptions from '../ProjectTabsRowOptions'
const ProjectTabsSubTabsTable = ({
  data,
  fetchData,
}) => {
  const { t } = useTranslation()
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjectTabs([selectedRowId]).then(res => {
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const handleClickDeleteButton = id => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false)
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: t('id'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'name',
      headerName: t('name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'user',
      headerName: t('user'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.user?.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'is_default',
      headerName: t('is_default'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_default ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'is_dimensional_info',
      headerName: t('is_dimensional_info'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_dimensional_info ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 130,
      field: 'is_text_info',
      headerName: t('is_text_info'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_text_info ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 130,
      field: 'is_numerical',
      headerName: t('is_numerical'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_numerical ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 130,
      field: 'is_details',
      headerName: t('is_details'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_details ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 130,
      field: 'is_breakdown',
      headerName: t('is_breakdown'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_breakdown ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'active',
      headerName: t('is_active'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.active ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'created_at',
      headerName: t('created_at'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.created_at}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => <ProjectTabsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('sub_tabs')} />
        <CustomDataGrid 
          rows={data}
          columns={columns}
          total={data.length}
          paginationModel={{perPage: 12 , page: 1}}
          multiSelection={false}
        />
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
      </Card>
  )
}

export default ProjectTabsSubTabsTable
