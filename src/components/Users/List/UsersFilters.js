import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import CustomLoader from "../../Shared/CustomLoader";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../../@core/components/mui/text-field";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import MenuItem from "@mui/material/MenuItem";
import {fetchUsersRoles} from "./userListServices";
import {GENDER} from "../../../constants/constants";

const UsersFilters = ({ role, setRole, active, setActive, gender, setGender }) => {
  const {t} = useTranslation()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsersRoles().then(res => {
      setRoles(res)
      setLoading(false)
    })
  }, []);

  return (
    loading ?
      <CustomLoader />
      :
      <Card sx={{ mb: 3 }}>
        <CardHeader title={t('filters')} />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('select_role')}
                SelectProps={{
                  value: role,
                  displayEmpty: true,
                  onChange: (e) => setRole(e.target.value),
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setRole('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('select_role')}</MenuItem>
                {
                  roles?.length > 0 &&
                  roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('active')}
                SelectProps={{
                  value: active,
                  displayEmpty: true,
                  onChange: (e) => setActive(e.target.value),
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setActive('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('active')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
                <MenuItem value={0}>{t('no')}</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('select_gender')}
                SelectProps={{
                  value: gender,
                  displayEmpty: true,
                  onChange: (e) => setGender(e.target.value),
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setGender('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('select_gender')}</MenuItem>
                {
                  Object.keys(GENDER).map(gender => (
                    <MenuItem key={gender} value={gender}>{GENDER[gender]}</MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default UsersFilters
