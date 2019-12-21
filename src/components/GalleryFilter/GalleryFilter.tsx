import React, { ChangeEvent } from 'react'
import useMedia from '../../hooks/useMedia'
import './GalleryFilter.scss'
const cn = require('classnames')

interface GalleryFilterProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  gallery: any
  checkbox: any
}

const GalleryFilter = ({ checkbox, handleChange, gallery }: GalleryFilterProps) => {
  const bp = useMedia(['(min-width: 750px)'], [true], false)
  return (

      <div className="galleryFilter">
        {gallery && (
          <ul
            className={cn({
              mobile: !bp
            })}
          >
            {Object.keys(gallery).map((key, index) => {
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
                    <span>{key}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

  )
}
export default GalleryFilter
