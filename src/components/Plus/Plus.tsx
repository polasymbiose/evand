import * as React from 'react'
import './Plus.scss'
import { animated, useTransition, config } from 'react-spring'
var classNames = require('classnames')

interface PlusProps {
  open: boolean
  toggle: () => void
}

const Plus = ({open, toggle}: PlusProps) => {
  const plusClassName = classNames('plus', { plusOpen: open })

  const first = useTransition(open, null, {
    config: config.wobbly,
    from: { height: open ? 0 : 30 },
    enter: { height: !open ? 0 : 30 },
    leave: { height: open ? 0 : 30 }
  })

  const second = useTransition(open, null, {
    config: config.wobbly,
    from: { width: open ? 0 : 30 },
    enter: { width: !open ? 0 : 30 },
    leave: { width: open ? 0 : 30 }
  })

  return (
    <div className={plusClassName} onClick={toggle}>
      <div className="plusWrapper">
        {first.map(
          ({ item, key, props }) => item && <animated.div key={key} style={props} className="plusFirst" />
        )}
        {second.map(
          ({ item, key, props }) => item && <animated.div key={key} style={props} className="plusSecond" />
        )}
        <div />
      </div>
    </div>
  )
}

export default Plus
