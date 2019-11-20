import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash/shuffle";
import data from "./data.js";
import "./styles.scss";

const List = () => {
  const [rows, set] = useState(data);
  useEffect(() => void setInterval(() => set(shuffle), 20000), []);

  let height = 0;
  const transitions = useTransition(
    rows.map(data => ({ ...data, y: (height += data.height) - data.height })),
    d => d.name,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height })
    }
  );

  return (
    <div className="list" >
      {/* @ts-ignore */}
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => {
        return (
          <animated.div
            key={key}
            className="card"
            style={{
              zIndex: data.length - index,
              //@ts-ignore
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
            }}
          >
            <div className="cell">
              <div className="details" style={{ backgroundColor: item.css, height: `${item.height}px` }} />
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};

export default List;
