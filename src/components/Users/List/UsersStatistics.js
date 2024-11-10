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
      console.log(res);
      setStatistics(res)
      fetchUsersRoles().then(result => {
        setRoles(result)
        console.log(roles.filter(role => role.id !== 1).map(role => t(role.name)));
        setLoading(false)
      })
    })
  }, [dateRange]);

  return (
    loading ?
      <CustomLoader/>
      :
      c
  )
}

export default UsersStatistics
