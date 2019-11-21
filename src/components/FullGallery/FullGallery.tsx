import { debounce, get } from 'lodash'
import React, { Dispatch, SetStateAction, useLayoutEffect, useEffect, useRef, useState } from 'react'
// @ts-ignore
import Carousel from 'react-awesome-slider'
// @ts-ignore
import CarouselStyles from 'react-awesome-slider/src/core/styles.scss'
// @ts-ignore
import { useHistory, useLocation } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import { GlobalObservable } from '../../App'
import Burger from '../Burger/Burger'
import { Images } from '../GalleryComponent/GalleryComponent'
import Loader from '../Loader/Loader'
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
  const history = useHistory()
  const location = useLocation()

  const { pathname } = location
  const pathSplit = pathname.split('/')
  console.log('pathSplit :', pathSplit);
  const isOpen = pathSplit.length > 2 && pathSplit[2] !== ''
let asdf = false
  useLayoutEffect(() => {
    asdf = true
    if (isOpen) {
      const imgPath = pathSplit[2]
      const findImg = imgs.find((el, index) => {
        if (el.src.includes(imgPath)) {
          setGalleryControls({
            index,
            open: true
          })
          console.log(index);
        }

        return el.src.includes(imgPath)
      })
      console.log('cdm', imgPath, findImg);

    }


  }, []);

  useEffect(() => {
    const foo = GlobalObservable.value
    GlobalObservable.next({
      ...foo,
      openGallery: isOpen
    })
  }, [galleryControls.open])

  useEffect(() => {
    if (!isOpen && galleryControls.index >= imgs.length - 1) {
      setGalleryControls({
        index: 0,
        open: false
      })
    }
  }, [imgs])

  const handleClose = () => {
    history.push('/gallery')
    setGalleryControls({
      ...galleryControls,
      open: false
    })
  }

  const fullGallery = classNames('fullGallery', { open: isOpen })
  const burgerSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(200%,0,0)',
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
  console.log('galleryControls.index :', galleryControls.index);
  return (
    <div className={fullGallery}>
      <animated.div className='closeGallery' style={burgerSpring}>
        <Burger toggle={handleClose} open={isOpen} gallery />
      </animated.div>

      <Loader active={loading} />

      {isOpen && (
        <Carousel
          infiniteLoop
          // transitionDelay={100}
          useKeyboardArrows
          onTransitionStart={() => {}}
          onTransitionRequest={(e: any) => {
            const next = e.eventName === 'next' ? 1 : -1;
            const foo = (galleryControls.index + next) % imgs.length
            const finalIndex = foo < 0 ? imgs.length -1 : foo
            const n = get(imgs, [finalIndex, 'src'], false)
            // @ts-ignore
            const name = n && n.split('/').pop().replace('.jpg', '')
            history.push(`/gallery/${name}`)
            setGalleryControls({
              ...galleryControls,
              index: e.currentIndex +1
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
