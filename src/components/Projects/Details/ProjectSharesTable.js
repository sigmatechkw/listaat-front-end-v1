import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Icon from '../../../@core/components/icon'
import SnackbarConfirmActions from 'src/components/Shared/SnackbarConfirmActions'
import { deleteProjectShares } from 'src/components/ProjectShares/ProjectSharesServices'
import ProjectSharesRowOptions from 'src/components/ProjectShares/ProjectSharesRowOptions'

const ProjectSharesTable = ({
  data,
  fetchData,
}) => {
  const { t } = useTranslation()
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjectShares([selectedRowId]).then(res => {
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
      field: 'email',
      headerName: t('email'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.email}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'project_id',
      headerName: t('project'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.project?.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'permission',
      headerName: t('permissions'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.permission}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'sender_user_id',
      headerName: t('sender_user'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.sender_user?.first_name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'receiver_user_id',
      headerName: t('receiver_user'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.receiver_user?.first_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'is_send',
      headerName: t('is_sent'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_sent ? (
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
      field: 'is_accepted',
      headerName: t('is_accepted'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_accepted ? (
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
      field: 'is_a_copy',
      headerName: t('is_a_copy'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_a_copy ? (
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
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => <ProjectSharesRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('project_shares')} />
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

export default ProjectSharesTable
