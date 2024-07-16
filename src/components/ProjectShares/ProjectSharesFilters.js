import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

const ProjectSharesFilters = ({ isCopy, setIsCopy , isAccepted , setIsAccepted , isSent , setIsSent}) => {
  const {t} = useTranslation()

  const handleisCopyChange = (e) => {
    setIsCopy(e.target.value)
  }
  const handleisAcceptedChange = (e) => {
    setIsAccepted(e.target.value)
  }
  const handleisSentChange = (e) => {
    setIsSent(e.target.value)
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
              defaultValue={t('is_sent')}
              SelectProps={{
                value: isSent,
                displayEmpty: true,
                onChange: handleisSentChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsSent('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_sent')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <CustomTextField
              select
              fullWidth
              defaultValue={t('is_a_copy')}
              SelectProps={{
                value: isCopy,
                displayEmpty: true,
                onChange: handleisCopyChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsCopy('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_a_copy')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <CustomTextField
              select
              fullWidth
              defaultValue={t('is_accepted')}
              SelectProps={{
                value: isAccepted,
                displayEmpty: true,
                onChange: handleisAcceptedChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsAccepted('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_accepted')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectSharesFilters