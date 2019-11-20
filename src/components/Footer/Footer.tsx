import * as React from "react";
import { Link } from "react-router-dom";
import useOpenGallery from '../../hooks/useOpenGallery';
import "./footer.scss";
const cn = require('classnames')

const Footer = () => {
  const openGallery = useOpenGallery()
  const cx = cn({
    footer: true,
    hide: openGallery
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
