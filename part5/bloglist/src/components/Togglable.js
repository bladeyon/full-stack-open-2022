import { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ btnLabel, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {visible ? children : ''}
      <button onClick={() => setVisible(!visible)}>
        {!visible ? btnLabel : 'cancel'}
      </button>
    </div>
  );
};

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired
};
export default Togglable;
