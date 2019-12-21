import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import Loader from '../Loader/Loader'
import useIsMounted from '../../hooks/useIsMounted'
import useInterval from '../../hooks/useInterval'
import './home.scss'
import { Images } from '../GalleryComponent/GalleryComponent'
var cn = require('classnames')

const Home = ({ data, init, setinit }: {data: any, init: boolean, setinit: (val: boolean) => void}) => {
  const [index, setindex] = useState(0)
  const imgAr: Images[] = get(data, ['home', 'slider'], [])
  const counter = useRef(0)
  const loading = !init
  const mounted = useIsMounted()
  const autoplay = () => {
    mounted &&
    imgAr.length > 0 &&
    setindex(i => (i + 1) % imgAr.length)
  }
  const stopAutoplay = useInterval(autoplay, 6000, [mounted, data])
  useEffect(() => {
    return () => stopAutoplay()
  }, [data])

  const handleOnLoad = () => {
    counter.current += 1
    counter.current >= imgAr.length &&
      setTimeout(() => {
        setinit(true)
        counter.current = 0
      }, 500)
  }

  return (
    <div className="home">
      <Loader active={loading} />
      {!loading && (
        <div className="bgWrapper">
          {imgAr.map((item, i) => {
            return (
              <div
                key={item.src}
                className={cn('bg', { visible: index === i })}
                style={{ backgroundImage: `url(${item.src})` }}
              />
            )
          })}
        </div>
      )}

      <div className="toGallery">
        {!loading && (
          <>
            <h1>
              {'Herzlich Willkommen bei '}
              <span>{'EVAND Design & Fotografie'}</span>
            </h1>
            <p>
              {'In der '}
              <Link to="/gallery/">
                <span>Galerie</span>
              </Link>
              {' findet ihr meine schönsten Arbeiten aus 2019. Ich bin gespannt was 2020 bereit hält. Seid ihr dabei?'}
              <br /> {'Dann würde ich mich freuen wenn wir einen Teil des Weges gemeinsam gehen. '}
              <Link to="/kontakt/">
                <span>Meldet euch für Anfragen gerne bei mir.</span>
              </Link>
            </p>
          </>
        )}
      </div>

      {loading && imgAr.map(img => <img className="hideSlider" src={img.src} onLoad={handleOnLoad} key={img.src} />)}
    </div>
  )
}
export default Home
