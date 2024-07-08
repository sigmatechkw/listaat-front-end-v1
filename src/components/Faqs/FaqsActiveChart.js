import React, {useEffect, useState} from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import {useTheme} from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import axios from 'axios'
import toast from 'react-hot-toast'
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import {useQuery} from "@tanstack/react-query";
import {fetchDreamDetails} from "../Dreams/Details/dreamDetailsServices";
import {fetchFaqStatistics} from "./FaqsServices";
import {fetchDateRanges} from "../Users/List/userListServices";

const donutColors = {
  series2: '#00d4bd',
  series5: '#ffa1a1'
}

const FaqsActiveChart = ({dateRange, setDateRange}) => {
  const theme = useTheme()
  const {t, i18n} = useTranslation()
  const [chartKey,  setChartKey] = useState(0)

  const {isPending: dateRangesIsPending, data: dateRanges, error: dateRangesError} = useQuery({
    queryKey: ['fetchDateRanges'],
    queryFn: () => fetchDateRanges(),
  })

  const {isPending, data: chartData, error} = useQuery({
    queryKey: ['fetchFaqStatistics', dateRange],
    queryFn: () => fetchFaqStatistics(dateRange),
    enabled: !!dateRange,
  })

  const options = {
    stroke: {width: 0},
    labels: [t('active'), t('inactive')],
    colors: [donutColors.series2, donutColors.series5],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: {offsetX: -3},
      labels: {colors: theme.palette.text.secondary},
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: t('faqs'),
              formatter: () => chartData.all_items,
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  useEffect(() => {
    if (chartData) {
      setChartKey(prev => prev + 1)
    }
  }, [isPending, chartData]);

  return (
    <Card>
      <CardHeader
        title={t('statistics')}
        // subheader='Spending on various categories'
        // subheaderTypographyProps={{sx: {color: theme => `${theme.palette.text.disabled} !important`}}}
      />
      <CardContent>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">{t('date_range')}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={dateRange}
            label={t('date_range')}
            onChange={(e) => setDateRange(e.target.value)}
          >
            {/*<MenuItem value="">*/}
            {/*  <em>None</em>*/}
            {/*</MenuItem>*/}
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
        <Box sx={{
          minHeight: 300
        }}>
          {
            !isPending ?
              chartData &&
              <ReactApexcharts key={chartKey} type='donut' height={300} options={options}
                               series={[chartData.active, chartData.in_active]}/>
            :
              <CircularProgress />
          }
        </Box>
      </CardContent>
    </Card>
  )
}

export default FaqsActiveChart
