import Router from 'next/router';
import Auth from './auth';
import Layout from '../components/layout';
import Loading from '../components/loading';
import { apiFetch } from '../fetch/api-fetch';

const auth = new Auth();

export function anonGuard(WrappedComponent) {
  return class extends React.Component {
    state = { isAuthenticated: false };

    componentDidMount() {
      const isAuthenticated = auth.isAuthenticated();
      this.setState({ isAuthenticated });
      
      if (isAuthenticated) {
        Router.push('/');
      }
    }

    render() {
      const { isAuthenticated } = this.state;

      if (isAuthenticated) {
        return (<Layout><Loading /></Layout>);
      }

      return (<WrappedComponent auth={auth} apiFetch={apiFetch} {...this.props} />);
    }
  };
}
