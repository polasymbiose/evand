import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import AwesomeSlider from 'react-awesome-slider'
// import CarouselStyles from 'react-awesome-slider/src/core/styles.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import Burger from '../Burger/Burger'
import Loader from '../Loader/Loader'
import './FullGallery.scss'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

var classNames = require('classnames')

export default function FullGallery({ imgs }) {
  const [loading, setloading] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const pathSplit = pathname.split('/')
  const isOpen = pathSplit.length > 2 && pathSplit[2] !== ''
  const imgPath = pathSplit[2] || ''
  const findIndex = imgs.findIndex(el => {
    return el.src.includes(imgPath)
  })

  useEffect(() => {
    isOpen ? document.body.classList.add('noscroll') : document.body.classList.remove('noscroll')
    return () => {
      document.body.classList.remove('noscroll')
    }
  })

  const handleClose = () => {
    history.push('/gallery')
  }

  const fullGallery = classNames('fullGallery', { open: isOpen })
  const burgerSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(200%,0,0)',
    config: { tension: 350, friction: 50 }
  })

  return (
    <div className={fullGallery}>
      <animated.div className="closeGallery" style={burgerSpring}>
        <Burger toggle={handleClose} open={isOpen} gallery />
      </animated.div>

      {/* <Loader active={loading} /> */}

      <AliceCarousel mouseTrackingEnabled>
        {[...imgs].map((item, index) => {
          return (
            <div key={item.src} className={'sliderWrapper'}>
              <div
                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          )
        })}
      </AliceCarousel>

      {/* <CarouselProvider
        naturalSlideWidth={1000}
        naturalSlideHeight={1000}
        totalSlides={imgs.length}
        currentSlide={findIndex}
        hasMasterSpinner={false}
        lockOnWindowScroll={true}
        infinite={true}

      >
        <Slider className={'mainGallery'} onChange={(e) => {
          console.log('e :', e)
        }}>
        {[...imgs].map((item, index) => {
            return (
              <Slide index={index} key={item.src}>
                  <Image
                    src={item.src}
                    isBgImage={true}
                    hasMasterSpinner={true}
                  >
                    </Image>
              </Slide>
            )
          })}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider> */}


        {/* <AwesomeSlider
          infiniteLoop
          useKeyboardArrows={true}
          onTransitionStart={() => {}}
          onTransitionRequest={e => {
            const next = e.eventName === 'next' ? 1 : -1
            const foo = (e.currentIndex + next) % imgs.length
            const finalIndex = foo < 0 ? imgs.length - 1 : foo
            const n = get(imgs, [finalIndex, 'src'], false)
            const name = n && n.split('/').pop().replace('.jpg', '')
            history.push(`/gallery/${name}`)
          }}
          showThumbs={false}
          selected={findIndex}
          startupScreen={<div />}
          cssModule={CarouselStyles}
          bullets={false}
        >
          {[...imgs].map((item, index) => {
            return (
              <div key={item.src} className={'sliderWrapper'}>
                <div

                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%'
                }}
              />
              </div>
            )
          })}
        </AwesomeSlider> */}
      }
    </div>
  )
}
