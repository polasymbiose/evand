import shuffle from 'lodash/shuffle'
import React, { useEffect, useRef, useState } from 'react'
import useKeyboard from '../../hooks/useKeyboard'
import useMedia from '../../hooks/useMedia'
import Column from './Column'
import Loader from '../Loader/Loader'
import './WideScreenGallery.scss'

const WideScreenGallery = ({ imgs, render }) => {
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 3, 3], 2)
  const [items, set] = useState(imgs)
  const [controls, setControls] = useState({
    index: 0,
    open: false
  })
  const counter = useRef(0)
  const [loading, setloading] = useState(true)
  const prev = useRef(null)

  // useKeyboard('Escape', () =>
  //   setControls({
  //     ...controls,
  //     open: false
  //   })
  // )

  useEffect(() => {
    prev.current = gridItems
    const shuffled = shuffle(imgs)
    set(shuffled)
  }, [imgs])

  const colCalcY = []
  const cols = []

  for (let index = 0; index < columns; index++) {
    colCalcY.push([])
    cols.push([])
  }

  const arrSum = arr => arr.reduce((a, b) => a + b, 0)

  const gridItems = items.map((child, i) => {
    const currentColumn = i % columns
    const imgWidth = window.innerWidth / columns
    const imgHeight = (imgWidth - 24) * child.factor
    const arrOfcombinedHeights = colCalcY.map(col => arrSum(col))
    const smallestColumn = arrOfcombinedHeights.indexOf(Math.min.apply(null, arrOfcombinedHeights))

    colCalcY[smallestColumn].push(imgHeight)

    cols[smallestColumn].push({ ...child, width: imgWidth, height: imgHeight, index: i })
    return { ...child, index: i, column: currentColumn }
  })

  const handleClick = (index, animating) => () => {
    animating &&
      setControls({
        index,
        open: true
      })
  }
  const handleOnLoad = () => {
    counter.current += 1
    if (counter.current >= imgs.length) {
      setTimeout(() => {
        setloading(false)
        counter.current = 0
      }, 500)
    }
  }

  return (
    <div>
      <Loader active={loading} />
      {!loading && (
        <>
          {render(gridItems, controls, setControls)}
          <div className='wsgallery'>
            {cols.map((col, i) => (
              <div className='column' key={`galleryColumn-${i}`}>
                <Column column={col} handleClick={handleClick} colIndex={i} />
              </div>
            ))}
          </div>
        </>
      )}

      {imgs.map(img => {
        return <img className='hideSlider' src={img.thumb} onLoad={handleOnLoad} key={img.thumb} />
      })}
    </div>
  )
}

export default WideScreenGallery
