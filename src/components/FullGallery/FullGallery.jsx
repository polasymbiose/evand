import React, { useState, useEffect, useRef } from 'react'
import { get } from 'lodash'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useHistory, useLocation } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import useImage from 'use-image'
import Burger from '../Burger/Burger'
import Loader from '../Loader/Loader'
import useBodyClass from '../../hooks/useBodyClass'
import './FullGallery.scss'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

var classNames = require('classnames')

export default function FullGallery({ imgs }) {
  const [visImg, setVisImg] = useState([])
  const sliderRef = useRef(null)
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const pathSplit = pathname.split('/')
  const isOpen = pathSplit.length > 2 && pathSplit[2] !== ''
  const imgPath = pathSplit[2] || ''
  const findIndex = imgs.findIndex(el => {
    return el.src.includes(imgPath)
  })
  useBodyClass('noscroll', isOpen)

  // useEffect(() => {
  //   isOpen ? document.body.classList.add('noscroll') : document.body.classList.remove('noscroll')
  //   return () => {
  //     document.body.classList.remove('noscroll')
  //   }
  // })

  const handleClose = () => {
    history.push('/gallery')
  }

  const fullGallery = classNames('fullGallery', { open: isOpen })
  const burgerSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(200%,0,0)',
    config: { tension: 350, friction: 50 }
  })

  const indexCorr = index => {
    return index < 0 ? imgs.length - 1 : imgs.length <= index ? 0 : index
  }

  const load = index => {
    setVisImg([indexCorr(index - 1), index, indexCorr(index + 1)])
  }

  return (
    <div className={fullGallery}>
      <animated.div className="closeGallery" style={burgerSpring}>
        <Burger toggle={handleClose} open={isOpen} gallery />
      </animated.div>

      {isOpen && (
        <AliceCarousel
          ref={sliderRef}
          infinite
          buttonsDisabled
          startIndex={findIndex}
          dotsDisabled={true}
          autoHeight
          onInitialized={e => {
            load(e.slide)
          }}
          onSlideChanged={e => {
            load(e.slide)
            const n = get(imgs, [e.slide, 'src'], false)
            if (!n) return
            const name = n
              .split('/')
              .pop()
              .replace('.jpg', '')
            history.push(`/gallery/${name}`)
          }}
          items={[...imgs].map((item, index) => {
            return (
              <div key={item.src} className={'sliderWrapper'}>
                {visImg.includes(index) && <ImageLoader item={item} />}
              </div>
            )
          })}
        />
      )}
      <div className="galleryArrows">
        <div className="galleryLeft" onClick={sliderRef && sliderRef.current && sliderRef.current.slidePrev}>
          {`<`}
        </div>
        <div className="galleryRight" onClick={sliderRef && sliderRef.current && sliderRef.current.slideNext}>
        {`>`}
        </div>
      </div>
      }
    </div>
  )
}

const ImageLoader = ({ item }) => {
  const [image, status] = useImage(item.src)

  return (
    <div className={'imageLoader'}>
      <Loader active={status === 'loading'} />
      {<img src={image && image.src} className={status === 'loaded' ? 'loaded' : ''}/>}
    </div>
  )
}
