import React, { useState } from 'react'
import './GalleryFilter.scss'
import useMedia from '../../hooks/useMedia'
const json = require('../../img.json')
const cn = require('classnames')

interface GalleryFilterProps {
  render: (imgs: any[]) => JSX.Element
}

const GalleryFilter = ({ render }: GalleryFilterProps) => {
  const bp = useMedia(['(min-width: 750px)'], [true], false)

  const merge = (a: any[], b: any[]) => a.filter(aa => !b.find(bb => aa.src === bb.src)).concat(b)
  let imgs: any[] = []
  Object.keys(json.gallery).forEach(key => {
    const category = json.gallery[key]
    imgs = imgs.concat(category)
  })
  const [imageFilter, setImageFilter] = useState(imgs)
  const [checkbox] = useState(new Map())
  const handleChange = (e: any) => {
    const label = e.target.value
    const check = checkbox
    if (check.has(label)) {
      check.delete(label)
    } else {
      check.set(label, json.gallery[label])
    }
    arrangeFilter()
  }

  const arrangeFilter = () => {
    let filter: any[] = []
    const check = checkbox
    check.forEach(ar => {
      filter = merge(filter, ar)
    })
    filter.length > 0 ? setImageFilter(filter) : setImageFilter(imgs)
  }
  console.log('bp :', bp);

  return (
    <div className="galleryWrapper">
      <div className="galleryFilter">
        <form>
          <fieldset>
            <ul className={cn({
                  mobile: !bp
                })}>
              {Object.keys(json.gallery).map((key, index) => {
                const cx = cn({
                  toggle: true,
                  open: checkbox.has(key),
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
                      <label className={cx}/>
                        <span className="toggle__text">{key}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        </form>
      </div>
      {render(imageFilter)}
    </div>
  )
}
export default GalleryFilter
