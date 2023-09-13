"use client"

import { BASE_PATH } from "@/config"
import { Post } from "@/data/posts"
import PostInfo from "./PostInfo"
import {
  useRef,
  useState
} from "react"
import {
  AnimatePresence,
  motion
} from 'framer-motion'
import classNames from "classnames"

const VideoPost = (post: Post) => {
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className="relative h-full shrink-0 snap-start"
      onClick={() => {
        if (videoRef.current?.paused) {
          videoRef.current?.play()
          setPaused(false)
        }
        else {
          videoRef.current?.pause()
          setPaused(true)
        }
      }}
    >
      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0, scale: 2, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 2, x: '-50%', y: '-50%' }}
            className={classNames(
              "absolute left-1/2 top-1/2",
            )}
          >
            <span className="icon-[ph--play-fill] text-9xl text-white/20" />
          </motion.div>
        )}
      </AnimatePresence>
      <video
        ref={videoRef}
        src={`/${BASE_PATH!}/posts/${post.id}/${post.video}.mp4`}
        className="h-full object-cover"
        autoPlay
        muted
        loop
      />
      <PostInfo {...post} />
    </div>
  )
}

export default VideoPost
