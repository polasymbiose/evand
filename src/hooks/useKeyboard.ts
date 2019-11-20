import { useEffect } from 'react';

export default function useKeyboard(targetKey: string, callback?: () => void) {
  // const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }: any) {
    if (key === targetKey) {
      callback && callback()
      // setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: any) => {
    if (key === targetKey) {
      // setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [])
}

