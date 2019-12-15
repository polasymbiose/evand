import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import '../Page/page-transition.scss'
import './home.scss'
var classNames = require('classnames')

const json = require('../../img.json')

const Home = () => {
  const [index, set] = useState(0)
  const imgAr = json.home.slider

  const isMounted = useRef(false)
  const counter = useRef(0)
  const [loading, setloading] = useState(true)

  useEffect(() => void setInterval(() => isMounted.current && set(state => (state + 1) % imgAr.length), 6000), [imgAr])

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleOnLoad = () => {
    counter.current += 1
    if (counter.current >= imgAr.length) {
      setTimeout(() => {
        setloading(false)
        counter.current = 0
      }, 1000)
    }
  }

  return (
    <div className="home">
      <Loader active={loading} />
      {!loading && (
        <div className="bgWrapper">
          {imgAr.map((item, i) => {
            const imageClassNames = classNames('bg', { visible: index === i })
            return <div key={item.src} className={imageClassNames} style={{ backgroundImage: `url(${item.src})` }} />
          })}
        </div>
      )}

      <div className="toGallery">
        {!loading && (
          <>
            <h1>{'Herzlich Willkommen bei '}
              <span>
              {'EVAND Design & Fotografie'}
              </span>
            </h1>
            <p>
              {'In der '}
              <Link to="/gallery/">
                <span>Gallerie</span>
              </Link>
              {
                ' findet ihr meine schönsten Arbeiten aus 2019. Ich bin gespannt was 2020 bereit hält. Seid ihr dabei?'}<br/> {'Dann würde ich mich freuen wenn wir einen Teil des Weges gemeinsam gehen. '
              }
              <Link to="/kontakt/">
                <span>Meldet euch für Anfragen gerne bei mir.</span>
              </Link>
            </p>
          </>
        )}
      </div>

      {loading &&
        json.home.slider.map(img => {
          return <img className="hideSlider" src={img.src} onLoad={handleOnLoad} key={img.src} />
        })}
    </div>
  )
}
export default Home
