import {
  Typography,
  Box,
  FormControlLabel,
  Select,
  MenuItem,
  InputBase,
  RadioGroup,
  Checkbox,
  Radio,
  FormGroup,
  Button,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { wastes } from './wastes';

const useStyles = makeStyles({
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  select: {
    width: '100%',
  },
  container: {
    display: 'grid',
    gap: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    paddingTop: '1rem',
    gap: '1rem',
  },
  wasteDetails: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 5px',
    fontWeight: 'bold',
    '& .MuiTypography-body1': {
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '12px',
    },
  },
});

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const dates = [new Date('July 17, 2021 '), new Date('July 18, 2021 '), new Date('July 19, 2021 ')];
const Booking = () => {
  const classes = useStyles();
  const [selectValue] = useState('Manila');
  const [value, setValue] = useState(dates[0].getTime());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value));
  };
  return (
    <Box paddingX={2} paddingTop={4}>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Enter your location
        </Typography>
        <Select className={classes.select} input={<BootstrapInput />} value={selectValue}>
          <MenuItem value="Manila">Manila, Metro Manila </MenuItem>
        </Select>
      </div>

      <Box paddingTop={6}>
        <Typography variant="h4" className={classes.heading}>
          Available Dates
        </Typography>
        <RadioGroup onChange={handleChange} value={value}>
          {dates.map((date, i) => (
            <FormControlLabel
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              control={<Radio color="primary" />}
              value={date.getTime()}
              label={date.toLocaleString()}
            />
          ))}
        </RadioGroup>
      </Box>

      <Box paddingTop={6}>
        <Typography variant="h4" className={classes.heading}>
          Types of wastes
        </Typography>

        <FormGroup>
          <div className={classes.grid}>
            {wastes.map((x) => {
              return (
                <div
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05)), url(${x.src})`,
                    height: '180px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundOrigin: '',
                    backgroundPosition: 'center center',
                    display: 'flex',
                    borderRadius: '3px',
                  }}
                >
                  <div className={classes.wasteDetails}>
                    <FormControlLabel control={<Checkbox color="primary" />} label={x.label} />
                  </div>
                </div>
              );
            })}
          </div>
        </FormGroup>
      </Box>
      <Button
        variant="contained"
        color="primary"
        style={{ color: 'white', marginTop: '2rem' }}
        fullWidth
      >
        Add to Bin
      </Button>
    </Box>
  );
};

export default Booking;
