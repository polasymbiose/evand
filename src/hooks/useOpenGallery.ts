import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

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
