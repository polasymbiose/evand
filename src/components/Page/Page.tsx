import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { animated, useSpring } from "react-spring";
const classNames = require('classnames');

function Page({
  children,
  location: {
    state,
  },
}: any) {
  const cx = classNames({
    "page": true
  })

  const props = useSpring({
    to: {opacity: 1, marginLeft: 0 },
    from: { opacity: 0, marginLeft: 0 },
    config: {friction: 20, tension: 200}

  });
  const animate = (children: any) => {
    return (
      <animated.div style={props}>
        {children}
      </animated.div>
    );
  };

  return (
    <section
      className={cx}
    >
      <div className="page__inner">
      {animate(children)}
      </div>
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

Page.defaultProps = {
  color: '#fff',
};

export default withRouter(Page);
