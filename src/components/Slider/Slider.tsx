import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback
} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSpring, animated, config, useTransition } from "react-spring";
import { Transition } from "react-spring/renderprops";

import "./Slider.scss";

interface SliderProps {
  setPos: Dispatch<
    SetStateAction<{
      y: number;
      height: number;
      rect: any;
      index: number;
    }>
  >;
  pos: {
    y: number;
    height: number;
    rect: any;
    index: number;
  };
  setRest: Dispatch<SetStateAction<boolean>>;
  rest: boolean;
  render: (
    setPos: Dispatch<
      SetStateAction<{
        y: number;
        height: number;
        rect: any;
        index: number;
      }>
    >,
    pos: {
      y: number;
      height: number;
      rect: any;
      index: number;
    },
    rest: boolean
  ) => React.ReactNode;
}

const Slider = ({ render, setPos, pos, setRest, rest }: SliderProps) => {
  const springProps = useSpring({
    config: { duration: 150, mass: 1, tension: 170, friction: 26 },
    to: {
      opacity: 1,
      height: pos.height,
      width: window.innerWidth,
      top: pos.rect.top - 64 // offsetTop - header
    },
  });

  return (
    <>
      <animated.div className="slider" style={springProps}>
      </animated.div>
      {render(setPos, pos, rest)}
    </>
  );
};

export default Slider;
