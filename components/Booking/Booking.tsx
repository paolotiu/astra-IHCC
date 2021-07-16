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
import { dateAtom, wastesAtom } from '@utils/jotai';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { wastes } from './wastes';

const useStyles = makeStyles({
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  select: {
    width: '100%',
    marginBottom: '-4rem',
    '& .MuiSelect-select:focus': {
      backgroundColor: '#fff',
    },
  },
  container: {
    display: 'grid',
    backgroundColor: '#6DBD76',
    padding: '2rem 1rem',
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
  const [value, setValue] = useAtom(dateAtom);
  const [w, setWastes] = useAtom(wastesAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value));
  };

  useEffect(() => {
    setWastes([]);
  }, [setWastes]);
  return (
    <>
      <div className={classes.container}>
        <Typography
          variant="h4"
          className={classes.heading}
          style={{ color: 'white', fontSize: '36px' }}
        >
          Sell
        </Typography>
        <Select className={classes.select} input={<BootstrapInput />} value={selectValue}>
          <MenuItem value="Manila">Manila, Metro Manila </MenuItem>
        </Select>
      </div>
      <Box paddingX={2} paddingTop={4}>
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setWastes((prev) => [...prev, { label: x.label }]);
                                return;
                              }

                              setWastes((prev) => prev.filter((y) => y.label !== x.label));
                            }}
                          />
                        }
                        label={x.label}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </FormGroup>
        </Box>
        <Link href="quantity">
          <Button
            disabled={w.length === 0}
            variant="contained"
            color="primary"
            style={{ color: 'white', marginTop: '2rem' }}
            fullWidth
          >
            Add to Bin
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Booking;
