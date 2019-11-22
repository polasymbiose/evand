import React, { useRef } from 'react';
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
  return (
    <Page>
      <GalleryFilter
        render={images => {
          return (
          <WideScreenGallery
            imgs={images}
            render={(items: any[]) => (
              <FullGallery imgs={items} />
            )}
          />
        )}}
      />
    </Page>
  )
}

export default React.memo(GalleryComponent)
