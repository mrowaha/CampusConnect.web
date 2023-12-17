import * as React from "react";

export function useEffectAfterMount(callback : () => any, arr : any[]) {
  const didMountRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      console.log("no loading");
      return callback();
    } else {
      console.log("on mount");
      didMountRef.current = true;
    }
  }, arr)

}