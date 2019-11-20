import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
import { GlobalObservable } from '../../App'
import Burger from '../Burger/Burger'
import { Images } from '../GalleryComponent/GalleryComponent'
import Loader from '../Loader/Loader'
// @ts-ignore
import Carousel from 'react-awesome-slider'
// @ts-ignore
import CarouselStyles from 'react-awesome-slider/src/core/styles.scss';
import './FullGallery.scss'
var classNames = require('classnames')

interface GalleryControls {
  index: number
  open: boolean
}

interface FullGalleryProps {
  galleryControls: GalleryControls
  setGalleryControls: Dispatch<SetStateAction<{ index: number; open: boolean }>>
  imgs: Images[]
}

export default function FullGallery({ galleryControls, setGalleryControls, imgs }: FullGalleryProps) {
  const [postLoaderControls, setpostLoaderControls] = useState({ ...galleryControls })
  const [loading, setloading] = useState(false)
  const imgRef = useRef(new Image())

  useEffect(() => {
    const foo = GlobalObservable.value
    GlobalObservable.next({
      ...foo,
      openGallery: galleryControls.open
    })
  }, [galleryControls.open])

  const imageTransition = useTransition(postLoaderControls.index, p => p, {
    from: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    enter: {
      opacity: 1,
      backgroundPositionX: '0',
      backgroundSize: 'contain',
      transform: 'scale(1)'
    },
    update: {
      opacity: 1,
      backgroundPositionX: '0',
      backgroundSize: 'contain',
      transform: 'scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    config: { mass: 1, tension: 200, friction: 50 }
  })

  const indexCorretor = (i: number): number => {
    return i < 0 ? imgs.length - 1 : i > imgs.length - 1 ? 0 : i
  }

  const handleSwitch = (add: number) => () => {
    const n = add > 0
    const i = indexCorretor(galleryControls.index + add)

    setGalleryControls({
      index: i,
      open: true
    })
  }

  useEffect(() => {
    imgRef.current.onload = () => {
      setTimeout(() => {
        setpostLoaderControls({ ...galleryControls })
        setloading(false)
      }, 500)
    }
  }, [galleryControls])

  useEffect(() => {
    if (galleryControls.open && imgRef.current.src !== imgs[galleryControls.index].src) {
      setloading(true)
      imgRef.current.src = imgs[galleryControls.index].src
    }
  })

  useEffect(() => {
    if (galleryControls.index >= imgs.length - 1) {
      setGalleryControls({
        index: 0,
        open: false
      })
      setpostLoaderControls({
        index: 0,
        open: false
      })
    }
  }, [imgs])

  const handleClose = () => {
    setGalleryControls({
      ...galleryControls,
      open: false
    })
  }

  const images = [...imgs].map(img => ({ style }: any) => {
    return (
      <div
      data-src={img.src}
      className='galleryImg'
      onClick={handleSwitch(1)}
      />
    )
  })

  const fullGallery = classNames('fullGallery', { open: galleryControls.open })
  const openGalSpring = useSpring({ opacity: galleryControls.open ? 1 : 0 })
  const burgerSpring = useSpring({
    opacity: galleryControls.open ? 1 : 0,
    transform: galleryControls.open ? 'translate3d(0,0,0)' : 'translate3d(200%,0,0)',
    config: { tension: 350, friction: 50 }
  })
  console.log('galleryControls.index :', galleryControls.index);
  return (
    <animated.div className={fullGallery} style={openGalSpring}>
      <animated.div className='closeGallery' style={burgerSpring}>
        <Burger toggle={handleClose} open={galleryControls.open} gallery />
      </animated.div>
      <Loader active={loading} />

      <Carousel
        // fillParent
        infinite
        onTransitionRequest={(e: any) => {
          console.log('e :', e);
          setGalleryControls({
            ...galleryControls,
            index: e.currentIndex
          })
        }}
        selected={galleryControls.index}
        startupScreen={<Loader active={true} />}
        cssModule={CarouselStyles}
      >
        <div
          style={{ backgroundPositionX: '50%' }}
          data-src={imgs[0].src}
          className='galleryImg'
          onClick={handleSwitch(1)}
        />
        <div
          style={{ backgroundPositionX: '50%' }}
          data-src={imgs[1].src}
          className='galleryImg'
          onClick={handleSwitch(1)}
        />
        <div
          style={{ backgroundPositionX: '50%' }}
          data-src={imgs[2].src}
          className='galleryImg'
          onClick={handleSwitch(1)}
        />
        <div
          style={{ backgroundPositionX: '50%' }}
          data-src={imgs[3].src}
          className='galleryImg'
          onClick={handleSwitch(1)}
        />
      </Carousel>

      {/* <Carousel useKeyboardArrows cssModule={CarouselStyles} selected={galleryControls.index}>
        {images}
      </Carousel> */}

      {/* {galleryControls.open &&
        imageTransition.map(({ item, props, key }) => {
          const Images = images[item]
          return <Images key={key} style={props} />
        })} */}

      <div className='galleryArrows'>
        <div className='galleryLeft' onClick={handleSwitch(-1)}>
          -
        </div>
        <div className='galleryRight' onClick={handleSwitch(1)}>
          +
        </div>
      </div>
    </animated.div>
  )
}
