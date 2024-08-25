import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import Icon from '../../../@core/components/icon';
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material';
import {useRouter} from "next/router";

const SubProjectTypeTable = ({
  data,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleView = (id) => {
    router.push(`/project-types/details/${id}`)
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
      field: 'filter_name',
      headerName: t('filter_name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.filter_name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 100,
      field: 'should_has_sub_tabs',
      headerName: t('should_has_sub_tabs'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.should_has_sub_tabs ? (
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
      minWidth: 100,
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
        <CardHeader title={t('project_types')} />
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

export default SubProjectTypeTable
