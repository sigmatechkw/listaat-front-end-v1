import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import CustomLoader from "../Shared/CustomLoader";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {fetchPaymentMethods} from "./transactionsServices";

const TransactionsFilters = ({ paid, setPaid, method,  setMethod }) => {
  const {t} = useTranslation()
  const [methods, setMethods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPaymentMethods().then(res => {
      setMethods(res)
      setLoading(false)
    })
  }, []);

  const handlePaidChange = (e) => {
    setPaid(e.target.value)
  }

  const handleMethodChange = (e) => {
    setMethod(e.target.value)
  }

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
                defaultValue={t('is_paid')}
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
              <CustomTextField
                select
                fullWidth
                defaultValue={t('select_payment_method')}
                SelectProps={{
                  value: method,
                  displayEmpty: true,
                  onChange: handleMethodChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setMethod('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('select_payment_method')}</MenuItem>
                {
                  methods.length > 0 &&
                  methods.map(method => (
                    <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default TransactionsFilters
