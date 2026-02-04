import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Flashback from './components/Flashback';
import Registration from './components/Registration';

import Navbar from './components/Navbar';

// Register standard plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    // Global animation context
    const ctx = gsap.context(() => {
      // Any global scroll triggers or listeners can go here
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="app-container">
      <Navbar />
      <Hero />
      <EventDetails />
      <Flashback />
      <Registration />
    </div>
  );
}

export default App;
