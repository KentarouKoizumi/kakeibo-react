import { Container, Box, Typography, Paper, Stack } from '@mui/material'
import { useMediaQuery } from '@mui/material';
import {Helmet, HelmetProvider} from 'react-helmet-async'
import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

import InputForm from './components/InputForm'
import ShowEntries from './components/ShowEntries'
import ShowStatistics from './components/ShowStatistics'


type Entry = {
  category: string,
  name: string,
  price: number,
  memo: string,
  id: string,
  createdAt: {_seconds: number, _nanoseconds: number},
}

export const MonthContext = createContext({} as {
  month: number[], setMonth: React.Dispatch<React.SetStateAction<number[]>>
})
export const EntriesContext = createContext({} as {
  entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
})
export const StatisticsContext = createContext({} as {
  statistics: number[], setStatistics: React.Dispatch<React.SetStateAction<number[]>>
})
export const updateContext = createContext({} as {
  updateDatas: () => void
})

const App = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const now = new Date()
  const [ month, setMonth ] = useState<number[]>([now.getFullYear(), now.getMonth() + 1])
  const [entries, setEntries] = useState<Entry[]>([])
  const [statistics, setStatistics] = useState<number[]>([])
  const url = "https://asia-northeast1-tonal-land-364800.cloudfunctions.net"

  const updateDatas = async () => {
    await axios
      .post(`${url}/get-month-statistics`, {year: month[0], month: month[1]})
      .then((res) => {
        setStatistics(res.data.totals)
      })
      .catch((err) => {
        console.log(err)
      })
    await axios
      .post(`${url}/get-month-datas`, {year: month[0], month: month[1]})
      .then((res) => {
        setEntries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios
      .post(url + "/get-month-statistics", {year: month[0], month: month[1]})
      .then((res) => {
        setStatistics(res.data.totals)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .post(url + "/get-month-datas", {year: month[0], month: month[1]})
      .then((res) => {
        setEntries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [month])
  return (
    <>
      <HelmetProvider>
      <Helmet>
        <title>KakeiBO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>📝</text></svg>"/>
      </Helmet>
      </HelmetProvider>
      <Container maxWidth="xl">
        { !isMobile && <Box sx={{ height: "6vh" }}/> }
        <Stack spacing={2}>
        <Paper sx={{ width: "100%", p:`${!isMobile ? "2em" : "1em" }` }} elevation={3}>
          <StatisticsContext.Provider value={{statistics, setStatistics}}>
            <MonthContext.Provider value={{month, setMonth}}>
              <ShowStatistics />
            </MonthContext.Provider>
          </StatisticsContext.Provider>
        </Paper>
        <Paper sx={{ width: "100%", p:`${!isMobile ? "2em" : "1em" }` }} elevation={3} >
          <updateContext.Provider value={{updateDatas}}>
            <InputForm></InputForm>
          </updateContext.Provider>
        </Paper>
        <Paper sx={{ width: "100%", p:`${!isMobile ? "2em" : "1em" }` }} elevation={3}>
          <Typography variant='h5' sx={{ textDecoration: 'underline' }}>
            履歴
          </Typography>
          <EntriesContext.Provider value={{entries, setEntries}}>
            <MonthContext.Provider value={{month, setMonth}}>
            <updateContext.Provider value={{updateDatas}}>
              <ShowEntries />
            </updateContext.Provider>
            </MonthContext.Provider>
          </EntriesContext.Provider>
        </Paper>
        </Stack>
      </Container>
    </>
  )
}

export default App
