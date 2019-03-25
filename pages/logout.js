import Router from 'next/router';
import Layout from '../components/layout';
import { authGuard } from '../auth/auth-guard';

const Logout = ({ auth, router }) => {
  const onLogoutCancel = () => {
    Router.push('/');
  };

  const onLogoutConfirm = () => {
    auth.logout();
  };

  return (
    <Layout title="Logout">
      <div className="logout">
        <div className="logout__content">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="logout__actions">
          <button onClick={onLogoutConfirm} className="btn logout__confirm">
            Yes
          </button>
          <button onClick={onLogoutCancel} className="btn logout__cancel">
            No
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default authGuard(Logout);
