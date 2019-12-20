import React, { useState, useEffect, useRef } from 'react'
import './GalleryFilter.scss'
import useMedia from '../../hooks/useMedia'
const cn = require('classnames')

interface GalleryFilterProps {
  // render: (imgs: any[]) => JSX.Element
  handleChange: (e: any) => void
  json: any
  checkbox: any
}

const GalleryFilter = ({ checkbox, handleChange, json }: GalleryFilterProps) => {
  const bp = useMedia(['(min-width: 750px)'], [true], false)


  return (
    <div className="galleryWrapper">
      <div className="galleryFilter">
        {json && (
          <form>
            <fieldset>
              <ul
                className={cn({
                  mobile: !bp
                })}
              >
                {Object.keys(json).map((key, index) => {
                  const cx = cn({
                    toggle: true,
                    open: checkbox.has(key)
                  })
                  return (
                    <li key={`filter-${key}-${index}`}>
                      <div className="toggle">
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="filter"
                          value={`${key}`}
                          onChange={handleChange}
                        />
                        <label className={cx} />
                        <span className="toggle__text">{key}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          </form>
        )}
      </div>
      {/* {render(imageFilter)} */}
    </div>
  )
}
export default GalleryFilter
