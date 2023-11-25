import * as React from "react";

export function useEffectAfterMount() {
  const didMountRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      // run callback
    } else {
      didMountRef.current = true;
    }
  }, [])

}