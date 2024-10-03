interface ISmoothScroll {
  nav: HTMLElement | null;
  target: string | null;
}

function deprecatedScrollToElement(
  element: HTMLElement,
  duration: number = 1000
) {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

function smoothScroll(props: ISmoothScroll) {
  const { nav, target } = props;
  if (!nav || !target) return;

  const isFixedPositionNav =
    getComputedStyle(nav).getPropertyValue("position") === "fixed";

  const heightToConsider = (isFixedPositionNav && nav.clientHeight) || 0;

  const targetScroll = document.querySelector(target) as HTMLElement;
  const scrollTop = targetScroll.offsetTop - heightToConsider;

  try {
    window.scroll({
      top: scrollTop,
      behavior: "smooth",
    });
  } catch (error) {
    deprecatedScrollToElement(targetScroll, 500);
  }
}

export default smoothScroll;
