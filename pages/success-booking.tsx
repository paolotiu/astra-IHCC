import { Button, makeStyles, Typography } from '@material-ui/core';
import { FiCheck } from 'react-icons/fi';
import React from 'react';
import { useAtom } from 'jotai';
import { dateAtom } from '@utils/jotai';
import Link from 'next/link';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    textAlign: 'center',
    '& .MuiTypography-body2': {
      fontWeight: 'bold',
    },
  },
});
const SuccessPage = () => {
  const classes = useStyles();
  const [date] = useAtom(dateAtom);
  return (
    <div className={classes.grid}>
      <div style={{ marginBottom: '90px' }}>
        <FiCheck size="80px" />
        <h2>Pickup Booked</h2>
        <p>
          A driver will be at your house on
          <Typography color="primary" variant="body2">
            {new Date(date).toDateString()}
          </Typography>
        </p>
        <Link href="/home">
          <Button variant="contained" color="primary" style={{ color: 'white' }}>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
