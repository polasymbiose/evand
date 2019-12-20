import React, { useState, useEffect, useRef } from 'react'
import './GalleryFilter.scss'
import useMedia from '../../hooks/useMedia'
const cn = require('classnames')

interface GalleryFilterProps {
  render: (imgs: any[]) => JSX.Element
}

const GalleryFilter = ({ render }: GalleryFilterProps) => {
  const bp = useMedia(['(min-width: 750px)'], [true], false)
  const [json, setjson] = useState()
  const isMounted = useRef(false)
  const initJson = useRef<any[]>([])
  const [imageFilter, setImageFilter] = useState<any[]>([])
  const [checkbox] = useState(new Map())

  useEffect(() => {
    isMounted.current = true

    fetch(`${process.env.PUBLIC_URL}/img.json`)
      .then(async res => {
        const r = await res.json()
        const { gallery } = r
        isMounted.current && setjson(gallery)

        let imgs: any[] = []
        isMounted.current &&
          Object.keys(gallery).forEach(key => {
            const category = gallery[key]
            imgs = imgs.concat(category)
          })
        initJson.current = imgs
        setImageFilter(imgs)
      })
      .catch()

    return () => {
      isMounted.current = false
    }
  }, [])

  const merge = (a: any[], b: any[]) => a.filter(aa => !b.find(bb => aa.src === bb.src)).concat(b)

  const handleChange = (e: any) => {
    const label = e.target.value
    const check = checkbox
    if (check.has(label)) {
      check.delete(label)
    } else {
      check.set(label, json[label])
    }
    arrangeFilter()
  }

  const arrangeFilter = () => {
    let filter: any[] = []
    const check = checkbox
    check.forEach(ar => {
      filter = merge(filter, ar)
    })
    filter.length > 0 ? setImageFilter(filter) : setImageFilter(initJson.current)
  }

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
      {render(imageFilter)}
    </div>
  )
}
export default GalleryFilter
