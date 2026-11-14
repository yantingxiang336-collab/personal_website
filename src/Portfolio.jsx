import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import GlassSurface from './GlassSurface'
import ProfileCard from './ProfileCard'
import FolderFloat from './FolderFloat'
import AccordionGallery from './AccordionGallery'
import SpotlightCard from './SpotlightCard'
import BorderGlow from './BorderGlow'
import StrokeText from './StrokeText'

import usePortfolioMotion from './usePortfolioMotion'


import StarBorder from './StarBorder'
import './site.css'
import './layers.css'
import './revisions.css'
import './final.css'
import './hero-field.css'
import './resume-updates.css'
import './depth-glass.css'
import './stroke-hero.css'
import './hero-refresh.css'
import './content-refresh.css'
import './page-redesign.css'
import './next-redesign.css'
import './bounce-redesign.css'
import './spotlight-redesign.css'
import './interaction-refinements.css'
import './accordion-projects.css'
import './portfolio-motion.css'
import './entrance-and-card.css'

const Particles = React.lazy(() => import('./Particles'))
const DotField = React.lazy(() => import('./DotField'))
const Lanyard = React.lazy(() => import('./Lanyard'))

const email = '2598228741@qq.com'
const phone = '18688339401'
const resumeReady = true
const projects = [
  { no: '01', title: '招聘数据可视化', kind: '数据工程 · 可视化部署', summary: '从数据存储与处理出发，完成招聘数据的可视化呈现与部署。', work: ['数据库建模', 'Hadoop / Hive / Spark / HBase 集群部署', 'Sqoop 数据迁移', 'Nginx 部署可视化'], tech: ['Hadoop', 'Hive', 'Spark', 'HBase', 'Sqoop', 'Nginx'] },
  { no: '02', title: '微博热搜监控', kind: '数据采集 · 流式处理', summary: '让热搜数据从采集、流转到清洗校验，形成可追踪的数据处理流程。', work: ['Python 爬虫采集', 'Flume 日志采集', 'Kafka 数据流转', 'Python 生产者 / 消费者完成数据清洗校验'], tech: ['Python', 'Flume', 'Kafka', '数据清洗'] },
  { no: '03', title: '…', work: [], tech: [], future: true },
]
const skills = [
  ['Python', '熟练使用 Python 编写程序，能完成常见数据处理脚本与基础分析。'],
  ['MySQL', '熟悉 MySQL 基础操作与 SQL 编写，能完成多条件查询与统计视图设计。'],
  ['vibe coding', '善用 GitHub Copilot、Codex、WorkBuddy 等工具辅助脚本编写、文档解析与报告整理。'],
  ['英语', '通过大学英语四级（CET-4），具备英文文档阅读与日常交流能力。'],
  ['计算机', '通过全国计算机等级考试二级；能用 Excel 数据透视表、常用函数与图表进行汇总分析。'],
]

class ParticleBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

const ParticleBackdrop = React.memo(function ParticleBackdrop({ onReady }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 650)
    return () => window.clearTimeout(timer)
  }, [])
  return <div className="ambient" aria-hidden="true"><ParticleBoundary><React.Suspense fallback={null}>{ready && <Particles onReady={onReady} particleColors={['#ffffff', '#c990ff', '#e7a9c9']} particleCount={380} particleSpread={10} speed={0.7} particleBaseSize={150} pixelRatio={1} glow={1.4} twinkle={0} moveParticlesOnHover hoverEffect="parallax" sizeRandomness={0.35} connections drift="forward" driftSpeed={2.4} cameraDistance={14} intro={false} />}</React.Suspense></ParticleBoundary></div>
})

const HeroDotField = React.memo(function HeroDotField({ onReady, startIntro }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 120)
    return () => window.clearTimeout(timer)
  }, [])
  return <div className="hero-field" aria-hidden="true"><ParticleBoundary><React.Suspense fallback={null}>{ready && <DotField onReady={onReady} startIntro={startIntro} gradientFrom="#a855f7" gradientTo="#e7a9c9" dotRadius={1.5} dotSpacing={20} cursorRadius={150} bulgeStrength={0.6} glowRadius={160} waveAmplitude={3} sparkle speed={1.1} maxDevicePixelRatio={1} intro={false} />}</React.Suspense></ParticleBoundary></div>
})

