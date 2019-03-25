import Link from 'next/link';
import Layout from '../components/layout';
import Loading from '../components/loading';
import UserList from '../components/user-list';
import { authGuard } from '../auth/auth-guard';

class Dashboard extends React.Component {
  state = { users: undefined, filters: { member: [], guest: [], 'on-demand': [] } };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const { apiFetch } = this.props;
    const payload = await apiFetch({ method: 'GET', uri: '/users', auth: true });

    if (payload && payload.data) {
      // build users state object by user type
      const users = {};
      users.member = payload.data.filter(val => val.type === 'member');
      users.guest = payload.data.filter(val => val.type === 'guest');
      users['on-demand'] = payload.data.filter(val => val.type === 'on-demand');
      this.setState({ users }, () => {
        console.log(this.state.users);
      });
    }
  };

  toggleActiveTab = e => {
    const activeNav = document.querySelector('.tab .tab__nav div.active');
    const activeContent = document.querySelector('.tab .tab__content div.active');

    // click the same tab, do nothing
    if (activeNav.dataset.id !== e.target.dataset.id) {
      activeNav.classList.remove('active');
      activeContent.classList.remove('active');

      e.target.classList.add('active');
      const selector = `.tab .tab__content #${e.target.dataset.id}`;
      const toBeActiveContent = document.querySelector(selector);
      toBeActiveContent.classList.add('active');
    }
  };

  setUserFilter = e => {
    const { filters } = this.state;
    const userType = e.target.dataset.type;
    const filterValue = e.target.value;

    if (e.target.checked) {
      filters[userType].push(e.target.value);
    } else {
      filters[userType].splice(filters[userType].indexOf(filterValue));
    }

    this.setState({ filters });
  };

  render() {
    if (!this.state.users) {
      return (<Layout title="Dashboard"><Loading /></Layout>);
    }

    return (
      <Layout title="Dashboard">
        <div className="header">
          <h1 className="header__title">Dashboard</h1>
          <p className="header__date">March 13, 2019 2:00 PM EST</p>
          <div className="header__session">
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </div>
        </div>
        <div className="tab">
          {/* Tab navigation */}
          <nav className="tab__nav">
            <div data-id="member" className="active" onClick={this.toggleActiveTab}>
              Members
            </div>
            <div data-id="guest" onClick={this.toggleActiveTab}>
              Guests
            </div>
            <div data-id="on-demand" onClick={this.toggleActiveTab}>
              On-Demand
            </div>
          </nav>
          <div className="tab__content">
            {/* Tab Content - member */}
            <div id="member" className="active">
              <div className="tab__filters">
                <p>Filters:</p>
                <label>
                  <input data-type="member" onChange={this.setUserFilter} type="checkbox" value="gt-1h-duration" />
                  Greater than 1HR Total Visit Duration
                </label>
              </div>
              <UserList users={this.state.users.member} filters={this.state.filters.member} />
            </div>
            {/* Tab Content - guest */}
            <div id="guest">
              <div className="tab__filters">
                <p>Filters:</p>
                <label>
                  <input data-type="guest" onChange={this.setUserFilter} type="checkbox" value="gt-1h-duration" />
                  Greater than 1HR Total Visit Duration
                </label>
                <label>
                  <input data-type="guest" onChange={this.setUserFilter} type="checkbox" value="1st-visit" />
                  1st Visit
                </label>
              </div>
              <UserList users={this.state.users.guest} filters={this.state.filters.guest} />
            </div>
            {/* Tab Content - on-demand */}
            <div id="on-demand">
              <div className="tab__filters">
                <p>Filters:</p>
                <label>
                  <input data-type="on-demand" onChange={this.setUserFilter} type="checkbox" value="gt-1h-duration" />
                  Greater than 1HR Total Visit Duration
                </label>
                <label>
                  <input data-type="on-demand" onChange={this.setUserFilter} type="checkbox" value="gte-3visits-in-month" />
                  Greater or Equal to 3 Visits in the Month
                </label>
              </div>
              <UserList users={this.state.users['on-demand']} filters={this.state.filters['on-demand']} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default authGuard(Dashboard);
