"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SiteHeader } from '@/components/layout/site-header';
import { ScrollCue } from '@/components/ui/scroll-cue';
import '@/lib/animations/home-hero.css';

export function HomeHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const root = rootRef.current;
    if (!root) return;

    const totalScrollPx = 1200;
    const previousHeight = document.body.style.height;
    const previousOverflowY = document.body.style.overflowY;
    const previousOverflowX = document.body.style.overflowX;

    const setBodyHeight = () => {
      document.body.style.height = `${window.innerHeight + totalScrollPx}px`;
      document.body.style.overflowY = 'scroll';
      document.body.style.overflowX = 'hidden';
    };

    const getScale = () => {
      const width = window.innerWidth;
      if (width <= 575) return 1.2;
      if (width <= 768) return 1.3;
      if (width <= 991) return 1.5;
      return 2;
    };

    const getTextSize = () => {
      const width = window.innerWidth;
      if (width <= 425) return '38px';
      if (width <= 575) return '51px';
      return '68px';
    };

    setBodyHeight();
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set('.site-logo', { x: -40, opacity: 0 });
      gsap.set('.site-menu', { x: 40, opacity: 0 });
      gsap.set('.hero-title-a', { y: 40, opacity: 0 });
      gsap.set('.hero-title-b', { y: 40, opacity: 0 });
      gsap.set('.hero-glass', { scale: 1.3, opacity: 0.01 });
      gsap.set('.hero-scroll-more', { opacity: 0 });
      gsap.set('.hero-scroll-more svg', { opacity: 0 });
      gsap.set('.hero-second-layer', { opacity: 0 });
      gsap.set('.glow-follow', { opacity: 0 });

      gsap.timeline({ defaults: { overwrite: true } })
        .to('.site-logo', { x: 0, opacity: 1, duration: 0.4, ease: 'power4.out' }, 0.2)
        .to('.site-menu', { x: 0, opacity: 1, duration: 0.4, ease: 'power4.out' }, 0.3)
        .to('.glow-follow', { opacity: 1, duration: 2.2, ease: 'power4.out' }, 1.4)
        .to('.hero-title-a', { y: 0, opacity: 0.7, duration: 0.6, ease: 'power3.out' }, 0.8)
        .to('.hero-title-b', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.0)
        .to('.hero-glass', { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.35)
        .to('.hero-scroll-more', { opacity: 1, duration: 1.4, ease: 'sine.out' }, 2.1)
        .to('.caret-down-1', { opacity: 1, duration: 1, ease: 'sine.out', repeat: -1, yoyo: true }, 2.2)
        .to('.caret-down-2', { opacity: 1, duration: 1, ease: 'sine.out', repeat: -1, yoyo: true }, 2.35)
        .to('.caret-down-3', { opacity: 1, duration: 1, ease: 'sine.out', repeat: -1, yoyo: true }, 2.5);

      const scrollTimeline = gsap.timeline({ paused: true });
      scrollTimeline
        .to('.hero-glass-inner', { scale: getScale(), duration: 0.8, ease: 'power3.out' })
        .to('.hero-word', { text: 'Next Because', duration: 0.8, ease: 'none', fontSize: getTextSize() }, '<')
        .to('.hero-scroll-more', { opacity: 0, duration: 0.4, ease: 'sine.out' }, 0.05)
        .to('.hero-second-layer', { opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.3)
        .to('.hero-content', { opacity: 0, y: -80, duration: 0.8, ease: 'power3.out' }, 1.9);

      ScrollTrigger.create({ start: 0, end: totalScrollPx, scrub: 1.5, animation: scrollTimeline });

      const onMouseMove = (event: MouseEvent) => {
        const glow = root.querySelector('.glow-follow');
        const word = root.querySelector<HTMLElement>('.hero-word');
        if (!glow || !word) return;
        const x = Math.round((event.clientX / window.innerWidth) * 100);
        const mappedX = -131 + ((114 + 131) * (x / 100));
        const mappedY = 11 + ((-10 - 11) * (x / 100));
        gsap.to(glow, { x: mappedX, y: mappedY, ease: 'sine.out', overwrite: 'auto' });
        const gradientAngle = 270 + ((90 - 270) * (x / 100));
        word.style.background = `linear-gradient(${gradientAngle}deg, #5c81ff 0%, #ff6a00 100%)`;
        word.style.backgroundClip = 'text';
        word.style.webkitBackgroundClip = 'text';
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', setBodyHeight);

      const menuTrigger = root.querySelector('.menu-trigger');
      const menuIconA = root.querySelector('.menu-line-a');
      const menuIconB = root.querySelector('.menu-line-b');
      const menuWrapper = root.querySelector<HTMLElement>('.menu-items-wrapper');
      const toggleItems = root.querySelectorAll('.toggle-item');
      let isOpen = false;

      const menuClick = () => {
        if (!menuWrapper || !menuIconA || !menuIconB) return;
        if (!isOpen) {
          menuWrapper.style.width = 'auto';
          const width = menuWrapper.scrollWidth;
          menuWrapper.style.width = '0px';
          gsap.timeline()
            .to(menuWrapper, { width, duration: 0.2, marginRight: '10px', ease: 'power2.out' })
            .to(toggleItems, { opacity: 1, x: 0, pointerEvents: 'auto', stagger: 0.1, duration: 0.2 }, '-=0.2');
          gsap.to(menuIconA, { rotate: 45, y: 4, duration: 0.2, ease: 'power2.out' });
          gsap.to(menuIconB, { rotate: -45, y: -4, duration: 0.2, ease: 'power2.out' });
        } else {
          gsap.timeline()
            .to(toggleItems, { opacity: 0, x: 20, pointerEvents: 'none', stagger: { each: 0.05, from: 'end' }, duration: 0.2 })
            .to(menuWrapper, { width: 0, marginRight: '0px', duration: 0.2, ease: 'power2.inOut' }, '-=0.1');
          gsap.to(menuIconA, { rotate: 0, y: 0, duration: 0.2, ease: 'power2.inOut' });
          gsap.to(menuIconB, { rotate: 0, y: 0, duration: 0.2, ease: 'power2.inOut' });
        }
        isOpen = !isOpen;
      };

      menuTrigger?.addEventListener('click', menuClick);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', setBodyHeight);
        menuTrigger?.removeEventListener('click', menuClick);
      };
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.body.style.height = previousHeight;
      document.body.style.overflowY = previousOverflowY;
      document.body.style.overflowX = previousOverflowX;
    };
  }, []);

  return (
    <div ref={rootRef} className="home-hero-root">
      <SiteHeader />
      <section id="home" className="hero-banner">
        <div className="hero-bg" />
        <div className="wrapper">
          <div className="hero-content">
            <h1 className="hero-title-a">Cracking</h1>
            <h1 className="hero-title-b glow">The Code Of</h1>
            <div className="hero-glass">
              <div className="hero-glass-inner">
                <div className="glass-card" />
                <h1 className="hero-word">Creativity</h1>
                <div className="word-glow-wrap">
                  <div className="glow-follow" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-second-layer" />
      </section>
      <ScrollCue />
    </div>
  );
}
