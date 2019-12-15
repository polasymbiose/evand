import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Burger from '../Burger/Burger'
import { animated, config, useSpring, useTrail } from 'react-spring'
import './menu.scss'
const classNames = require('classnames')

const list = [<Link to="/">Home</Link>, <Link to="/gallery/">Gallery</Link>, <Link to="/kontakt/">Kontakt</Link>]

const Menu = props => {
  const [spring, set] = useSpring(() => ({
    to: { backgroundColor: 'rgba(0,0,0,0.7)' },
    from: { backgroundColor: 'rgba(0,0,0,0)' },
    config: config.gentle
  }))
  const cx = classNames({
    open: props.open
  })

  useEffect(() => {
    set({
      to: { backgroundColor: props.open ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)' },
      from: { backgroundColor: props.open ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.9)' }
    })
  }, [props.open, set])

  const trail = useTrail(list.length, {
    config,
    opacity: props.open ? 1 : 0,
    x: props.open ? 0 : -100,
    marginLeft: props.open ? 0 : -100,
    // height: props.open ? 60 : 0,
    left: !props.open ? -60 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  })

  return (
    <>
      <animated.nav style={spring} className={cx}>
        <div
          className={classNames({
            menuburger: true,
            active: props.open
          })}
        >
          <Burger toggle={props.toggle} open={props.open} />
        </div>
        <ul>
          {trail.map(({ x, height, opacity, marginLeft, ...rest }, index) => {
            return (
              <animated.li
                onClick={props.toggle}
                key={`menuListItem${index}`}
                className="trails-text"
                style={{
                  ...rest,
                  transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
                }}
              >
                <animated.div style={{ opacity, marginLeft }}>{list[index]}</animated.div>
              </animated.li>
            )
          })}
        </ul>
      </animated.nav>
    </>
  )
}

export default Menu
