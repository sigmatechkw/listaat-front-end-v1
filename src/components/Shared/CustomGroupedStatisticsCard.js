import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";

const CustomGroupedStatisticsCard = ({ title, subTitle, data }) => {
  return (
    <Card>
      <CardHeader
        title={title}
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {subTitle}
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {
            data.map((item, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' color={item.color} sx={{ mr: 4, width: 42, height: 42 }}>
                    <Icon icon={item.icon} fontSize='1.5rem' />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{item.total}</Typography>
                    <Typography variant='body2'>{item.title}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomGroupedStatisticsCard
