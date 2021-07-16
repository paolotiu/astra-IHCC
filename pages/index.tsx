import Layout from '@components/Layout';
import { Button, makeStyles, Typography, Box } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'grid',
    gap: '1.8rem',
    '& .MuiButton-containedPrimary': {
      color: 'white',
    },
  },
});
const IndexPage = () => {
  const classes = useStyles();
  return (
    <Layout title="Astra">
      <div className={classes.flex}>
        <Box paddingBottom={4}>
          <Typography variant="h6">Are you a buyer or a seller?</Typography>
        </Box>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary">
            I am a Buyer
          </Button>

          <Link href="/book">
            <Button variant="contained" color="primary">
              I am a Seller
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;
