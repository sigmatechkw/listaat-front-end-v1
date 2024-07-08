// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import { useTranslation } from 'react-i18next'

import { useQueryClient } from '@tanstack/react-query'
import { Button, CardActions, CardContent, Icon, Typography } from '@mui/material'
import Badge from 'src/@core/components/mui/badge'

const PaymentsDetails = ({ data }) => {
  /*   const queryClient = useQueryClient()
  const { t } = useTranslation()
  const {id , label , value} = data */

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          ddddddd
          {/*          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.primary', borderBottom: '1px solid #3d4158', pb: 3, textTransform: 'uppercase' ,  fontSize: '1.5rem' }}>
              {t('sms_methods_details')}
            </Typography>

            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('id')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{id}</Typography>
                
       
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('label')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{label }</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('value')}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{value }</Typography>
              </Box>
        
            </Box>
          </CardContent> */}
        </Card>
      </Grid>
    </Grid>
  )
}

export default PaymentsDetails
