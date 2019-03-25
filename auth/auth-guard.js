import Auth from './auth';
import Layout from '../components/layout';
import Loading from '../components/loading';
import { apiFetch } from '../fetch/api-fetch';

const auth = new Auth();

export function authGuard(WrappedComponent) {
  return class extends React.Component {
    state = { isAuthenticated: false };

    componentDidMount() {
      const isAuthenticated = auth.isAuthenticated();
      this.setState({ isAuthenticated });

      if (!isAuthenticated) {
        auth.login();
      }
    }

    render() {
      if (!this.state.isAuthenticated) {
        return (<Layout title="Loading"><Loading /></Layout>);
      }

      return (<WrappedComponent auth={auth} apiFetch={apiFetch} {...this.props} />);
    }
  };
}
