import React from 'react'
import './loader.scss'
var classNames = require('classnames')

const Loader = ({ active }) => {
  const loaderClassNames = classNames('loader', { active })

  return (
    <div className={loaderClassNames}>
      <div className='loadernew' />
    </div>
  )
}
export default Loader
