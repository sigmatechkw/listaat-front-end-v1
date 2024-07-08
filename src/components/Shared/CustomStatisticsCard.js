import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";
import Card from "@mui/material/Card";

const CustomStatisticsCard = ({title, value, subTitle = '', icon = 'tabler:zzz', iconColor = 'success'}) => {
  return (
    <Card>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4'>{value}</Typography>
          </Box>
          <Typography variant='h6' sx={{ color: 'text.secondary' }}>
            {subTitle}
          </Typography>
        </Box>
        <CustomAvatar skin='light' variant='rounded' color={iconColor} sx={{ width: 38, height: 38 }}>
          <Icon icon={icon} fontSize={24} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default CustomStatisticsCard
