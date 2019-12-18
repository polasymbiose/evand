import React, { Dispatch, SetStateAction } from 'react'
import { Images } from '../GalleryComponent/GalleryComponent'
import LazyImg from '../LazyImg/LazyImg'
import '../LazyImg/lazyImg.scss'
import './gallery.scss'

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
