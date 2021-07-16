import { wastes } from '@components/Booking/wastes';
import {
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  makeStyles,
} from '@material-ui/core';
import { dateAtom, wastesAtom } from '@utils/jotai';
import { useAtom } from 'jotai';

import Link from 'next/link';
import React, { useEffect } from 'react';

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

const dates = [new Date('July 17, 2021 '), new Date('July 18, 2021 '), new Date('July 19, 2021 ')];
const BuyerHome = () => {
  const classes = useStyles();

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
          Buy
        </Typography>
        {/* <Typography variant="body2" style={{ color: 'white' }}>

        </Typography> */}
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
        <Link href="/buyer-quantity">
          <Button
            disabled={w.length === 0}
            variant="contained"
            color="primary"
            style={{ color: 'white', marginTop: '2rem' }}
            fullWidth
          >
            Continue
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default BuyerHome;
