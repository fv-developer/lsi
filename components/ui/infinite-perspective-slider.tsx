"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

const DEFAULT_ROOT_MARGIN = "256px";

type RafRoot = Element | null | { current: Element | null } | (() => Element | null);

function resolveElement(root: RafRoot): Element | null {
  if (!root) return null;
  if (typeof root === "function") return root() ?? null;
  if (typeof root === "object" && "current" in root) return root.current ?? null;
  return root;
}

interface VisibilityGateOptions {
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
  onChange?: (active: boolean) => void;
}

interface VisibilityGate {
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createVisibilityGate({
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
  onChange,
}: VisibilityGateOptions = {}): VisibilityGate {
  let tabVisible =
    typeof document === "undefined" ? true : !document.hidden;
  let onscreen = true;
  let destroyed = false;
  let observer: IntersectionObserver | null = null;

  const isActive = () => {
    if (destroyed) return false;
    if (observeTab && !tabVisible) return false;
    if (observeOffscreen && resolveElement(root) && !onscreen) return false;
    return true;
  };

  let lastActive = isActive();

  const emit = () => {
    if (destroyed) return;
    const next = isActive();
    if (next === lastActive) return;
    lastActive = next;
    onChange?.(next);
  };

  const onVisibilityChange = () => {
    tabVisible = !document.hidden;
    emit();
  };

  if (observeTab && typeof document !== "undefined") {
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  const bindObserver = () => {
    if (!observeOffscreen || typeof IntersectionObserver === "undefined") {
      return;
    }

    const el = resolveElement(root);
    if (!el) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onscreen = entry.isIntersecting;
        }
        emit();
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
  };

  bindObserver();

  return {
    get isActive() {
      return isActive();
    },

    observe(nextRoot?: RafRoot) {
      if (destroyed) return;
      if (nextRoot != null) root = nextRoot;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      onscreen = true;
      bindObserver();
      emit();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (observeTab && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },
  };
}

interface SuspendedRafOptions {
  onFrame: (time: number) => void;
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
}

interface SuspendedRaf {
  start: () => void;
  stop: () => void;
  readonly isRunning: boolean;
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createSuspendedRaf({
  onFrame,
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
}: SuspendedRafOptions): SuspendedRaf {
  if (typeof onFrame !== "function") {
    throw new TypeError("createSuspendedRaf: onFrame is required");
  }

  let rafId: number | null = null;
  let running = false;
  let destroyed = false;

  const stopRaf = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const tick = (time: number) => {
    rafId = null;
    if (destroyed || !running || !gate.isActive) return;
    onFrame(time);
    if (!destroyed && running && gate.isActive) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const sync = () => {
    if (destroyed) return;
    if (running && gate.isActive) {
      if (rafId == null) {
        rafId = requestAnimationFrame(tick);
      }
    } else {
      stopRaf();
    }
  };

  const gate = createVisibilityGate({
    root,
    rootMargin,
    threshold,
    observeTab,
    observeOffscreen,
    onChange: sync,
  });

  return {
    start() {
      if (destroyed) return;
      running = true;
      sync();
    },

    stop() {
      running = false;
      stopRaf();
    },

    get isRunning() {
      return running;
    },

    get isActive() {
      return gate.isActive;
    },

    observe(nextRoot?: RafRoot) {
      gate.observe(nextRoot);
      sync();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      running = false;
      stopRaf();
      gate.destroy();
    },
  };
}

export interface InfinitePerspectiveSliderItemData {
  src?: string;
  tag?: string;
  campus?: string;
  tags?: string[];
  badge?: string;
  number?: string | number;
  title?: string;
  desc?: string;
  description?: string;
}

export type InfinitePerspectiveSliderItem = string | InfinitePerspectiveSliderItemData;

const getItemData = (
  item: InfinitePerspectiveSliderItem
): InfinitePerspectiveSliderItemData =>
  typeof item === "string" ? { src: item } : item;

const defaultImages: InfinitePerspectiveSliderItem[] = [
  {
    src: "/images/campus-activity/masterclass/Millet-Masterclass-with-Priyanka-Vithlani.webp",
    tag: "Masterclass",
    campus: "Malad Campus",
    title: "Luke Coutinho & Industry Masterclasses",
    desc: "Interactive clinical protocols, cellular nutrition & practical case briefings.",
  },
  {
    src: "/images/campus-activity/workshop/Breastfeeding-week-Workshop-Dr.-Pooja-Singhania.jpg",
    tag: "Workshops",
    campus: "Ghatkopar Campus",
    title: "Practical Clinical & Lifestyle Workshops",
    desc: "Hands-on first-aid emergencies, expressive art therapy & mindful breathing.",
  },
  {
    src: "/images/campus-activity/industry-visit/Amul-Factory-Visit.webp",
    tag: "Industry Visits",
    campus: "Mumbai Campus",
    title: "Food Processing & Laboratory Visits",
    desc: "Field visits to Amul and National Food Labs for food chemistry & QC standards.",
  },
  {
    src: "/images/campus-activity/in-house-event/Samagra.webp",
    tag: "Conferences",
    campus: "Kalyan Campus",
    title: "Samagra & Inter-Collegiate Conferences",
    desc: "Annual holistic wellness conclaves, research presentations & health drives.",
  },
  {
    src: "/images/campus-activity/masterclass/Mindful-Eating-Masterclass.webp",
    tag: "Masterclass",
    campus: "Malad Campus",
    title: "Mindful Eating & Cellular Therapeutics",
    desc: "Evidence-based metabolic nutrition and therapeutic recipe standardisation.",
  },
  {
    src: "/images/campus-activity/workshop/First-Aid.webp",
    tag: "Practical Labs",
    campus: "Ghatkopar Campus",
    title: "Emergency Life Support Training",
    desc: "Practical first-aid certification, triage and life-saving clinical handling.",
  },
  {
    src: "/images/campus-activity/industry-visit/National-Food-Laboratory-Visit.webp",
    tag: "Food Testing",
    campus: "Mumbai Campus",
    title: "National Food Laboratory Exposure",
    desc: "Direct study of commercial food testing standards and analytical chemistry.",
  },
  {
    src: "/images/campus-activity/in-house-event/Sports-Day.jpg",
    tag: "Student Life",
    campus: "Kalyan Campus",
    title: "Sports & Community Outreach",
    desc: "Inter-collegiate sports tournaments, yoga days and student leadership initiatives.",
  },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const DEFAULT_CARD_WIDTH = 340;
const DEFAULT_CARD_GAP = 24;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;
const MOBILE_CARD_WIDTH = 260;
const MOBILE_CARD_GAP = 16;
const TABLET_CARD_WIDTH = 320;
const TABLET_CARD_GAP = 20;

interface CardSetter {
  x: (value: number | string) => void;
  rotateY: (value: number | string) => void;
}

interface SliderConfig {
  cardWidth: number;
  scrollSpeed: number;
  scrollLerp: number;
  velocityLerp: number;
  rotationSensitivity: number;
  rotationDamp: number;
  rotationLerp: number;
  maxRotation: number;
}

export interface InfinitePerspectiveSliderProps {
  images?: InfinitePerspectiveSliderItem[];
  cardWidth?: number;
  cardGap?: number;
  perspective?: number;
  scrollSpeed?: number;
  scrollLerp?: number;
  velocityLerp?: number;
  rotationSensitivity?: number;
  rotationDamp?: number;
  rotationLerp?: number;
  maxRotation?: number;
  showContent?: boolean;
  showDescription?: boolean;
}

export function InfinitePerspectiveSlider({
  images = defaultImages,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardGap = DEFAULT_CARD_GAP,
  perspective = 2200,
  scrollSpeed = 1.0,
  scrollLerp = 0.1,
  velocityLerp = 0.09,
  rotationSensitivity = 0.025,
  rotationDamp = 0.1,
  rotationLerp = 0.12,
  maxRotation = 80,
  showContent = true,
  showDescription = false,
}: InfinitePerspectiveSliderProps) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const settersRef = useRef<CardSetter[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [viewportWidth, setViewportWidth] = useState(DEFAULT_CARD_WIDTH * 4);

  const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
  const isTabletViewport =
    viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT;

  const resolvedCardWidth = isMobileViewport
    ? MOBILE_CARD_WIDTH
    : isTabletViewport
      ? TABLET_CARD_WIDTH
      : cardWidth;

  const resolvedCardGap = isMobileViewport
    ? MOBILE_CARD_GAP
    : isTabletViewport
      ? TABLET_CARD_GAP
      : cardGap;

  const cardStep = resolvedCardWidth + resolvedCardGap;

  const cardHeight = showContent
    ? showDescription
      ? isMobileViewport
        ? "calc(48vh + 130px)"
        : isTabletViewport
          ? "calc(52vh + 140px)"
          : "calc(54vh + 150px)"
      : isMobileViewport
        ? "calc(48vh + 75px)"
        : isTabletViewport
          ? "calc(52vh + 80px)"
          : "calc(54vh + 85px)"
    : isMobileViewport
      ? 360
      : isTabletViewport
        ? 410
        : 450;

  const stateRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    smoothVelocity: 0,
    rotationVelocity: 0,
    currentRotation: 0,
    prevDirection: 0,
    isDragging: false,
    lastX: 0,
  });

  const configRef = useRef<SliderConfig>({
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
  });

  configRef.current = {
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
  };

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const initSetters = () => {
    if (!stripRef.current) return;

    settersRef.current = Array.from(stripRef.current.children).map(
      (element) =>
        ({
          x: gsap.quickSetter(element, "x", "px"),
          rotateY: gsap.quickSetter(element, "rotateY", "deg"),
        }) as CardSetter
    );
  };

  const positionCards = useCallback(
    (offset: number, rotation: number) => {
      const strip = stripRef.current;

      if (!strip || !images.length) return;

      const cards = strip.children;
      const setters = settersRef.current;

      const count = images.length;
      const loopWidth = count * cardStep;

      const viewW = window.innerWidth;
      const centerX = viewW / 2;
      const centreOffset = centerX - configRef.current.cardWidth / 2;

      for (let index = 0; index < cards.length; index += 1) {
        let x = index * cardStep - offset + centreOffset;

        x = ((x % loopWidth) + loopWidth) % loopWidth;

        if (x > loopWidth - cardStep) {
          x -= loopWidth;
        }

        setters[index]?.x(x);
        setters[index]?.rotateY(rotation);
      }
    },
    [cardStep, images]
  );

  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;
    const reducedMotion = prefersReducedMotion();

    initSetters();

    const tick = () => {
      if (reducedMotion) {
        state.current = state.target;
        state.velocity = 0;
        state.smoothVelocity = 0;
        state.rotationVelocity = 0;
        state.currentRotation = 0;
      } else {
        const config = configRef.current;
        state.current = lerp(state.current, state.target, config.scrollLerp);
        state.velocity = state.target - state.current;

        state.smoothVelocity = lerp(
          state.smoothVelocity,
          state.velocity,
          config.velocityLerp
        );

        state.rotationVelocity = lerp(
          state.rotationVelocity,
          state.velocity,
          config.rotationDamp
        );

        const absVel = Math.abs(state.rotationVelocity);
        const sign = Math.sign(state.rotationVelocity);
        const targetRotation = sign * absVel * config.rotationSensitivity;

        state.currentRotation = lerp(
          state.currentRotation,
          targetRotation,
          config.rotationLerp
        );
      }

      const finalRotation = clamp(
        state.currentRotation,
        -configRef.current.maxRotation,
        configRef.current.maxRotation
      );

      if (Math.abs(state.current - state.target) < 0.05) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;

        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current, finalRotation);
    };

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY;
      state.target += delta * configRef.current.scrollSpeed;
    };

    const onDown = (clientX: number) => {
      state.isDragging = true;
      state.lastX = clientX;
    };

    const onMove = (clientX: number) => {
      if (!state.isDragging) return;

      const delta = clientX - state.lastX;
      state.lastX = clientX;
      state.target += -delta * configRef.current.scrollSpeed;
    };

    const onUp = () => {
      state.isDragging = false;
    };

    const handleMouseDown = (event: MouseEvent) => onDown(event.clientX);
    const handleMouseMove = (event: MouseEvent) => onMove(event.clientX);
    const handleMouseUp = () => onUp();

    const handleTouchStart = (event: TouchEvent) =>
      onDown(event.touches[0].clientX);
    const handleTouchMove = (event: TouchEvent) =>
      onMove(event.touches[0].clientX);
    const handleTouchEnd = () => onUp();

    const onResize = () => {
      initSetters();
      positionCards(state.current, state.currentRotation);
    };

    state.current = 0;
    state.target = 0;
    state.velocity = 0;
    state.smoothVelocity = 0;
    state.rotationVelocity = 0;
    state.currentRotation = 0;
    state.prevDirection = 0;

    positionCards(0, 0);
    gsap.set(cardRefs.current, { opacity: 1 });

    const loop = createSuspendedRaf({
      root: stripRef,
      onFrame: tick,
    });
    loop.start();

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      loop.destroy();

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cardStep, images, positionCards]);

  return (
    <div
      className={
        showContent
          ? showDescription
            ? "h-[80vh] min-h-[580px] max-h-[820px] w-full overflow-hidden relative"
            : "h-[72vh] min-h-[490px] max-h-[660px] w-full overflow-hidden relative"
          : "h-[440px] sm:h-[490px] lg:h-[530px] w-full overflow-hidden relative"
      }
    >
      <div
        className="pointer-events-none relative flex h-full items-center overflow-hidden max-[1025px]:items-center"
        style={{ perspective }}
      >
        <div
          ref={stripRef}
          className="transform-3d relative w-full"
          style={{ height: cardHeight }}
        >
          {images.map((item, index) => {
            const itemData = getItemData(item);
            const { src, tag, campus, tags, badge, title, desc, description } = itemData;
            const displayTag = tag || badge;

            return (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="pointer-events-auto absolute left-0 top-0 will-change-transform group cursor-grab active:cursor-grabbing select-none"
                style={{
                  width: resolvedCardWidth,
                  height: cardHeight,
                  transformOrigin: "center center",
                  transform: "translateZ(1px)",
                }}
              >
                {/* 1. Image */}
                <div
                  className={`relative ${
                    showContent
                      ? "h-[48vh] sm:h-[52vh] lg:h-[54vh] min-h-[320px] max-h-[460px]"
                      : "h-full"
                  } w-full overflow-hidden rounded-[18px] bg-slate-200 border border-zinc-200/80 shadow-lg transition-all duration-300 group-hover:shadow-2xl`}
                >
                  <img
                    src={src}
                    alt={title || `slide-${index}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 2. TAGS & Heading (Paragraph removed as requested) */}
                {showContent && (
                  <div className="mt-3.5 space-y-1.5 px-0.5 text-left">
                    {/* TAGS (Category & Campus) */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      {displayTag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#314b83]/10 border border-[#314b83]/20 text-[11px] font-semibold text-[#314b83] uppercase tracking-wider">
                          {displayTag}
                        </span>
                      )}
                      {campus && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                          {campus}
                        </span>
                      )}
                      {Array.isArray(tags) &&
                        tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                              tIdx === 0
                                ? "bg-[#314b83]/10 border border-[#314b83]/20 text-[#314b83]"
                                : "bg-emerald-500/15 border border-emerald-500/25 text-emerald-800"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                    </div>

                    {/* Heading */}
                    <h6 className="text-base sm:text-lg font-heading font-bold text-zinc-950 leading-snug tracking-tight line-clamp-2 transition-colors duration-200 group-hover:text-[#314b83]">
                      {title}
                    </h6>

                    {/* Short Paragraph - only if showDescription is true */}
                    {showDescription && (desc || description) && (
                      <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 line-clamp-2 font-normal">
                        {desc || description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InfinitePerspectiveSlider;
