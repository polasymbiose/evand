import React, { useRef, useState, useEffect } from 'react';
import FullGallery from '../FullGallery/FullGallery';
import GalleryFilter from '../GalleryFilter/GalleryFilter';
import Page from '../Page/Page';
import '../Page/page-transition.scss';
import WideScreenGallery from '../WideScreenGallery/WideScreenGallery';
import './GalleryComponent.scss';
import { Route } from 'react-router-dom';

export interface Images {
  src: string
  alt: string
}

const GalleryComponent = () => {

  const [json, setjson] = useState()
  const isMounted = useRef(false)
  const initJson = useRef<any[]>([])
  const [imageFilter, setImageFilter] = useState<any[]>([])
  const [checkbox] = useState(new Map())

  useEffect(() => {
    isMounted.current = true

    fetch(`${process.env.PUBLIC_URL}/img.json`)
      .then(async res => {
        const r = await res.json()
        const { gallery } = r
        isMounted.current && setjson(gallery)

        let imgs: any[] = []
        isMounted.current &&
          Object.keys(gallery).forEach(key => {
            const category = gallery[key]
            imgs = imgs.concat(category)
          })
        initJson.current = imgs
        setImageFilter(imgs)
      })
      .catch()

    return () => {
      isMounted.current = false
    }
  }, [])

  const merge = (a: any[], b: any[]) => a.filter(aa => !b.find(bb => aa.src === bb.src)).concat(b)

  const handleChange = (e: any) => {
    const label = e.target.value
    const check = checkbox
    if (check.has(label)) {
      check.delete(label)
    } else {
      check.set(label, json[label])
    }
    arrangeFilter()
  }

  const arrangeFilter = () => {
    let filter: any[] = []
    const check = checkbox
    check.forEach(ar => {
      filter = merge(filter, ar)
    })
    filter.length > 0 ? setImageFilter(filter) : setImageFilter(initJson.current)
  }


  return (
    <Page>
      <GalleryFilter
      handleChange={handleChange}
      json={json}
      checkbox={checkbox}
      />
      <WideScreenGallery
            imgs={imageFilter}
            render={(items: any[]) => (
              <FullGallery imgs={items} />
            )}
          />
    </Page>
  )
}

export default React.memo(GalleryComponent)
