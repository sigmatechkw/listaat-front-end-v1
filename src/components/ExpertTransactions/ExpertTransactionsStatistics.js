import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import CustomLoader from "../Shared/CustomLoader";
import Grid from "@mui/material/Grid";
import {fetchExpertsTransactionsStatistics} from "./ExpertTransactionsServices";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";
import Card from "@mui/material/Card";


const ExpertTransactionsStatistics = ({expertId}) => {
  const theme = useTheme()
  const {t} = useTranslation()
  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpertsTransactionsStatistics(expertId).then(res => {
      setStatistics(res)
      setLoading(false)
    })

  }, [expertId]);

  return (
    loading ?
      <CustomLoader />
    :
      <Grid sx={{ mb: 3 }} container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{t('paid_count')}</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{statistics.paid_transactions_count}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  {t('transactions')}
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color={'success'} sx={{ width: 38, height: 38 }}>
                <Icon icon={'tabler:currency-dollar'} fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{t('not_paid_count')}</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{statistics.not_paid_transactions_count}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  {t('transactions')}
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color={'error'} sx={{ width: 38, height: 38 }}>
                <Icon icon={'tabler:currency-dollar-off'} fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{t('paid_amount')}</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{statistics.paid_transactions_amount}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  {t('kwd')}
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color={'success'} sx={{ width: 38, height: 38 }}>
                <Icon icon={'tabler:brand-cashapp'} fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{t('not_paid_amount')}</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{statistics.not_paid_transactions_amount}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  {t('kwd')}
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color={'error'} sx={{ width: 38, height: 38 }}>
                <Icon icon={'tabler:brand-cashapp'} fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default ExpertTransactionsStatistics
