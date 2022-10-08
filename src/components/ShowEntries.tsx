import { useContext } from 'react';
import { MonthContext, EntriesContext } from '../App';
import axios from 'axios';
import { Table, TableCell, TableRow, TableBody, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { useMediaQuery } from '@mui/material';



export default function ShowEntries() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const {month, setMonth} = useContext(MonthContext);
  const {entries, setEntries} = useContext(EntriesContext);

  const categoriesTrans:{[key: string]: string} = {
    'food': '食費',
    'game': 'ゲーム',
    'life': '生活',
    'hobby': '趣味',
    'others': 'その他',
  }
  const categoryColors:{[key: string]: string} = {
    'food': '#34a853',
    'game': '#4285f4',
    'life': '#fabb05',
    'hobby': '#e94235',
    'others': '#d9d9d9',
  }

  const deleteData = (id: string) => {
    axios
      .post("https://asia-northeast1-tonal-land-364800.cloudfunctions.net/delete-data", {id: id})
      .then((res) => {
        axios
          .post("https://asia-northeast1-tonal-land-364800.cloudfunctions.net/get-month-datas", {year: month[0], month: month[1]})
          .then((res) => {
            setEntries(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Table>
      <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="body1">
                  {new Date(entries[0].createdAt._seconds * 1000).getMonth() + 1}/{new Date(entries[0].createdAt._seconds * 1000).getDate()}
                </Typography>
              </TableCell>
              <TableCell align="left">
                { isMobile ? (
                  <Stack direction="row">
                    <Box sx={{
                      width: "0.5em",
                      height: "1.5em",
                      backgroundColor: categoryColors[entry.category],
                    }}/>
                    <Box sx={{
                      width: "0.5em",
                      height: "1.5em",
                    }}/>
                    <Typography variant="body1">
                      {entry.name}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography variant="body1">
                    {entry.name}
                  </Typography>
                )}
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell align="right">
                    <Stack direction="row">
                      <Box sx={{
                        width: "0.5em",
                        height: "1.5em",
                        backgroundColor: categoryColors[entry.category],
                      }}/>
                      <Box sx={{
                        width: "0.5em",
                        height: "1.5em",
                      }}/>
                      <Typography variant="body1">
                        {categoriesTrans[entry.category]}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                    <TableCell align="right">
                      <Typography variant="body1">
                        {entry.memo}
                      </Typography>
                    </TableCell>
                </>
              )}
              <TableCell align="right">
                <Typography variant="body1">
                  ￥{entry.price.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={ ()=>deleteData(entry.id) }>
                  <DeleteIcon sx={{ color: red.A700 }}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}