import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {fetchDreamsStatistics} from "./dreamsServices";
import CustomPieChartCard from "../Shared/CustomPieChartCard";
import CustomLoader from "../Shared/CustomLoader";
import Grid from "@mui/material/Grid";


const DreamsStatistics = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDreamsStatistics().then(res => {
      setStatistics(res)
      setLoading(false)
    })
  }, [])

  return (
    loading ?
      <CustomLoader />
    :
      <Grid sx={{ mb: 3 }} container spacing={6}>
        <Grid item xs={12} md={4} lg={4}>
          <CustomPieChartCard
            title={t('dreams_types')}
            color={theme.palette.success.main}
            labels={Object.keys(statistics.dream_types)}
            values={Object.values(statistics.dream_types)}
            total={statistics.all_dreams}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomPieChartCard
            title={t('dreams_statuses')}
            color={theme.palette.success.main}
            labels={Object.keys(statistics.dream_statuses)}
            values={Object.values(statistics.dream_statuses)}
            total={statistics.all_dreams}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomPieChartCard
            title={t('open_pending_dreams')}
            color={theme.palette.success.main}
            labels={[t('open_dreams'), t('pending_dreams')]}
            values={[statistics.open_dreams, statistics.pending_dreams]}
            total={statistics.open_dreams + statistics.pending_dreams}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomPieChartCard
            title={t('late_dreams')}
            color={theme.palette.success.main}
            labels={[t('late_dreams')]}
            values={[statistics.late_dreams]}
          />
      </Grid>
    </Grid>
  )
}

export default DreamsStatistics
