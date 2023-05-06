import { Box, Typography, TextField, MenuItem, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { otherFeature } from '~/app/otherFeature';
import { GetListEmployee, totalEmployeeCount } from '~/app/redux/actions/employeeActions';

const Pagination = React.forwardRef((props, ref) => {
  const { type } = props;
  const dispatch = useDispatch();
  const [pagi, setPagi] = useState(10);
  const [size, setSize] = useState(1);
  const [text, setText] = useState(1);
  const [disBack, setDisBack] = useState(false);
  const [disForward, setDisForward] = useState(false);
  const total = useSelector((state) => state?.employee?.total);
  const max = Math.floor((total * 10) / pagi) + 1;

  const handleChange = (e) => {
    setPagi(e.target.value);
  };

  const handleChangeSizePage = (value) => {
    setSize(value);
  };

  const handleChangeText = (value) => {
    if (value === 1) {
      if (text <= 1) {
        setDisBack(true);
      }
      setSize(size - 1);
      setText(text - 1);
    } else {
      if (text >= max) {
        setDisForward(true);
      }
      setDisBack(false);
      setSize(size + 1);
      setText(text + 1);
    }
  };

  useEffect(() => {
    dispatch(GetListEmployee({ type, RowsPerPage: pagi, pageSize: text }));
    dispatch(totalEmployeeCount(type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagi, text]);

  return (
    <Box width="100%" overflow="auto" display={'flex'} justifyContent={'space-between'} padding={2}>
      <Box width="250px" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography>Số lượng bản ghi/trang</Typography>
        <TextField size="small" type="number" select value={pagi} onChange={handleChange}>
          {otherFeature.page.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box width="400px" display={'flex'} alignItems={'center'}>
        <IconButton disabled={disBack} onClick={() => handleChangeText(1)}>
          <ArrowBackIosIcon color="var(--primay)" fontSize="small" />
        </IconButton>
        <Typography marginRight={1}>Trang</Typography>
        <TextField
          size="small"
          type="number"
          sx={{ width: '110px' }}
          fullWidth
          value={size}
          inputProps={{ min: 1, max: 100 }}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > max) value = max;
            if (value < 1) value = 1;
            handleChangeSizePage(value);
          }}
          onKeyDown={(e) => {
            let value = Number(e.target.value);
            if (e.key === 'Enter') {
              setText(value);
            }
          }}
        />
        <Typography marginLeft={1}>
          trong số
          <Typography marginLeft={1} marginRight={1} sx={{ color: 'var(--primary)', display: 'inline-block' }}>
            {Math.floor(total / pagi) + 1}
          </Typography>
          trang
        </Typography>
        <IconButton disabled={disForward} onClick={() => handleChangeText(2)}>
          <ArrowForwardIosIcon color="var(--primay)" fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
});

export default Pagination;
