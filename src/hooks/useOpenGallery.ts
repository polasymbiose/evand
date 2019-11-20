import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { GlobalObservable } from './../App';

export default function useOpenGallery() {
  const observable = GlobalObservable.value
  const [openGallery, setopenGallery] = useState(observable.openGallery)
  useEffect(() => {
    const subscription = GlobalObservable.subscribe(val => {
      val.openGallery ? document.body.classList.add('noscroll') : document.body.classList.remove('noscroll')

      setopenGallery(val.openGallery)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return openGallery
}

export const OpenMenuObservable = new BehaviorSubject(false)

export function useOpenMenu() {
  useEffect(() => {
    const subscription = OpenMenuObservable.subscribe(val => {
      val ? document.body.classList.add('noscroll') : document.body.classList.remove('noscroll')
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
