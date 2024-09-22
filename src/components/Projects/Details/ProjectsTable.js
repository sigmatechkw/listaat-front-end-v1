import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import Icon from '../../../@core/components/icon';
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material';
import {useRouter} from "next/router";

const ProjectsTable = ({
  data,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleView = (id) => {
    router.push(`/projects/details/${id}`)
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
      field: 'name',
      headerName: t('name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'budget',
      headerName: t('budget'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.budget}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'total_cost',
      headerName: t('total_cost'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.total_cost}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'area',
      headerName: t('area'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.area}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'length',
      headerName: t('length'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.length}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'width',
      headerName: t('width'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.width}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'height',
      headerName: t('height'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.height}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'project_type',
      headerName: t('project_type'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.project_type.name}
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
      minWidth: 120,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => (
        <IconButton
            color="secondary"
            onClick={() => handleView(row.id)}>
            <Icon icon='tabler:eye' fontSize={20}/>
        </IconButton>
      )
    },
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('sub_projects')} />
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

export default ProjectsTable
