import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {fetchDateRanges, fetchUsersRoles, fetchUsersStatistics} from "./userListServices";
import CustomPieChartCard from "../../Shared/CustomPieChartCard";
import CustomLoader from "../../Shared/CustomLoader";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const UsersStatistics = () => {
  const theme = useTheme()
  const {t} = useTranslation()
  const [statistics, setStatistics] = useState([])
  const [roles, setRoles] = useState([])
  const [dateRanges, setDateRanges] = useState(null);
  const [dateRange, setDateRange] = useState('all');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDateRanges().then(res => {
      setDateRanges(res)
    })
  }, []);

  useEffect(() => {
    fetchUsersStatistics(dateRange).then(res => {
      setStatistics(res)
      fetchUsersRoles().then(result => {
        setRoles(result)
        setLoading(false)
      })
    })
  }, [dateRange]);

  return (
    loading ?
      <CustomLoader/>
      :
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <InputLabel id="demo-select-small-label">{t('date_range')}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={dateRange}
              label={t('date_range')}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value={'all'}>{t('all')}</MenuItem>
              {
                dateRanges &&
                Object.keys(dateRanges).map(range => (
                  <MenuItem key={range} value={range}>
                    {dateRanges[range]}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Grid sx={{mb: 3}} container spacing={6}>
            <Grid item xs={12} md={4} lg={4}>
              <CustomPieChartCard
                title={t('role')}
                color={theme.palette.success.main}
                labels={roles?.filter(role => role.id !== 1).map(role => t(role.name))}
                values={[statistics.users, statistics.experts]}
                total={statistics.all_items}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <CustomPieChartCard
                title={t('active')}
                color={theme.palette.success.main}
                labels={[t('active'), t('inactive')]}
                values={[statistics.active, statistics.in_active]}
                total={statistics.all_items}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default UsersStatistics
