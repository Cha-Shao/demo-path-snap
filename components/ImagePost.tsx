"use client"

import { BASE_PATH } from "@/config"
import { Post } from "@/data/posts"
import Image from "next/image"
import PostInfo from "./PostInfo"
import { useState } from "react"
import { InView } from "react-intersection-observer"

const ImagePost = (post: Post) => {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div
      className="relative h-full shrink-0 snap-start"
    >
      <div
        className="h-full flex overflow-x-auto snap-x snap-mandatory"
      >
        {post.images.map((image, i) => (
          <InView
            threshold={1}
            key={i}
            onChange={inView => {
              if (inView) setCurrentImage(i)
            }}
            className="w-full shrink-0 snap-start"
          >
            <Image
              src={`/${BASE_PATH}/posts/${post.id}/${image}.jpg`} alt=""
              width={1280} height={720}
              className="w-full h-full object-cover" />
          </InView>
        ))}
      </div>
      <PostInfo
        {...post}
        currentImage={currentImage}
        className="pointer-events-none"
      />
    </div>
  )
}

export default ImagePost
