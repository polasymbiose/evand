import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import FullGallery from '../FullGallery/FullGallery'
import GalleryFilter from '../GalleryFilter/GalleryFilter'
import Page from '../Page/Page'
import WideScreenGallery from '../WideScreenGallery/WideScreenGallery'
import './GalleryComponent.scss'

export interface Images {
  src: string
  alt: string,
  thumb: string
  factor: number
}

const GalleryComponent = ({data}: {data: any}) => {
  const [gallery, setgallery] = useState()
  const allImgs = useRef<Images[]>([])
  const [imageFilter, setImageFilter] = useState<Images[]>([])
  const [checkbox] = useState(new Map())

  useEffect(()  => {
    if (!data.gallery) return
    const imgs = Object.keys(data.gallery).flatMap(key => data.gallery[key])
    allImgs.current = imgs
    setgallery(data.gallery)
    setImageFilter(imgs)
  }, [data])

  const merge = (a: any[], b: any[]) => a.filter(aa => !b.find(bb => aa.src === bb.src)).concat(b)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value
    const check = checkbox
    if (check.has(label)) {
      check.delete(label)
    } else {
      check.set(label, gallery[label])
    }
    arrangeFilter()
  }

  const arrangeFilter = () => {
    let filter: Images[] = []
    const check = checkbox
    // console.log('check :', check);
    check.forEach(imgAr => {
      filter = merge(filter, imgAr)
    })
    // console.log('filter :', filter, allImgs.current);
    filter.length > 0 ? setImageFilter(filter) : setImageFilter(allImgs.current)
  }

  return (
    <Page>
      <GalleryFilter handleChange={handleChange} gallery={gallery} checkbox={checkbox} />
      <WideScreenGallery imgs={imageFilter} render={(items: Images[]) => <FullGallery imgs={items} />} />
    </Page>
  )
}

export default React.memo(GalleryComponent)
