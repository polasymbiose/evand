import * as React from 'react'
// @ts-ignore
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/img/logo/Logo-weiss.png'
import Burger from '../Burger/Burger'
import './header.scss'

const cn = require('classnames')

const Header = (props: { open: boolean; toggle: () => void }) => {
  const location = useLocation()
  const { pathname } = location
  const pathSplit = pathname.split('/')
  const hide = pathSplit.length > 2 && pathSplit[2] !== ''

  const cx = cn({
    hide
  })

  return (
    <header className={cx}>
      <div className='header'>
        <div>
          <Burger toggle={props.toggle} open={props.open} />
        </div>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} alt='evand-logo' />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
