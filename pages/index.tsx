import Layout from '@components/Layout';
import { Button, makeStyles } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
const IndexPage = () => {
  const classes = useStyles();
  return (
    <Layout title="Astra">
      <div className={classes.grid}>
        <Link href="/book">
        <Button>Login as Customer</Button>
</Link>

        <Button>Login as Business</Button>
      </div>
    </Layout>
  );
};
export default IndexPage;
