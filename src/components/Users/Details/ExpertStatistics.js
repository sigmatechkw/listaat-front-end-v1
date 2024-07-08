import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {fetchExpertStatistics} from "./userDetailsServices";
import CustomStatisticsCard from "../../Shared/CustomStatisticsCard";
import {getCookie} from "cookies-next";

const ExpertStatistics = ({userId}) => {
  const {t} = useTranslation()
  const [expertStatistics, setExpertStatistics] = useState(null)

  useEffect(() => {
    fetchExpertStatistics(userId).then(res => {
      setExpertStatistics(res)
    })
  }, []);

  return (
    <>
      {
        expertStatistics &&
          <Grid container spacing={2} sx={{my: 6}}>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("total_dreams")}
                value={expertStatistics.total_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:sum'}
                iconColor={'info'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("pending")}
                value={expertStatistics.pending_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:loader'}
                iconColor={'secondary'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("accepted")}
                value={expertStatistics.accepted_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:check'}
                iconColor={'primary'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("rejected")}
                value={expertStatistics.rejected_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:ban'}
                iconColor={'error'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("in_progress")}
                value={expertStatistics.in_progress_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:progress'}
                iconColor={'warning'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomStatisticsCard
                title={t("done")}
                value={expertStatistics.done_dreams}
                subTitle={getCookie('lang') === 'en' ? t('dreams') : ''}
                icon={'tabler:circle-check'}
                iconColor={'success'}
              />
            </Grid>
            {/*<Grid item xs={12} sx={{my: 6}}>*/}
            {/*  <CustomPieChartCard*/}
            {/*     title={t('expert_statistics')}*/}
            {/*     color={theme.palette.success.main}*/}
            {/*     labels={Object.keys(expertStatistics)}*/}
            {/*     values={Object.values(expertStatistics)}*/}
            {/*     total={expertStatistics.total_dreams}*/}
            {/*   />*/}
            {/*</Grid>*/}
          </Grid>
      }
    </>
  )
}

 export default ExpertStatistics
