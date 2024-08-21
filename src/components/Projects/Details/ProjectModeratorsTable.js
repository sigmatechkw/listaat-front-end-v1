import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";
import Icon from '../../../@core/components/icon'

const ProjectModeratorsTable = ({
  data,
}) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleView = (id) => {
    router.push(`/users/${id}`)
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
    {
      flex: 0.175,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => 
        <IconButton
          color="secondary"
          onClick={() => handleView(row.id)}>
          <Icon icon='tabler:eye' fontSize={20}/>
        </IconButton>
    }
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
