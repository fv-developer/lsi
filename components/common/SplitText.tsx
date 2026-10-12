'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay between letters/words in ms
  duration?: number; // duration of animation in seconds
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  useScrollTrigger?: boolean;
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  useScrollTrigger = false,
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Ensure fonts are loaded before animating
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      }
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Split content into DOM nodes based on splitType
  const splitContent = useMemo(() => {
    if (!text) return null;

    if (splitType.includes('chars')) {
      const words = text.split(' ');
      return words.map((word, wordIdx) => (
        <span
          key={`word-${wordIdx}-${word}`}
          className="split-word inline-block whitespace-nowrap"
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={`char-${wordIdx}-${charIdx}-${char}`}
              className="split-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    if (splitType.includes('words')) {
      const words = text.split(' ');
      return words.map((word, wordIdx) => (
        <span
          key={`word-${wordIdx}-${word}`}
          className="split-word inline-block whitespace-nowrap will-change-transform"
        >
          {word}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    // Default or lines
    return (
      <span className="split-line inline-block will-change-transform">
        {text}
      </span>
    );
  }, [text, splitType]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;

      const el = ref.current;

      // Select targets according to splitType
      let targets: NodeListOf<Element> | Element[] = [];
      if (splitType.includes('chars')) {
        targets = el.querySelectorAll('.split-char');
      } else if (splitType.includes('words')) {
        targets = el.querySelectorAll('.split-word');
      } else {
        targets = el.querySelectorAll('.split-line');
      }

      if (!targets.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      // Reset animation complete flag on text change
      animationCompletedRef.current = false;

      const tweenProps: gsap.TweenVars = {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        },
        willChange: 'transform, opacity',
        force3D: true,
      };

      if (useScrollTrigger) {
        tweenProps.scrollTrigger = {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
          anticipatePin: 0.4,
        };
      }

      const tween = gsap.fromTo(targets, { ...from }, tweenProps);

      return () => {
        tween.kill();
        if (useScrollTrigger) {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
        }
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        useScrollTrigger,
      ],
      scope: ref,
    }
  );

  const Tag = (tag || 'p') as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{
        textAlign,
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
      }}
      className={`split-parent inline-block ${className}`}
    >
      {splitContent}
    </Tag>
  );
};

export default SplitText;
