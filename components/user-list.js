import PropTypes from 'prop-types';
import User from './user';

const UserList = ({ users, filters }) => {
  let filtered = users;

  if (filters && filters.length) {
    filters.forEach(filter => {
      if (filter === 'gt-1h-duration') {
        filtered = filtered.filter(user => user.visit.duration > 1);
      }

      if (filter === '1st-visit') {
        filtered = filtered.filter(user => user.visit.count === 1);
      }

      if (filter === 'gte-3visits-in-month') {
        const currentDate = new Date('March 13, 2019 14:00:00 GMT-04:00');

        filtered = filtered.filter(user => {
          const total = user.visit.list.reduce((accum, visit) => {
            const visitStart = new Date(visit.start_time);
            if (visitStart.getTime() <= currentDate.getTime()) {
              accum += 1;
            }

            return accum;
          }, 0);

          return total >= 3 ? true : false;
        });
      }
    });
  }

  return (
    <ul className="user-list">
      {filtered.map(user => (
        <li key={user.id}><User user={user} /></li>
      ))}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.instanceOf(Array),
  filter: PropTypes.instanceOf(Array),
};

export default UserList;
