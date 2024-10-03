import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { SmoothScrollNav as ISmoothScrollNav } from "./types";
import { navigateOnClick, smoothScroll } from "./lib";
import { ATTRIBUTES } from "./constants";

const SmoothScrollNav = forwardRef<
  HTMLElement,
  PropsWithChildren<ISmoothScrollNav>
>((props, ref) => {
  const { children, className, anchor } = props;
  const innerRef = useRef<HTMLElement>(null);
  const anchorElementsRef = useRef<NodeListOf<HTMLAnchorElement>>();

  useImperativeHandle(ref, () => innerRef.current!, []);

  const handlerOnClick = function (this: HTMLAnchorElement, event: MouseEvent) {
    return navigateOnClick({
      nav: innerRef.current,
      anchorElement: this,
      anchorElements: anchorElementsRef.current,
      event,
      anchor,
    });
  };

  useEffect(() => {
    if (innerRef.current) {
      const nav = innerRef.current;

      const anchorElements = nav.querySelectorAll("a");
      anchorElementsRef.current = anchorElements;
      anchorElements.forEach((element) =>
        element.addEventListener("click", handlerOnClick)
      );

      const { hash } = window.location;
      if (hash) {
        const activeClassName =
          anchor?.activeClassName || ATTRIBUTES.DEFAULT_CLASS_NAV_ACTIVE;
        nav.querySelector(`a[href="${hash}"]`)?.classList.add(activeClassName);
        smoothScroll({
          nav,
          target: hash,
        });
      }
    }
  }, [innerRef]);

  return (
    <nav
      className={`${ATTRIBUTES.DEFAULT_CLASS_NAV} ${className ?? ""}`}
      ref={innerRef}
    >
      {children}
    </nav>
  );
});

export default SmoothScrollNav;
