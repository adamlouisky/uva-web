import Head from 'next/head';
import Layout from '../components/layout';
import Loading from '../components/loading';
import { anonGuard } from '../auth/anon-guard';

class Callback extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    auth.handleAuthentication();
  }

  render() {
    return (
      <Layout title="Signing In . . .">
        <Loading />
      </Layout>
    );
  }
}

export default anonGuard(Callback);
