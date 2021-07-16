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
    alignItems: 'center',
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
  addressContainer: {
    padding: '1rem 0',
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

const prices: Record<string, number> = {
  'Plastic Bottles': 120,
  Cardboard: 160,
};

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

      {/* <div className={classes.addressContainer}>
        <TextField type="text" multiline variant="outlined" fullWidth label="Address" />
      </div>
      <Box paddingY={3}>
        <Divider light />
      </Box> */}

      <Typography variant="h4" className={classes.heading}>
        Enter Quantites
      </Typography>
      <div className={classes.itemContainer}>
        {wastes.map((waste) => {
          return (
            <div key={waste.label} className={classes.item}>
              <div>
                <Typography variant="h6">{waste.label}</Typography>
                <Typography variant="body2">₱{prices[waste.label]}/Kg</Typography>
              </div>
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
        <Typography variant="h6">Subtotal</Typography>
        <Typography variant="h5">
          ₱
          {Math.round(
            Object.entries(quantites).reduce((prev, [key, val]) => prev + val * prices[key], 0) *
              100,
          ) / 100}
        </Typography>
      </div>

      <Divider light />

      <div className={classes.item}>
        <Link href="/buyer-home">
          <Button color="secondary" variant="outlined">
            Cancel
          </Button>
        </Link>

        <Link href="/buyer-success">
          <Button variant="contained" color="primary" style={{ flex: '.6', color: 'white' }}>
            Book Now
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default QuantityPage;
