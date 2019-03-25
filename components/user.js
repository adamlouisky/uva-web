import PropTypes from 'prop-types';

const hourDisplayHelper = (time) => {
  const hour = parseInt(time);
  const deci = time % 1;
  const mins = deci * 60;
  return { hour, mins: parseInt(mins) };
};

const User = ({ user }) => (
  <div className="user">
    <div className="user__name">
      <label>Name</label>
      <div>{`${user.first_name} ${user.last_name}`}</div>
    </div>
    <div className="user__duration">
      <label>Total Duration</label>
      <div>{`
        ${hourDisplayHelper(user.visit.duration).hour} hrs ${hourDisplayHelper(user.visit.duration).mins} mins
       `}</div>
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.instanceOf(Object),
};

export default User;
