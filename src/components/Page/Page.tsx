import React, { FunctionComponent } from 'react'
import './page-transition.scss'

const Page: FunctionComponent<any> = ({ children }: any) => {
  return (
    <div className="page">
      <div className="page__inner">
        {children}
      </div>
    </div>
  )
}

export default Page
