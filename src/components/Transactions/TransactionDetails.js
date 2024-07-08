import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Icon from "../../@core/components/icon";
import {useTranslation} from "react-i18next";
import {CardContent, Typography} from '@mui/material';
import Link from "next/link";


const TransactionDetails = ({data}) => {
  const {t} = useTranslation()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{pb: 4}}>
            <Typography variant='body2' sx={{
              color: 'text.primary',
              borderBottom: '1px solid #3d4158',
              pb: 3,
              textTransform: 'uppercase',
              fontSize: '1.5rem'
            }}>
              {t('transaction_details')}
            </Typography>

            <Box sx={{pt: 4}}>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('id')}:</Typography>
                <Typography sx={{color: 'text.secondary'}}>{data.id}</Typography>
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('dream')}:</Typography>
                <Link href={`/dreams/${data.payable_id}`} target={'_blank'} className={'link'}>{data.payable_id}</Link>
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('user')}:</Typography>
                <Link href={`/users/${data.user?.id}`} target={'_blank'} className={'link'}>{data.user?.full_name}</Link>
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('amount')}:</Typography>
                <Typography sx={{color: 'text.secondary'}}>{data.amount} {t('kwd')}</Typography>
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('paid')}:</Typography>
                {
                  data.paid ?
                    <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                  :
                    <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
                }
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('created_at')}:</Typography>
                <Typography sx={{color: 'text.secondary'}}>{data.created_at}</Typography>
              </Box>
              <Box sx={{display: 'flex', mb: 3}}>
                <Typography sx={{mr: 2, fontWeight: 500, color: 'text.secondary'}}>{t('payment_method')}:</Typography>
                <Typography sx={{color: 'text.secondary'}}>{data.method?.name}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TransactionDetails
