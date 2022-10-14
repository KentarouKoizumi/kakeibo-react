import { Box, Select, TextField, Button, Typography, MenuItem, InputLabel, FormControl, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import axios from 'axios'
import { useMediaQuery } from '@mui/material';

import { updateContext, LoadingContext } from '../App';


interface FormInput {
  category: string,
  name: string,
  price: Number,
  memo?: string
}

export default function InputForm() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const { register, handleSubmit, reset } = useForm<FormInput>()
  const { updateDatas } = useContext(updateContext)
  const { setNowLoadingEntries, setNowLoadingStatistics } = useContext(LoadingContext)
  const [ nowUploading, setNowUploading ] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setNowUploading(true)
    setNowLoadingEntries(true)
    setNowLoadingStatistics(true)
    data.price = Number(data.price)
    await axios.post("https://asia-northeast1-tonal-land-364800.cloudfunctions.net/post-data", data)
    .then(async () => {
      await updateDatas()
      setNowUploading(false)
      reset({ category: 'food', name: '', price: 0, memo: '' })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <>
      <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
        購入を追加
      </Typography>
      <Box sx={{ height: "1em"}}></Box>
      {!isMobile ? (
      <Grid container spacing={2}>
        <Grid xs={2}>
          <FormControl sx={{ width:"100%", minWidth:"6em" }}>
            <InputLabel id="input-categoy">カテゴリー</InputLabel>
            <Select
              labelId='input-category'
              label="カテゴリー"
              sx={{ width: "100%" }}
              defaultValue={"food"}
              {...register("category")}
              >
              <MenuItem value={"food"}>食事</MenuItem>
              <MenuItem value={"game"}>ゲーム</MenuItem>
              <MenuItem value={"life"}>生活</MenuItem>
              <MenuItem value={"hobby"}>趣味</MenuItem>
              <MenuItem value={"others"}>その他</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={8}>
          <TextField
            required
            label="商品名"
            sx={{ width: "100%"}}
            {...register("name", {required: true, maxLength: 100})}
          >
            
          </TextField>
        </Grid>
        <Grid xs={2}>
          <TextField
            required
            label="値段"
            sx={{ width: "100%"}}
            type="number"
            {...register("price", {required: true})}
          >
          </TextField>
        </Grid>
        <Grid xs={11}>
          <TextField
            label="備考"
            sx={{ width: "100%"}}
            {...register("memo")}
          >
          </TextField>
        </Grid>
        <Grid xs={1}>
          <Button
            variant="contained"
            sx={{ width: "100%", height:"100%"}}
            disabled={nowUploading}
            onClick={handleSubmit(onSubmit)}
          >SUBMIT
          </Button>
        </Grid>
      </Grid>
      ) : (
        <Stack spacing={2}>
          <FormControl sx={{ width:"100%", minWidth:"6em" }}>
            <InputLabel id="input-categoy">カテゴリー</InputLabel>
            <Select
              labelId='input-category'
              label="カテゴリー"
              sx={{ width: "100%" }}
              defaultValue={"food"}
              {...register("category")}
              >
              <MenuItem value={"food"}>食事</MenuItem>
              <MenuItem value={"game"}>ゲーム</MenuItem>
              <MenuItem value={"life"}>生活</MenuItem>
              <MenuItem value={"hobby"}>趣味</MenuItem>
              <MenuItem value={"others"}>その他</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            label="商品名"
            sx={{ width: "100%"}}
            {...register("name", {required: true, maxLength: 100})}
          />
          <TextField
            required
            label="値段"
            sx={{ width: "100%"}}
            type="number"
            {...register("price", {required: true})}
          />
          <TextField
            label="備考"
            sx={{ width: "100%"}}
            {...register("memo")}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", height:"100%"}}
            disabled={nowUploading}
            onClick={handleSubmit(onSubmit)}
          >SUBMIT
          </Button>
        </Stack>
      )}
    </>
  )
}