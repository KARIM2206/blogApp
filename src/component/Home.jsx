import React from 'react'
import { motion } from 'framer-motion'

import Navbar from './Navbar'
import Hero from './Hero'
import Category from './Category'
import Card from './Card'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div className="flex flex-col px-4 space-y-10">
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      {/* Category Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Category />
      </motion.div>

      {/* Card Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Card />
      </motion.div>
    </div>
  )
}

export default Home
