import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative h-[80vh] bg-fixed bg-amber-300 dark:bg-gray-900 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/hero.jpeg" className="w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
      </div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full"
      >
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
            Understand user flow and{' '}
            <strong className="text-indigo-400">increase</strong> conversions
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
            accusamus impedit minima harum corporis iusto.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-block rounded border border-gray-200 px-6 py-3 text-lg font-semibold text-gray-100 transition hover:bg-gray-50 hover:text-gray-900
              dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
