import {
  Box,
  FormControlLabel,
  Input,
  Typography,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import Image from 'next/image';
import { makeStyles } from '@material-ui/styles';
import { wastesAtom } from '@utils/jotai';
import Link from 'next/link';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

const useStyles = makeStyles({
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  item: {
    padding: '1rem 0',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '& h6': {
      fontSize: '1rem',
    },
    '& 	.MuiFormControlLabel-label': {
      fontSize: '.8rem',
    },
  },
  itemContainer: {
    padding: '2rem 0',
    position: 'relative',
  },
  infoContainer: {
    paddingBottom: '3rem',
    paddingTop: '3rem',
    '& .MuiInputBase-root > textarea ': {
      fontSize: '12px',
      color: 'black',
    },
    '& .MuiInputLabel-outlined ': {
      color: '#6DBD79',
    },
    '& textarea + fieldset': {
      borderColor: '#6DBD79',
      borderWidth: 2,
    },
  },
  img: {
    top: '-6px',
    left: '100px',
    position: 'absolute',
    transform: 'rotate(320deg)',
  },
});

const QuantityPage = () => {
  const classes = useStyles();
  const [wastes] = useAtom(wastesAtom);
  const [quantites, setQuantites] = useState<Record<string, number>>(
    wastes.reduce((prev, curr) => ({ ...prev, [curr.label]: 0 }), {}),
  );

  return (
    <Box paddingX={3} paddingTop={4}>
      <div className={classes.infoContainer}>
        <div className={classes.img}>
          <Image src="/bottle.png" width={120} height={150} />
        </div>
        <TextField
          variant="outlined"
          style={{ background: '#fafafa' }}
          fullWidth
          label="Did you know?"
          multiline
          defaultValue="Each year, around 22 billion water bottles are wasted in which majority are released into the ocean, releasing toxic chemicals like BPA into the water that can cause diseases and hormone cancer"
          InputProps={{ readOnly: true }}
        />
      </div>

      <Typography variant="h4" className={classes.heading}>
        Dispose
      </Typography>
      <div className={classes.itemContainer}>
        {wastes.map((waste) => {
          return (
            <div key={waste.label} className={classes.item}>
              <Typography variant="h6">{waste.label}</Typography>
              <FormControlLabel
                control={
                  <Input
                    type="number"
                    style={{ maxWidth: '50px' }}
                    onChange={(e) => {
                      const num = Number(e.currentTarget.value);
                      setQuantites((prev) => ({
                        ...prev,
                        [waste.label]: Number.isNaN(num) ? 0 : num,
                      }));
                    }}
                  />
                }
                label="Qty in Kg"
                labelPlacement="top"
              />
            </div>
          );
        })}
      </div>

      <Divider light />
      <div className={classes.item}>
        <Typography variant="h6">Estimated Points</Typography>
        <Typography variant="h5">
          {Math.round(Object.values(quantites).reduce((prev, curr) => prev + curr * 9.6, 0) * 100) /
            100}
        </Typography>
      </div>

      <Divider light />

      <div className={classes.item}>
        <Link href="/book">
          <Button color="secondary" variant="outlined">
            Cancel
          </Button>
        </Link>

        <Link href="/success-booking">
          <Button variant="contained" color="primary" style={{ flex: '.6', color: 'white' }}>
            Book Now
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default QuantityPage;
