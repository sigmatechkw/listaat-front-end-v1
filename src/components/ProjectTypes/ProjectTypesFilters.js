import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

const ProjectTypesFilters = ({ isActive, setIsActive, isShouldHasSubTabs, setIsShouldHasSubTabs }) => {
  const {t} = useTranslation()

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value)
  }

  const handleShouldHasSubTabsChange = (e) => {
    setIsShouldHasSubTabs(e.target.value)
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={t('filters')} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} lg={3}>
            <CustomTextField
              select
              fullWidth
              defaultValue={t('is_active')}
              SelectProps={{
                value: isActive,
                displayEmpty: true,
                onChange: handleIsActiveChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsActive('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_active')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <CustomTextField
              select
              fullWidth
              defaultValue={t('should_has_sub_tabs')}
              SelectProps={{
                value: isShouldHasSubTabs,
                displayEmpty: true,
                onChange: handleShouldHasSubTabsChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => isShouldHasSubTabs('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('should_has_sub_tabs')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectTypesFilters
