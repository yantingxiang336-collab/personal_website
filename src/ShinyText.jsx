import React from 'react'
import './ShinyText.css'

export default function ShinyText({ text, children, color = '#d9a8e8', shineColor = '#ffffff', speed = 3, className = '', style = {} }) {
  return <span className={`shiny-text ${className}`} style={{ '--shine-base': color, '--shine-light': shineColor, '--shine-speed': `${speed}s`, ...style }}>{children ?? text}</span>
}
