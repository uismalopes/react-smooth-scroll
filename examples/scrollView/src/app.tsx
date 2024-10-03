import { createRef, useEffect } from "react";
import "./style.css";
import { SmoothScrollView, SmoothScrollNav } from "react-smooth-scroll";

function App() {
  const refScrollView = createRef<HTMLDivElement>();
  const refScrollNav = createRef<HTMLElement>();

  const handlerOnClick = function (this: HTMLAnchorElement, event: MouseEvent) {
    console.log(this, event);
  };

  useEffect(() => {
    console.log({
      refScrollNav: refScrollNav.current,
      refScrollView: refScrollView.current,
    });
  }, [refScrollNav, refScrollView]);

  return (
    <>
      <SmoothScrollView ref={refScrollView} className="test-scroll">
        <SmoothScrollNav
          ref={refScrollNav}
          className="test-nav"
          anchor={{
            onClick: handlerOnClick,
            activeClassName: "test-active",
          }}
        >
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">Sobre</a>
            </li>
          </ul>
        </SmoothScrollNav>

        <section id="home">
          <h1>Home</h1>
        </section>

        <section id="about">
          <h1>Sobre</h1>
        </section>
      </SmoothScrollView>
    </>
  );
}

export default App;