const HeroBadge = React.memo(function HeroBadge({ onReady }) {
  return <div className="hero-lanyard"><React.Suspense fallback={null}><Lanyard frontImage="/portrait-arms-balanced.webp" backImage="/portrait-arms-balanced.webp" imageFit="contain" imageScale={1.04} imageOffsetY={0.09} cardColor="#ffffff" strapColor="#d7b8ed" anchor="right" size={0.39} strapLength={0.66} breeze={0.1} damping={0.75} intro={false} introWobble={0.32} onReady={onReady} /></React.Suspense></div>
})

function ResumeLink({ className = '' }) {
  if (!resumeReady) return <span className={`resume-link unavailable ${className}`} title="简历文件待上传">简历待上传 <span aria-hidden="true">↗</span></span>
  if (className.includes("nav-resume")) return <StarBorder as="a" className={`resume-link ${className}`} href="/resume.pdf" download color="#f8e9ff" trailColor="#c990ff" duration={4} stars={2} trailLength={0.25} thickness={1} radius={14} glow={0.65} hover="lap" sparkle clickPulse backgroundColor="rgba(255,255,255,.06)" borderColor="rgba(255,255,255,.28)">下载简历 <span aria-hidden="true">↗</span></StarBorder>
  return <a className={`resume-link ${className}`} href="/resume.pdf" download>下载简历 <span aria-hidden="true">↗</span></a>
}

function SectionHeading({ number, title, className = 'section-heading' }) {
  return <div className={className}><span className="section-leading-number">{number}</span><h2><span className="section-title-mask"><span className="section-title-text">{title}</span></span></h2></div>
}

const glassProps = {
  width: '100%', height: 'auto', borderRadius: 22, distortionScale: -100,
  borderWidth: 0.08, blur: 10, brightness: 50, opacity: 0.92,
  displace: 0, redOffset: 0, greenOffset: 2, blueOffset: 4,
  backgroundOpacity: 0.035,
}

const refractiveGlassProps = {
  ...glassProps, distortionScale: -185, borderWidth: 0.14, blur: 2,
  redOffset: -6, greenOffset: 3, blueOffset: 10, backgroundOpacity: 0.045,
}

function ProjectPanelSurface({ children, active }) {
  return <div className="gallery-motion-shell"><BorderGlow className="gallery-panel-glow" edgeSensitivity={28} glowColor="276 88 82" backgroundColor="#1b142a" borderRadius={22} glowRadius={24} glowIntensity={0.9} colors={['#c990ff', '#edb7e7', '#b9b6ff']} fillOpacity={0.1}>
    <SpotlightCard className="gallery-panel-spotlight" enabled={active} spotlightColor="#e4c7f6" intensity={0.22} spotlightSize={260} borderGlow={0.6} proximity={70} smoothing={0.25}>{children}</SpotlightCard>
  </BorderGlow></div>
}
function ProjectGallery() {
  const items = [
    { label: '01', project: projects[0] },
    { label: '02', project: projects[1] },
    { label: '…' }, { label: '…' }, { label: '…' },
  ]
  return <AccordionGallery className="project-accordion" items={items} defaultIndex={0} height={440} gap={14} radius={22} expandRatio={0.53} trigger="hover" accentColor="#e4c7f6" grayscale={false} parallax={0} tilt={5} panelSurface={ProjectPanelSurface} renderContent={(item) => item.project ? <div className="accordion-project-copy">
    <h3>{item.project.title}</h3>
    <ul>{item.project.work.map(line => <li key={line}>{line}</li>)}</ul>
    <div className="accordion-project-tags">{item.project.tech.map(tag => <span key={tag} className="project-keyword-glass">{tag}</span>)}</div>
  </div> : null} />
}
function SkillExplorer() {
  const [selected, setSelected] = useState(null)
  const selectedSkill = selected === null ? null : skills[selected]
  return <div className="skills-explorer">
    <div className="skills-folder-stage">
      <FolderFloat
        className="skills-folder" items={skills.map(([name]) => name)}
        label="My Skills" sublabel="" trigger="hover" closeOnSelect={false} physics={false} bounce={0} openDuration={850}
        onSelect={(_, index) => setSelected(index)}
        folderColor="#4b315f" frontColor="#76538f" paperColor="#e9daf3"
        itemColor="#eee5f7" itemTextColor="#281a34" labelColor="#fff5ff"
        width={290} height={205} radius={20} spread={190} lift={60} tilt={10}
      />
      <p>将鼠标移到文件夹上，选择一个词条</p>
    </div>
    <div className="skills-detail" aria-live="polite">
      {selectedSkill ? <div className="skills-detail-content" key={selectedSkill[0]}>
        <span className="skills-detail-index">{String(selected + 1).padStart(2, '0')} / 05</span>
        <h3>{selectedSkill[0]}</h3>
        <p>{selectedSkill[1]}</p>
      </div> : <div className="skills-detail-empty">
        <span>01 — 05</span>
        <p>点击左侧词条，查看我的技能。</p>
      </div>}
    </div>
  </div>
}

