import { ATTRIBUTES } from "../constants";
import { SmoothScrollNav } from "../types";
import smoothScroll from "./smoothScroll";

interface INavigateOnClick extends Pick<SmoothScrollNav, "anchor"> {
  nav: HTMLElement | null;
  anchorElement: HTMLAnchorElement;
  event: MouseEvent;
  anchorElements?: NodeListOf<HTMLAnchorElement>;
}

function navigateOnClick(props: INavigateOnClick) {
  const { event, anchor, anchorElements, anchorElement, nav } = props;

  const activeClassName =
    anchor?.activeClassName || ATTRIBUTES.DEFAULT_CLASS_NAV_ACTIVE;
  anchorElements?.forEach((element) => {
    element.classList.remove(activeClassName);
  });

  const target = anchorElement.getAttribute("href");
  anchorElement.classList.add(activeClassName);

  if (anchor?.onClick) anchor.onClick.bind(anchorElement)(event);

  smoothScroll({
    nav,
    target,
  });

  window.history.pushState({}, "", target);
  event.preventDefault();
}

export default navigateOnClick;
