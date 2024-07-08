import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchExperts} from "../Dreams/Details/dreamDetailsServices";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import CustomAutocomplete from "../../@core/components/mui/autocomplete";
import CustomLoader from "../Shared/CustomLoader";

const ExpertTransactionsFilters = ({ paid, setPaid, expert, setExpert, disableExpertFilter }) => {
  const {t} = useTranslation()

  const {isPending: expertsIsPending, data: experts, error: expertsError} = useQuery({
    queryKey: ['fetchExperts'],
    queryFn: fetchExperts,
  })

  const handlePaidChange = (e) => {
    setPaid(e.target.value)
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={t('filters')} />
      <CardContent>
        {
          expertsIsPending ?
            <CustomLoader />
          :
            <Grid container spacing={6}>
              <Grid item xs={12} md={3} lg={3}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue={''}
                  SelectProps={{
                    value: paid,
                    displayEmpty: true,
                    onChange: handlePaidChange,
                    endAdornment: (
                      <IconButton sx={{ mx: 2 }} onClick={() => setPaid('')}>
                        <Icon icon={'tabler:circle-x'} />
                      </IconButton>
                    )
                  }}
                >
                  <MenuItem value={''}>{t('is_paid')}</MenuItem>
                  <MenuItem value={1}>{t('yes')}</MenuItem>
                  <MenuItem value={0}>{t('no')}</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <CustomAutocomplete
                  autoHighlight
                  sx={{ mb: 6 }}
                  id='experts-list'
                  disabled={disableExpertFilter}
                  options={experts}
                  ListboxComponent={List}
                  getOptionLabel={option => option.full_name || ''}
                  value={expert || null}
                  onChange={(e, newValue) => {
                    setExpert(newValue)
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={params => (
                    <CustomTextField {...params} placeholder={t('choose_expert')} />
                  )}
                  renderOption={(props, expert) => (
                    <ListItem {...props}>
                      <ListItemAvatar>
                        <Avatar src={expert.image} alt={expert.full_name} sx={{ height: 28, width: 28 }} />
                      </ListItemAvatar>
                      <ListItemText primary={expert.full_name} />
                    </ListItem>
                  )}
                />
              </Grid>
            </Grid>
        }
      </CardContent>
    </Card>
  )
}

export default ExpertTransactionsFilters
