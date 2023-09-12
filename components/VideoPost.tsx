"use client"

import { BASE_PATH } from "@/config"
import { Post } from "@/data/posts"
import PostInfo from "./PostInfo"
import {
  useEffect,
  useRef,
} from "react"

const VideoPost = (post: Post) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current!.volume = 1
  })

  return (
    <div
      id={post.id.toString()}
      className="relative h-full shrink-0 snap-start"
    >
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
