import React from 'react'
import '../Page/page-transition.scss'
import './loader.scss'
var classNames = require('classnames')

const Loader = ({ active }) => {
  const loaderClassNames = classNames('loader', { active })

  return (
    <div className={loaderClassNames}>
      {/* <img src={logo} alt="evand-logo" className="loader-logo"/> */}
      <div className='loadernew' />
    </div>
  )
}
export default Loader
