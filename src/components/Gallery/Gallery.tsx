import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import LazyImg from '../LazyImg/LazyImg'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSpring, useTransition, animated, config } from 'react-spring'
import { Spring, Transition } from 'react-spring/renderprops'
import { Images } from '../GalleryComponent/GalleryComponent'
import LazyLoad from 'react-lazyload'
import './gallery.scss'
import '../LazyImg/lazyImg.scss'
import { useRect } from '../../hooks/useRect'
const json = require('../../img.json')
const classNames = require('classnames')

interface GalleryProps {
  setPos: Dispatch<
    SetStateAction<{
      y: number
      height: number
      rect: any
      index: number
    }>
  >
  imgs: Images[]
  pos: {
    y: number
    height: number
    rect: any
    index: number
  }
  rest: boolean
  setGalleryControls: Dispatch<SetStateAction<{ index: number; open: boolean; }>>
}

const Gallery = ({ setPos, pos, rest, setGalleryControls, imgs }: GalleryProps) => {
  const renderGallery = () => {
    return imgs.map((image, i) => {
      const active = i === pos.index
      return (
        <LazyImg
          src={image.src}
          alt={image.alt}
          key={image.src}
          setPos={setPos}
          rest={rest && active}
          active={active}
          setGalleryControls={setGalleryControls}
          index={i}
        />
      )
    })
  }

  return <div className="gallery">{renderGallery()}</div>
}
export default Gallery
