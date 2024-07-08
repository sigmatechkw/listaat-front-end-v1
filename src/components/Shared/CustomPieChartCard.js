import {hexToRGBA} from "../../@core/utils/hex-to-rgba";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReactApexcharts from "../../@core/components/react-apexcharts";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const CustomPieChartCard = ({ title, color, labels, values, total = 0 }) => {
  const theme = useTheme()
  const {t} = useTranslation()

  const colors = labels?.map(label => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    return hexToRGBA(randomColor, 0.5)
  })

  const options = {
    colors: colors,
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: labels,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: true,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              formatter: val => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h2.fontSize
            },
            total: {
              show: true,
              label: t('total'),
              value: 40,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h5.fontSize,
              formatter: function (w) {
                if (total) {
                  return total
                } else {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 200, height: 249 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 150, height: 199 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Box sx={{ gap: 1.75, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant='h5' sx={{ mb: 0.5 }}>
                {title}
              </Typography>
            </div>
          </Box>
          <ReactApexcharts type='donut' width={150} height={165} series={values} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CustomPieChartCard
