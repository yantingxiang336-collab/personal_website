import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function usePortfolioMotion(rootRef) {
  useGSAP(() => {
    const root = rootRef.current
    if (!root) return
    const select = gsap.utils.selector(root)
    const media = gsap.matchMedia()
    let alive = true

    media.add({ desktop: '(min-width: 761px)', compact: '(max-width: 760px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const { compact, reduced } = context.conditions
      // Static markup is the default: reduced motion never leaves content concealed.
      if (reduced) {
        root.dataset.opening = 'complete'
        return
      }
      const travel = compact ? 0.6 : 1
      // The first and last screens keep their own original text and dissolve effects.

      const sequence = (trigger, id, start = 'top 89%') => gsap.timeline({
        defaults: { duration: 1.35, ease: 'power4.out' },
        scrollTrigger: {
          id, trigger, start: `clamp(${start})`, end: 'bottom -10%',
          toggleActions: 'play reverse play reverse', invalidateOnRefresh: true,
        },
      })

      select('main > section[id]:not(#contact)').forEach(section => {
        const heading = section.querySelector('.section-heading, .contact-heading')
        if (!heading) return
        sequence(heading, `portfolio-title-${section.id}`)
          .fromTo(heading.querySelector('.section-title-text'), {
            yPercent: 120, x: -70 * travel, scaleY: 0.6, rotation: 3, transformOrigin: '0% 100%',
          }, { yPercent: 0, x: 0, scaleY: 1, rotation: 0, duration: 1.65 }, 0)
          .fromTo(heading.querySelector('.section-leading-number'), {
            x: -35, y: 22, opacity: 0,
          }, { x: 0, y: 0, opacity: 1, duration: 1.15 }, 0.15)
      })

      const profile = select('.about-profile')
      sequence(profile[0], 'portfolio-content-about', 'top 94%')
        .fromTo(profile, { y: 90 * travel, scale: 0.94, opacity: 0 }, {
          y: 0, scale: 1, opacity: 1, duration: 1.6,
        }, 0.15)
        .fromTo(select('.about-intro > *'), { y: 45, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12 }, 0.6)
        .fromTo(select('.about-facts-open > div'), { x: 55 * travel, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.2, stagger: 0.1,
        }, 0.65)

      // Accordion owns panel flex/rotateY. Entrance only animates its inner shell.
      sequence(select('.project-accordion')[0], 'portfolio-content-projects', 'top 94%')
        .fromTo(select('.gallery-motion-shell'), { y: 90 * travel, scaleY: 0.82, opacity: 0, transformOrigin: '50% 100%' }, {
          y: 0, scaleY: 1, opacity: 1, duration: 1.6, stagger: 0.14,
        }, 0.15)

      sequence(select('.skills-explorer')[0], 'portfolio-content-skills', 'top 91%')
        .fromTo(select('.skills-folder-stage'), { x: -65 * travel, y: 95 * travel, rotation: -5, opacity: 0 }, {
          x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.6,
        }, 0.1)
        .fromTo(select('.skills-detail'), { x: 90 * travel, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.55,
        }, 0.4)

    })

    document.fonts?.ready.then(() => { if (alive) ScrollTrigger.refresh() })
    return () => {
      alive = false
      media.revert()
      delete root.dataset.opening
    }
  }, { scope: rootRef })
}
