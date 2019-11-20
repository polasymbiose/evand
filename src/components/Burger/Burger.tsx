import * as React from 'react'
import './burger.scss'
var classNames = require('classnames')

export default class Burger extends React.Component<{ open: boolean; toggle: () => void; gallery?: boolean }> {
  render() {
    const burger = classNames('burger', {
      open: this.props.open,
      burger: !this.props.gallery,
      galleryBurger: this.props.gallery
    })

    return (
      <div className="burgerWrap">
        <div className={burger} onClick={this.props.toggle}>
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
        </div>
      </div>
    )
  }
}
