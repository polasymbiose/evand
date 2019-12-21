import * as React from 'react'
// @ts-ignore
import { Link, useLocation } from 'react-router-dom'
import logoBlauOut from '../../assets/img/logo/evand-fotografie-Logo-blau-outline.png'
import logoBlau from '../../assets/img/logo/evand-fotografie-Logo-blau.png'
import logoBlackOut from '../../assets/img/logo/evand-fotografie-Logo-schwarz-outline.png'
import logoBlack from '../../assets/img/logo/evand-fotografie-Logo-schwarz.png'
import logoWhiteOut from '../../assets/img/logo/evand-fotografie-Logo-weiss-outline.png'
import logoWhite from '../../assets/img/logo/evand-fotografie-Logo-weiss.png'
import Burger from '../Burger/Burger'
import './header.scss'

const cn = require('classnames')

const Header = (props: { open: boolean; toggle: () => void }) => {
  const location = useLocation()
  const { pathname } = location
  const pathSplit = pathname.split('/')
  const hide = pathSplit.length > 2 && pathSplit[2] !== ''
  const logos = [logoBlauOut, logoBlau, logoBlackOut, logoBlack, logoWhiteOut, logoWhite]
  var logo = logos[Math.floor(Math.random()*logos.length)];

  const cx = cn({
    hide: false
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
