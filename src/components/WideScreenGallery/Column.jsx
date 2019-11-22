import React, { useRef, useCallback } from 'react'
import { animated, useTransition } from 'react-spring'
import './Column.scss'
const padS = 24

const Column = ({ column, handleClick, colIndex }) => {
  const animating = useRef(true)
  const transitions = useTransition(column, item => item.src, {
    from: () => ({ height: 0, opacity: 0.5, marginBottom: 0, marginLeft: 12, marginRight: 12, backgroundSize: '90%' }),
    enter: ({ height }) => ({
      height,
      opacity: 1,
      marginBottom: padS,
      marginLeft: 12,
      marginRight: 12,
      backgroundSize: '100%'
    }),
    update: ({ height }) => {
      return { height, marginBottom: padS, marginLeft: 12, marginRight: 12, backgroundSize: '100%' }
    },
    onStart: () => (animating.current = true),
    onRest: () => (animating.current = false),
    leave: () => ({ height: 0, opacity: 0.3, marginBottom: 0, backgroundSize: '90%' }),
    config: { mass: 1, tension: 300, friction: 50 },
    unique: true,
    trail: 0
  })

  return (
    <>
      {transitions.map(({ item, props: { ...rest }, key }) => {
        const name = key
          .split('/')
          .pop()
          .replace('.jpg', '')
        return (
          <div className='listItem' key={`${key}-${item.index}-colIndex${colIndex}`} style={{ width: item.width }}>
            <animated.div
              onClick={handleClick(name)}
              src={item.thumb}
              style={{ backgroundImage: `url(${item.thumb})`, backgroundRepeat: 'no-repeat', ...rest }}
            />
            {/* <animated.div

              onClick={handleClick(item.index, animating.current)}
            /> */}
          </div>
        )
      })}
    </>
  )
}

// const Galleryimage = props => {
//   const [vis, setvis] = useState(false);
//   const mounted = useRef(false)
//   const image = useRef(new Image())

//   const handleInview = (a, b) => {
//     if (a) {
//       setvis(a)
//     }
//   }

//   const bounce = debounce(handleInview, 500, { leading: false })

//   useEffect(() => {
//     mounted.current = true

//     return  () => {
//       mounted.current = false
//     }
//   }, []);
//   const s = { ...props.rest }
//   const sVis =
//   return (
//     <InView
//       onChange={(inView, entry) => {
//         bounce(inView)
//       }}
//     >
//       <animated.div style={vis ? sVis : s} onClick={props.onClick} />
//     </InView>
//   )
// }

export default Column