function handleSectionNavigation(event) {
  const link = event.target.closest('a[href^="#"]')
  if (!link || !event.currentTarget.contains(link)) return
  const id = link.getAttribute('href').slice(1)
  const section = document.getElementById(id)
  if (!section) return

  event.preventDefault()
  const content = section.querySelector('.section-fade') || section
  let bounds = content.getBoundingClientRect()
  if (id === 'contact') {
    const heading = section.querySelector('.contact-heading')?.getBoundingClientRect()
    const cards = section.querySelector('.contact-grid')?.getBoundingClientRect()
    if (heading && cards) bounds = { top: heading.top, height: cards.bottom - heading.top }
  }
  const navBottom = event.currentTarget.getBoundingClientRect().bottom
  const desiredTop = Math.max(navBottom + 24, (window.innerHeight - bounds.height) / 2)
  const top = id === 'top' ? 0 : window.scrollY + bounds.top - desiredTop
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'instant' : 'smooth' })
  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
}

function App() {
  const motionRoot = useRef(null)
  usePortfolioMotion(motionRoot)
  const [copied, setCopied] = useState('')
  const [dotsReady, setDotsReady] = useState(false)
  const [badgeReady, setBadgeReady] = useState(false)
  const [backdropReady, setBackdropReady] = useState(false)
  const [opening, setOpening] = useState(false)
  const markDotsReady = useCallback(() => setDotsReady(true), [])
  const markBadgeReady = useCallback(() => setBadgeReady(true), [])
  const markBackdropReady = useCallback(() => setBackdropReady(true), [])
  useEffect(() => {
    if (!dotsReady || !badgeReady || !backdropReady) return undefined
    const frame = requestAnimationFrame(() => setOpening(true))
    return () => cancelAnimationFrame(frame)
  }, [dotsReady, badgeReady, backdropReady])
  useEffect(() => {
    const fallback = window.setTimeout(() => setOpening(true), 2600)
    return () => window.clearTimeout(fallback)
  }, [])
  const copyContact = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(type)
      window.setTimeout(() => setCopied(''), 2400)
    } catch { setCopied('复制失败，请手动复制') }
  }
  return <div ref={motionRoot} className={`portfolio-app${opening ? ' portfolio-app--opening' : ''}`}>
    <ParticleBackdrop onReady={markBackdropReady} />
    <div className="ambient-wash" aria-hidden="true" />
    <header className="nav-wrap"><GlassSurface className="nav-shell" {...glassProps} width="min(100%, 1350px)"><div className="nav-glass" onClick={handleSectionNavigation}><a className="nav-brand" href="#top" aria-label="首页，回到顶部">首页</a><nav aria-label="主导航"><a href="#about">关于我</a><a href="#projects">项目作品</a><a href="#skills">我的技能</a><a href="#contact">联系我</a></nav><ResumeLink className="nav-resume" /></div></GlassSurface></header>
    <main id="top">
      <section className={`hero content-width${opening ? ' hero--opening' : ''}`} aria-label="Personal Introduction"><HeroDotField onReady={markDotsReady} startIntro={opening} /><div className="hero-center">{opening && <><h1 className="hero-name"><StrokeText text="向研婷" strokeColor="#f3e9ff" fillColor="#d7b8ed" strokeWidth={1.6} fontSize={110} fontWeight={800} letterSpacing={-5} drawDuration={1.6} fillDelay={-0.25} fillMode="wipe" /></h1><div className="hero-line"><StrokeText text="Personal" strokeColor="#d8b0e8" fillColor="#ffffff" strokeWidth={1.6} fontSize={126} fontWeight={800} letterSpacing={-8} drawDuration={1.6} fillDelay={-0.25} fillMode="wipe" /></div><div className="hero-line second"><StrokeText text="Introduction" strokeColor="#d8b0e8" fillColor="#ffffff" strokeWidth={1.6} fontSize={126} fontWeight={800} letterSpacing={-8} drawDuration={1.6} fillDelay={-0.25} fillMode="wipe" /></div></>}</div><HeroBadge onReady={markBadgeReady} /></section>

      <section className="about content-width" id="about"><div className="section-fade"><SectionHeading number="01" title="About Me" /><ProfileCard className="about-profile" name="" title="" showUserInfo={false} holo={0.68} glare={0.48} tiltStrength={5} parallax={0} radius={26}><div className="about-layout about-business-card"><div className="about-intro"><strong>向研婷</strong><span className="about-english">Cilare Xiang</span><span className="about-age">19 岁</span></div><div className="about-facts-open"><div><span>学校</span><strong>深圳职业技术大学</strong></div><div><span>专业</span><strong>大数据工程技术本科</strong></div><div><span>年级</span><strong>大二</strong></div><div><span>邮箱</span><a href={'mailto:' + email}>{email}</a></div><div><span>电话</span><a href={'tel:' + phone}>{phone}</a></div></div></div></ProfileCard></div></section>

      <section className="projects content-width" id="projects"><div className="section-fade"><SectionHeading number="02" title="My Projects" /><ProjectGallery /></div></section>

      <section className="skills content-width" id="skills"><div className="section-fade"><SectionHeading number="03" title="My Skills" /><SkillExplorer /></div></section>

      <section className="contact" id="contact"><div className="section-fade"><div className="content-width contact-inner"><SectionHeading number="04" title="Contact Me" className="contact-heading" /><div className="contact-grid"><div className="contact-motion-card"><GlassSurface className="contact-glass" {...refractiveGlassProps}><button className="contact-method" type="button" onClick={() => copyContact(email, '邮箱')}><span>EMAIL</span><strong>{email}</strong><small>{copied === '邮箱' ? '已复制邮箱' : '点击卡片复制邮箱'}</small></button></GlassSurface></div><div className="contact-motion-card"><GlassSurface className="contact-glass" {...refractiveGlassProps}><button className="contact-method" type="button" onClick={() => copyContact(phone, '电话')}><span>PHONE</span><strong>{phone}</strong><small>{copied === '电话' ? '已复制电话' : '点击卡片复制电话'}</small></button></GlassSurface></div><div className="contact-motion-card"><GlassSurface className="contact-glass" {...refractiveGlassProps}><a className="contact-method" href="/resume.pdf" download><span>RESUME</span><strong>下载简历 ↗</strong><small>点击卡片下载 PDF</small></a></GlassSurface></div></div><footer><span>向研婷</span><a href="#top">回到顶部 ↑</a></footer></div></div></section>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)


















