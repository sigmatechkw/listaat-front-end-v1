import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { deleteProjectTypes } from '../projectsServices'

const ProjectModeratorsTable = ({
  data,
  fetchData,
}) => {
  const { t } = useTranslation()
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDelete = () => {
    deleteProjectTypes([selectedRowId]).then(res => {
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
      flex: 0.1,
      minWidth: 120,
      field: 'first_name',
      headerName: t('first_name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.first_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'last_name',
      headerName: t('last_name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.last_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'email',
      headerName: t('email'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.email}
        </Typography>
      )
    },
    // {
    //   flex: 0.175,
    //   minWidth: 140,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: t('actions'),
    //   renderCell: ({ row }) => <ProjectsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    // }
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('users')} />
        <CustomDataGrid 
          rows={data}
          columns={columns}
          total={data.length}
          paginationModel={{perPage: 12 , page: 1}}
          multiSelection={false}
        />
      </Card>
  )
}

export default ProjectModeratorsTable
