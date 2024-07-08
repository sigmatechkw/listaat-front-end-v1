import Grid from "@mui/material/Grid";
import CustomGroupedStatisticsCard from "../Shared/CustomGroupedStatisticsCard";
import {useTranslation} from "react-i18next";

const OnlineUsersStatistics = ({data = {}}) => {
  const {t} = useTranslation();

  const last24HoursOnlineUsers = [
    {
      title: t('total'),
      total: data?.last_24_hours_online_users?.total,
      icon: 'tabler:sum',
      color: 'primary',
    },
    {
      title: t('ios'),
      total: data?.last_24_hours_online_users?.ios,
      icon: 'tabler:brand-apple',
      color: 'error',
    },
    {
      title: t('android'),
      total: data?.last_24_hours_online_users?.android,
      icon: 'tabler:brand-android',
      color: 'success',
    }
  ]

  const last48HoursOnlineUsers = [
    {
      title: t('total'),
      total: data?.last_48_hours_online_users?.total,
      icon: 'tabler:sum',
      color: 'primary',
    },
    {
      title: t('ios'),
      total: data?.last_48_hours_online_users?.ios,
      icon: 'tabler:brand-apple',
      color: 'error',
    },
    {
      title: t('android'),
      total: data?.last_48_hours_online_users?.android,
      icon: 'tabler:brand-android',
      color: 'success',
    }
  ]

  const currentOnlineUsers = [
    {
      title: t('total'),
      total: data?.current_online_users?.total,
      icon: 'tabler:sum',
      color: 'primary',
    },
    {
      title: t('ios'),
      total: data?.current_online_users?.ios,
      icon: 'tabler:brand-apple',
      color: 'error',
    },
    {
      title: t('android'),
      total: data?.current_online_users?.android,
      icon: 'tabler:brand-android',
      color: 'success',
    }
  ]

  const last7DaysOnlineUsers = [
    {
      title: t('total'),
      total: data?.last_7_days_online_users?.total,
      icon: 'tabler:sum',
      color: 'primary',
    },
    {
      title: t('ios'),
      total: data?.last_7_days_online_users?.ios,
      icon: 'tabler:brand-apple',
      color: 'error',
    },
    {
      title: t('android'),
      total: data?.last_7_days_online_users?.android,
      icon: 'tabler:brand-android',
      color: 'success',
    }
  ]

  const last28DaysOnlineUsers = [
    {
      title: t('total'),
      total: data?.last_28_days_online_users?.total,
      icon: 'tabler:sum',
      color: 'primary',
    },
    {
      title: t('ios'),
      total: data?.last_28_days_online_users?.ios,
      icon: 'tabler:brand-apple',
      color: 'error',
    },
    {
      title: t('android'),
      total: data?.last_28_days_online_users?.android,
      icon: 'tabler:brand-android',
      color: 'success',
    }
  ]

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <CustomGroupedStatisticsCard title={t('last_24_hours_online_users')} data={last24HoursOnlineUsers} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomGroupedStatisticsCard title={t('last_48_hours_online_users')} data={last48HoursOnlineUsers} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomGroupedStatisticsCard title={t('current_online_users')} data={currentOnlineUsers} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomGroupedStatisticsCard title={t('last_7_days_online_users')} data={last7DaysOnlineUsers} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomGroupedStatisticsCard title={t('last_28_days_online_users')} data={last28DaysOnlineUsers} />
      </Grid>
    </Grid>
  )
}

export default OnlineUsersStatistics
