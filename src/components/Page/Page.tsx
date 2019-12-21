import React, { FunctionComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import './page-transition.scss'

const Page: FunctionComponent<any> = ({ children }: any) => {
  // const props = useSpring({
  //   to: { opacity: 1, marginLeft: 0 },
  //   from: { opacity: 0, marginLeft: 2000 },
  //   config: { friction: 20, tension: 200 }
  // })

  return (
    <div className="page">
      <div className="page__inner">
        {children}
        {/* <animated.div style={props}>{children}</animated.div> */}
      </div>
    </div>
  )
}

export default Page
