import React, { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  useSpring,
  animated,
  config,
  useTrail,
  useTransition
} from "react-spring";
import LazyLoad from "react-lazyload";
import { useRect } from "../../hooks/useRect";
import Plus from '../Plus/Plus'
import "./lazyImg.scss";
const classNames = require("classnames");

interface LazyImgProps {
  setPos: Dispatch<
    SetStateAction<{
      y: number;
      height: number;
      rect: any;
      index: number;
    }>
  >;
  src: string;
  alt: string;
  rest: boolean;
  active: boolean;
  index: number;
  setGalleryControls: Dispatch<SetStateAction<{ index: number; open: boolean; }>>
}

const captionElements = [
  <div className="captionHeadline">Lorem Ipsum</div>,
  <div>
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
  </div>
];

const LazyImg = (props: LazyImgProps) => {

  const spring = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  });

  useEffect(() =>{
    if (props.active) {
      const r = getRect()
      props.setPos(r)
    }
  }, [])

  const refContainer = useRef(null);
  const rect = useRect(refContainer);

  const captionTrail = useTrail(captionElements.length, {
    config,
    opacity: props.active ? 1 : 0,
    x: props.active ? 0 : -100,
    marginBottom: !props.active ? -100 : 0,
    from: { opacity: 0, x: 20 },
    delay: 100
  });

  const transitions = useTransition(!props.active, null, {
    from: {backgroundColor: 'rgba(34, 34, 34, 0)' },
    enter: {backgroundColor: 'rgba(34, 34, 34, .7)' },
    leave: {backgroundColor: 'rgba(34, 34, 34, 0)' }
  });

  const scrollToElement = () => {
    const ref = refContainer as React.MutableRefObject<any>
    if (ref) {
      window.scroll({ top: rect.y - ((window.innerHeight - rect.height) /2), behavior: 'smooth'})
    }
  }

  const getRect = () => {
    const y = window.scrollY;
    const top = rect.top;
    const pos = top - y;
    const height = rect.height;
    return {
      y: pos,
      height: height,
      rect: rect,
      index: props.index
    };
  }

  const handleClick = () => {
    const r = getRect()
    props.setPos(r);
    scrollToElement()
  };

  const handlePlusClick = () => {
    props.setGalleryControls({index: props.index, open: true})
  }

  return (
    <animated.div
      ref={refContainer}
      style={spring}
      className="lazyImg"
      onClick={handleClick}
    >
      <div>
        <div className="inactive">
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props} className="inactiveChild">
                </animated.div>
              )
          )}
        </div>
        <div className="caption" style={{ height: '100%' }}>
          <Plus open={props.active} toggle={handlePlusClick}/>
          {captionTrail.map(({ x, ...rest }, index) => {
            return (
              <animated.div
                key={`menuListItem${index}`}
                style={{
                  ...rest,
                  transform: `translate3d(${x}%,0,0)`
                }}
              >
                {captionElements[index]}
              </animated.div>
            );
          })}
        </div>
        <div className="imgWrapper">
          <img src={props.src} alt={props.alt} key={props.src} />
        </div>
      </div>
    </animated.div>
  );
};

export default LazyImg;
