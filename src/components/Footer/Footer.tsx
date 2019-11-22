import * as React from "react";
// @ts-ignore
import { Link, useLocation } from 'react-router-dom';
import "./footer.scss";
const cn = require('classnames')

const Footer = () => {
  const location = useLocation()
  const { pathname } = location
  const pathSplit = pathname.split('/')
  const hide = pathSplit.length > 2 && pathSplit[2] !== ''

  const cx = cn({
    footer: true,
    hide
  })
  return (
    <div className={cx}>
      <div className="links">
        <Link to="/datenschutz">Datenschutz</Link>
        <Link to="/impressum">Impressum</Link>
      </div>
    </div>
  )
}

export default Footer
