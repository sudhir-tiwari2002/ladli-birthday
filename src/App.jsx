import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import GALLERY_PHOTOS from './galleryPhotos'
import './App.css'

const DISPLAY_NAME = 'Iti'
const NICKNAME_LINE = '(Ladli Upadhyay)'
const BIRTHDAY_LABEL = '15 October'

const FASHION_LINES = [
  'Red is not just a colour — it’s a whole mood.',
  'Style is a way to say who you are — without speaking.',
  'Walk in like the runway is yours. (It is.)',
]

const WISH_PARAGRAPHS = [
  'To our dearest sali Iti — you bring grace, sparkle, and impeccable taste wherever you go.',
  'May this year dress you in joy, confidence, and adventures as bold as your fashion sense.',
  'Happy Birthday, Ladli. Shine bright on 15 October and every day after.',
]

const BIRTHDAY_QUOTES = [
  {
    text: 'Happy Birthday! May every candle on your cake light up a dream come true.',
    tag: 'Dreams',
  },
  {
    text: 'Wishing you a year wrapped in health, happiness, and endless style.',
    tag: 'Style',
  },
  {
    text: 'May today be the opening scene of your most dazzling chapter yet.',
    tag: 'New chapter',
  },
  {
    text: 'Another year bolder, brighter, and more fabulous — that’s the Ladli way.',
    tag: 'Fabulous',
  },
  {
    text: 'May your smile shine brighter than the candles and warmer than the sun.',
    tag: 'Joy',
  },
  {
    text: 'Life is a party — dress like it, live like it, and own every moment.',
    tag: 'Celebrate',
  },
  {
    text: 'Sending you laughter that lingers, love that surrounds you, and magic in every hour.',
    tag: 'Love',
  },
  {
    text: 'On your special day, may you feel as cherished as you make everyone around you feel.',
    tag: 'Blessings',
  },
  {
    text: 'Here’s to a birthday as vibrant as red on the runway and as golden as your heart.',
    tag: 'Runway',
  },
  {
    text: 'Cheers to you, Iti — today the world celebrates someone truly one of a kind.',
    tag: 'For you',
  },
]

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function ConfettiBurst({ active }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => ({
        id: i,
        x: randomBetween(-40, 40),
        delay: randomBetween(0, 0.35),
        rotate: randomBetween(0, 360),
        color: ['#ff2d55', '#ff6b6b', '#ffd700', '#ffffff', '#e63946'][
          Math.floor(Math.random() * 5)
        ],
        size: randomBetween(6, 14),
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="confetti-piece"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size * 0.6,
          }}
          initial={{
            opacity: 1,
            y: '45vh',
            x: `${randomBetween(42, 58)}vw`,
            rotate: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            y: randomBetween(-120, -280),
            x: `calc(50vw + ${p.x}vw)`,
            rotate: p.rotate + 180,
          }}
          transition={{ duration: 2.8, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function FloatingIcons() {
  const icons = ['✦', '♥', '✧', '◆', '❋']
  return (
    <div className="floating-icons" aria-hidden="true">
      {icons.map((icon, i) => (
        <motion.span
          key={icon}
          className="float-icon"
          animate={{
            y: [0, -18, 0],
            opacity: [0.3, 0.85, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          style={{ left: `${12 + i * 16}%`, top: `${20 + (i % 3) * 22}%` }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  )
}

function RunwayLights() {
  return (
    <div className="runway-lights" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="runway-beam"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.65, 0.15] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function LetterReveal({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="letter"
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.08 * i,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function HeroPhotoStack() {
  const stack = GALLERY_PHOTOS.slice(0, 5)

  return (
    <div className="hero-photo-stack" aria-hidden="true">
      {stack.map((photo, i) => (
        <motion.div
          key={photo.src}
          className="hero-photo-frame"
          style={{ zIndex: stack.length - i }}
          initial={{ opacity: 0, scale: 0.85, rotate: -8 + i * 4 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [-6 + i * 3, -4 + i * 3, -6 + i * 3],
            y: [0, -6 - i * 2, 0],
          }}
          transition={{
            opacity: { delay: 0.3 + i * 0.12, duration: 0.7 },
            scale: { delay: 0.3 + i * 0.12, type: 'spring', stiffness: 120 },
            rotate: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <img src={photo.src} alt="" loading="eager" />
        </motion.div>
      ))}
    </div>
  )
}

function SpotlightCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % GALLERY_PHOTOS.length)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  const photo = GALLERY_PHOTOS[index]

  return (
    <div className="spotlight-carousel">
      <AnimatePresence mode="wait">
        <motion.figure
          key={photo.src}
          className="spotlight-slide"
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          <motion.div
            className="spotlight-shine"
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
          />
        </motion.figure>
      </AnimatePresence>
      <p className="spotlight-counter" aria-live="polite">
        {index + 1} / {GALLERY_PHOTOS.length}
      </p>
    </div>
  )
}

function FilmStrip() {
  const strip = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS]

  return (
    <div className="film-strip-wrap" aria-hidden="true">
      <motion.div
        className="film-strip"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {strip.map((photo, i) => (
          <div key={`${photo.src}-${i}`} className="film-frame">
            <img src={photo.src} alt="" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function BirthdayQuotesWall() {
  const [featured, setFeatured] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setFeatured((i) => (i + 1) % BIRTHDAY_QUOTES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const current = BIRTHDAY_QUOTES[featured]

  return (
    <section id="quotes" className="quotes-section">
      <motion.div
        className="quotes-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="quotes-eyebrow">Birthday blessings</p>
        <h2>Wishes for Iti</h2>
        <p className="quotes-lead">A little sparkle in words, just for you</p>
      </motion.div>

      <motion.div
        className="featured-quote"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65 }}
      >
        <motion.div
          className="featured-quote-glow"
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <span className="featured-tag">{current.tag}</span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={featured}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            “{current.text}”
          </motion.blockquote>
        </AnimatePresence>
        <div className="quote-progress" aria-hidden="true">
          {BIRTHDAY_QUOTES.map((_, i) => (
            <motion.span
              key={i}
              className={i === featured ? 'progress-pip active' : 'progress-pip'}
              animate={
                i === featured
                  ? { scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }
                  : { scale: 1, opacity: 0.35 }
              }
              transition={
                i === featured
                  ? { duration: 5, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>
      </motion.div>

      <div className="quote-grid">
        {BIRTHDAY_QUOTES.map((quote, i) => (
          <motion.article
            key={quote.text}
            className="quote-tile"
            initial={{ opacity: 0, y: 36, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.55,
              delay: (i % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
              boxShadow: '0 20px 40px rgba(255, 45, 85, 0.25)',
            }}
          >
            <motion.span
              className="quote-tile-spark"
              animate={{ rotate: [0, 180, 360], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
            <span className="quote-tile-tag">{quote.tag}</span>
            <p>{quote.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="quotes-ticker-wrap" aria-hidden="true">
        <motion.div
          className="quotes-ticker"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...BIRTHDAY_QUOTES, ...BIRTHDAY_QUOTES].map((q, i) => (
            <span key={`${q.tag}-${i}`}>♥ {q.text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PhotoMosaic() {
  return (
    <div className="photo-mosaic">
      {GALLERY_PHOTOS.map((photo, i) => (
        <motion.figure
          key={photo.src}
          className={`mosaic-item ${i % 5 === 0 ? 'mosaic-tall' : ''}`}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: (i % 6) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          <motion.span
            className="mosaic-glow"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
          />
        </motion.figure>
      ))}
    </div>
  )
}

function App() {
  const [introDone, setIntroDone] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  const heroParallax = useTransform(smoothProgress, [0, 0.4], [0, -80])
  const veilOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 4200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((q) => (q + 1) % FASHION_LINES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const burstConfetti = useCallback(() => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3200)
  }, [])

  return (
    <div className="page">
      <ConfettiBurst active={confetti} />
      <RunwayLights />
      <FloatingIcons />

      <motion.div
        className="spotlight-veil"
        style={{ opacity: veilOpacity }}
        aria-hidden="true"
      />

      <header className="top-badge">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          For our sali · {BIRTHDAY_LABEL}
        </motion.span>
      </header>

      <motion.section className="hero" style={{ y: heroParallax }}>
        <HeroPhotoStack />

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          RUNWAY BIRTHDAY
        </motion.p>

        <h1 className="title">
          <LetterReveal text={DISPLAY_NAME} className="name-display" />
        </h1>

        <motion.p
          className="subtitle nickname"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {NICKNAME_LINE}
        </motion.p>

        <motion.div
          className="date-pill"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 120 }}
        >
          <span className="date-day">15</span>
          <span className="date-month">October</span>
        </motion.div>

        <AnimatePresence>
          {introDone && (
            <motion.button
              type="button"
              className="cta-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => {
                burstConfetti()
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See her glow
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>

      <FilmStrip />

      <section className="marquee-wrap" aria-hidden="true">
        <motion.div
          className="marquee"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <span>
            HAPPY BIRTHDAY ITI · LADLI · RED CARPET · SPARKLE · HAPPY BIRTHDAY ITI ·
          </span>
          <span>
            HAPPY BIRTHDAY ITI · LADLI · RED CARPET · SPARKLE · HAPPY BIRTHDAY ITI ·
          </span>
        </motion.div>
      </section>

      <section id="gallery" className="gallery-section">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Her style story
        </motion.h2>
        <motion.p
          className="gallery-lead"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Every frame, pure fashion energy
        </motion.p>
        <SpotlightCarousel />
        <PhotoMosaic />
      </section>

      <section className="fashion-block">
        <motion.div
          className="polaroid"
          initial={{ opacity: 0, rotate: -6, x: -40 }}
          whileInView={{ opacity: 1, rotate: -3, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="polaroid-inner">
            <img src={GALLERY_PHOTOS[3].src} alt="Ladli fashion moment" />
            <p>Fashion enthusiast</p>
          </div>
        </motion.div>

        <motion.div
          className="quote-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="quote-label">Today&apos;s mood board</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              className="quote-text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              {FASHION_LINES[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </section>

      <BirthdayQuotesWall />

      <section id="wish" className="wish-section">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          A note with love
        </motion.h2>

        <div className="wish-cards">
          {WISH_PARAGRAPHS.map((text, i) => (
            <motion.article
              key={i}
              className="wish-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
            >
              <span className="wish-index">0{i + 1}</span>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>

        <motion.button
          type="button"
          className="cta-secondary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={burstConfetti}
        >
          Send sparkle to Iti ✨
        </motion.button>
      </section>

      <footer className="footer">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Made with love by jija ji · Happy Birthday, {DISPLAY_NAME}
        </motion.p>
      </footer>
    </div>
  )
}

export default App
