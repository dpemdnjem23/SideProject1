import { useCallback, useEffect, useRef } from "react";

const useScrollFadeOut = (duration:number,delay:number) => {
  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    const { current }:any = dom;

    if (entry.isIntersecting) {
console.log('dndndn')

      current.style.transitionProperty = "all";
      current.style.transitionDuration = `${duration}s`;
      current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
      current.style.transitionDelay = `${delay}s`;
      current.style.opacity = 1;
      current.style.transform = "translate3d(0, 0, 0)";
    }
    if(!entry.isIntersecting){
console.log('벗어났습니다')
current.style.transform= "translate3d(0, 50%, 0)"


    }
  }, [delay,duration]);

  useEffect(() => {
    let observer: any;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: "translate3d(0, 50%, 0)",
    },
  };
};

export default useScrollFadeOut;
