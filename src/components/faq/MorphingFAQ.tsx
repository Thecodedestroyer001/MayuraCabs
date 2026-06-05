'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MorphingFAQ({ questions }: { questions: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      {questions.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <motion.div
            layout
            key={i}
            className={`bg-white rounded-[2rem] border transition-colors duration-300 ${isOpen ? 'border-brand-yellow shadow-[0_10px_40px_rgba(255,204,53,0.15)]' : 'border-gray-100 shadow-sm'} overflow-hidden cursor-pointer group`}
            onClick={() => setOpenIndex(isOpen ? null : i)}
            whileHover={{ scale: 1.005 }}
            transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.15 } }}
          >
            <motion.div layout className="p-6 md:p-8 flex items-center justify-between gap-6">
              <motion.span layout className="font-bold text-brand-black text-lg md:text-xl leading-snug">
                {item.q}
              </motion.span>
              <motion.div 
                layout 
                animate={{ rotate: isOpen ? 180 : 0 }} 
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-100 text-brand-gray-500 group-hover:bg-brand-gray-200'}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0.15 }}
                  className="px-6 md:px-8 pb-6 md:pb-8"
                >
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <p className="text-brand-gray-500 text-base md:text-lg leading-relaxed border-t border-gray-100 pt-6">
                      {item.a}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
