import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo/Logo-weiss.png'
import useOpenGallery from '../../hooks/useOpenGallery'
import Burger from '../Burger/Burger'
import './header.scss'
const cn = require('classnames')

const Header = (props: {
  open: boolean,
  toggle: () => void
}) => {
    const openGallery = useOpenGallery()

    const cx = cn({
      hide: openGallery
    })
    return (
      <header className={cx}>
        <div className="header">
          <div>
            <Burger toggle={props.toggle} open={props.open} />
          </div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="evand-logo"/>
            </Link>
          </div>
        </div>
      </header>
    )
}

export default Header
