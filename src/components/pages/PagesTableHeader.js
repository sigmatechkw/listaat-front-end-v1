import React from 'react'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const PagesTableHeader = props => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Box
      sx={{
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CustomTextField
          value={props.value}
          placeholder={t('search')}
          onChange={props.onChange}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon fontSize='1.25rem' icon='tabler:search' />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon fontSize='1.25rem' icon='tabler:x' />
              </IconButton>
            )
          }}
          sx={{
            mr: 3,
            width: {
              xs: 1,
              sm: 'auto'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
        <Button onClick={() => router.push('/main_pages/create')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {t('add')}
        </Button>
      </Box>
    </Box>
  )
}

export default PagesTableHeader
