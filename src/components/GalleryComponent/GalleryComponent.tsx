import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import FullGallery from '../FullGallery/FullGallery'
import GalleryFilter from '../GalleryFilter/GalleryFilter'
import Page from '../Page/Page'
import WideScreenGallery from '../WideScreenGallery/WideScreenGallery'
import '../Page/page-transition.scss'
import './GalleryComponent.scss'

export interface Images {
  src: string
  alt: string,
  thumb: string
  factor: number
}

const GalleryComponent = () => {
  const [gallery, setgallery] = useState()
  const allImgs = useRef<Images[]>([])
  const [imageFilter, setImageFilter] = useState<Images[]>([])
  const [checkbox] = useState(new Map())

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/img.json`)
      .then(async res => {
        const r = await res.json()
        const img = Object.keys(r.gallery).flatMap(key => r.gallery[key])
        allImgs.current = img
        setgallery(r.gallery)
        setImageFilter(img)
      })
      .catch(e => {
        console.log('errof fetching:', e)
      })
  }, [])

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
    check.forEach(imgAr => {
      filter = merge(filter, imgAr)
    })
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
