import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import { Card } from '@mui/material'

export default function Comments({ comments }) {
  const { t } = useTranslation()

  const columns = [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: t('id'),
      field: 'id'
    },
    {
      flex: 0.4,
      minWidth: 80,
      field: 'comment',
      headerName: t('comment'),
      field: 'comment'
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'likes',
      headerName: t('likes'),
      field: 'likes'
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'control',
      headerName: t('control'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.user.full_name}
        </Typography>
      )
    }
  ]

  return (
    <div>
      <Card>
        <CustomDataGrid rows={comments} columns={columns} total={comments.length} multiSelection={false} />
      </Card>
    </div>
  )
}
