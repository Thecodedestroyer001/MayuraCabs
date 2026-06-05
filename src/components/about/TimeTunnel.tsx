'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function TimelineItem({ item, index, total, scrollYProgress }: { item: {year: string, text: string}, index: number, total: number, scrollYProgress: any }) {
  // Calculate active scroll ranges for each item
  const step = 1 / total
  const overlap = step * 0.1
  
  let start = index * step - overlap
  let inFull = start + step * 0.2
  let outFull = (index + 1) * step - step * 0.2
  let end = (index + 1) * step + overlap

  // Clamp strictly between 0 and 1 to prevent Web Animations API (WAAPI) crash
  start = Math.max(0, Math.min(1, start))
  inFull = Math.max(0, Math.min(1, inFull))
  outFull = Math.max(0, Math.min(1, outFull))
  end = Math.max(0, Math.min(1, end))

  // Ensure strict monotonic increase
  if (inFull <= start) inFull = start + 0.0001
  if (outFull <= inFull) outFull = inFull + 0.0001
  if (end <= outFull) end = outFull + 0.0001

  // Z-axis zoom effect (continuous)
  const scale = useTransform(scrollYProgress, [start, end], [0.5, 3])
  
  // Opacity: fades in, stays fully visible, fades out
  const opacity = useTransform(scrollYProgress, [start, inFull, outFull, end], [0, 1, 1, 0])
  
  // Subtle blur to simulate depth of field
  const filter = useTransform(scrollYProgress, [start, inFull, outFull, end], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(20px)'])

  return (
    <motion.div 
      className="absolute w-full max-w-4xl px-4 flex flex-col items-center text-center z-10 will-change-transform"
      style={{ scale, opacity, filter }}
    >
      {/* Massive background year */}
      <h3 className="text-[100px] md:text-[150px] lg:text-[180px] font-black text-white/5 mb-4 tracking-tighter leading-none select-none">
        {item.year}
      </h3>
      
      {/* Foreground content card */}
      <div className="bg-brand-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative -mt-16 md:-mt-24 max-w-2xl mx-auto">
        <span className="text-brand-yellow font-black tracking-widest text-lg uppercase mb-4 block drop-shadow-md">
          {item.year}
        </span>
        <p className="text-lg md:text-2xl font-bold text-white leading-tight md:leading-snug drop-shadow-lg">
          {item.text}
        </p>
      </div>
    </motion.div>
  )
}

export default function TimeTunnel({ timeline }: { timeline: {year: string, text: string}[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  if (!timeline || timeline.length === 0) return null;

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-brand-black w-full overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Deep Tunnel Background Effect */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50 z-0" />
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(255,204,53,0.15) 0%, rgba(28,28,27,1) 70%)',
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
          }}
        />

        <div className="absolute top-16 md:top-24 text-center z-20">
          <span className="section-tag-dark border-white/10 text-brand-yellow bg-white/5 backdrop-blur-md">Our Story</span>
        </div>

        {/* Timeline Items mapped to Scroll Progress */}
        {timeline.map((item, index) => (
          <TimelineItem 
            key={item.year}
            item={item}
            index={index}
            total={timeline.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Scroll down indicator */}
        <div className="absolute bottom-12 text-brand-yellow/50 text-xs tracking-widest uppercase flex flex-col items-center gap-2 z-20">
          <span>Drive Forward</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-yellow/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}
