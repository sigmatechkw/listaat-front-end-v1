import React from 'react'
import Box from '@mui/material/Box'
/* import CustomTextField from 'src/@core/components/mui/text-field'; */
import Icon from 'src/@core/components/icon'
/* import IconButton from "@mui/material/IconButton"; */
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const RolesTableHeader = props => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Box
      sx={{
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button onClick={() => router.push('/roles/create')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {t('add')}
        </Button>
      </Box>
    </Box>
  )
}

export default RolesTableHeader
