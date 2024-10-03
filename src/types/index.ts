export interface SmoothScrollView {
  className?: string;
}

export interface SmoothScrollNav {
  className?: string;
  anchor?: {
    activeClassName?: string;
    onClick: (this: HTMLAnchorElement, event: MouseEvent) => void;
  };
}
