import React, { Dispatch, SetStateAction, useEffect, useRef, useState, useCallback } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
import { GlobalObservable } from '../../App'
import Burger from '../Burger/Burger'
import { Images } from '../GalleryComponent/GalleryComponent'
import Loader from '../Loader/Loader'
import {debounce} from "lodash";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// @ts-ignore
import Carousel from 'react-awesome-slider'
// @ts-ignore
import CarouselStyles from 'react-awesome-slider/src/core/styles.scss'
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
  const [loading, setloading] = useState(false)
  const imgRef = useRef(new Image())

  useEffect(() => {
    const foo = GlobalObservable.value
    GlobalObservable.next({
      ...foo,
      openGallery: galleryControls.open
    })
  }, [galleryControls.open])

  const indexCorretor = (i: number): number => {
    const newIndex = i < 0 ? imageAr.length - 1 : i
    return newIndex
  }

  // useEffect(() => {
  //   imgRef.current.onload = () => {
  //     console.log('ASDFASDF');

  //     setTimeout(() => {
  //       setloading(false)
  //     }, 500)
  //   }
  // }, [galleryControls])

  // useEffect(() => {
  //   if (galleryControls.open && imgRef.current.src !== imgs[galleryControls.index].src) {
  //     setloading(true)
  //     imgRef.current.src = imgs[galleryControls.index].src
  //   }
  // })

  const handleInview = useCallback(
      (a: boolean) => {
        console.log('a :', a);
    },
    [],
  );

  const bounce = debounce(handleInview, 2000, { leading: false })

  useEffect(() => {
    if (!galleryControls.open && galleryControls.index >= imgs.length - 1) {
      setGalleryControls({
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

  const fullGallery = classNames('fullGallery', { open: galleryControls.open })
  const burgerSpring = useSpring({
    opacity: galleryControls.open ? 1 : 0,
    transform: galleryControls.open ? 'translate3d(0,0,0)' : 'translate3d(200%,0,0)',
    config: { tension: 350, friction: 50 }
  })

  const imageAr = [...imgs].map((item: Images, index: number) => {
    return (
      <div
        key={item.src}
        className='galleryImg'
        // onClick={handleSwitch(1)}
        style={{
          backgroundImage: `url(${item.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
    )
  })

  return (
    <div className={fullGallery}>
      <animated.div className='closeGallery' style={burgerSpring}>
        <Burger toggle={handleClose} open={galleryControls.open} gallery />
      </animated.div>

      <Loader active={loading} />

      {galleryControls.open && (
        <Carousel
          infiniteLoop
          // transitionDelay={100}
          useKeyboardArrows
          onTransitionStart={() => {
            bounce(false)
          }}
          onTransitionRequest={(e: any) => {
            bounce(true)
            setGalleryControls({
              ...galleryControls,
              index: e.currentIndex
            })
          }}
          showThumbs={false}
          selected={galleryControls.index}
          startupScreen={<div />}
          cssModule={CarouselStyles}
          bullets={false}
        >
          {imageAr}
        </Carousel>
      )}
    </div>
  )
}
