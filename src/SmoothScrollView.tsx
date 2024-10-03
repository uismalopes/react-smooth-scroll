import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { SmoothScrollView as ISmoothScrollView } from "./types";
import { ATTRIBUTES } from "./constants";

const SmoothScrollView = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ISmoothScrollView>
>((props, ref) => {
  const { children, className } = props;
  const innerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return innerRef.current!;
    },
    []
  );

  return (
    <div
      ref={innerRef}
      className={`${ATTRIBUTES.DEFAULT_CLASS_VIEW} ${className ?? ""}`}
    >
      {children}
    </div>
  );
});

export default SmoothScrollView;
