import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

const DreamTypesFilters = ({ isActive, setIsActive, isPublic, setIsPublic }) => {
  const {t} = useTranslation()

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value)
  }

  const handleIsPublicChange = (e) => {
    setIsPublic(e.target.value)
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
              defaultValue={t('is_public')}
              SelectProps={{
                value: isPublic,
                displayEmpty: true,
                onChange: handleIsPublicChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsPublic('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_public')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DreamTypesFilters
