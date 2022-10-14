import { Box, Typography, Stack, IconButton, Table, TableBody, TableRow, TableCell } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useMediaQuery } from '@mui/material';

import { useContext } from 'react';
import { MonthContext } from '../App';
import { StatisticsContext } from '../App';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

export default function ShowStatistics() {
  const {month, setMonth} = useContext(MonthContext);
  const previousMonth = () => {
    if (month[1] === 1) {
      setMonth([month[0] - 1, 12])
    } else {
      setMonth([month[0], month[1] - 1])
    }
  }
  const nextMonth = () => {
    if (month[1] === 12) {
      setMonth([month[0] + 1, 1])
    } else {
      setMonth([month[0], month[1] + 1])
    }
  }

  const isMobile = useMediaQuery('(max-width:600px)');

  const {statistics, setStatistics} = useContext(StatisticsContext);
  const categoryColors:{[key: string]: string} = {
    '食費': '#34a853',
    'ゲーム': '#4285f4',
    '生活': '#fabb05',
    '趣味': '#e94235',
    'その他': '#d9d9d9',
  }
  const categories = ['食費', 'ゲーム', '生活', '趣味', 'その他']
  const colors = ['#34a853', '#4285f4', '#fabb05', '#e94235', '#d9d9d9']

  const data = {
    labels: categories,
    datasets: [
      {
        label: '支出',
        data: statistics,
        backgroundColor: colors,
      },
    ],
  };
  const options = {
    responsive: true,
    cutout: "90%",
    // borderRadius: 45,
    radius: "80%",
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <>
      <Grid container spacing={0} alignItems="center" direction="column">
        <Grid>
          <Typography>
            {month[0]}年
          </Typography>
        </Grid>
        <Grid>
        <Stack direction="row">
          <IconButton onClick={ previousMonth }>
            <NavigateBeforeIcon />
          </IconButton>
            <Typography variant="h5">
              {month[1]}月
            </Typography>
          <IconButton onClick={ nextMonth }>
            <NavigateNextIcon />
          </IconButton>
        </Stack>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction={ isMobile ? "column" : "row"} spacing={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ position: "relative" }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", textDecoration:"underline", position: "absolute", top:"50%", left: "50%", transform: "translateY(-50%) translateX(-50%)" }}>
              ￥ {statistics.reduce((a, b) => a + b, 0).toLocaleString()}
            </Typography>
            <Doughnut
              options={options}
              data={data}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Table>
              <TableBody>
                {statistics.map((statistic, index) => (
                  <TableRow key={categories[index]}>
                    <TableCell>
                      <Stack direction="row">
                        <Box sx={{
                          width: "0.5em",
                          height: "1.5em",
                          backgroundColor: categoryColors[categories[index]],
                        }}/>
                        <Box sx={{
                          width: "0.5em",
                          height: "1.5em",
                        }}/>
                        <Typography>
                          {categories[index]}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        ￥ {statistic.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {/* <TableRow>
                  <TableCell>
                    <Typography>
                      食費
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      1000円
                    </Typography>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>

          </Box>
        </Stack>
      </Box>
      <Box sx={{height: "3em"}}/>
    </>
  )
}