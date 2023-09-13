'use client'

import {
  AnimatePresence,
  motion
} from "framer-motion"
import {
  useEffect,
  useState
} from "react"

const Providers = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const docHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', docHeight)

    return () => window.removeEventListener('resize', docHeight)
  }, [])

  return (<>
    <AnimatePresence>
      {showModal && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="relative m-auto p-4 bg-light rounded-2xl"
        >
          <button
            className="absolute top-4 right-4 w-6 h-6 flex justify-center items-center"
            onClick={() => setShowModal(false)}
          >
            <span className="icon-[ph--x-bold]" />
          </button>
          <h1 className="text-xl font-bold mb-2">提示</h1>
          <p>建议使用电脑访问</p>
          <p>并打开f12使用手机设备仿真{'(•ω‹)'}</p>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
    {children}
  </>)
}

export default Providers