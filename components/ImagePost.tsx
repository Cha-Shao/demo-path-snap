"use client"

import { BASE_PATH } from "@/config"
import { Post } from "@/data/posts"
import Image from "next/image"
import PostInfo from "./PostInfo"
import {
  useEffect,
  useRef,
  useState
} from "react"

const ImagePost = (post: Post) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const [currentImage, setCurrentImage] = useState(0)

  const handleScroll = (
    entires: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    for (const entry of entires) {
      if (entry.intersectionRatio >= 1)
        setCurrentImage(Array.from(carouselRef.current!.children)
          .findIndex(node => node === entry.target))
    }
  }

  const getObserver = (
    ref: IntersectionObserver | null
  ) => {
    const observer = ref
    if (observer !== null)
      return observer
    const newObserver = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    })
    setObserver(newObserver)
    return newObserver
  }

  useEffect(() => {
    if (observer) observer.disconnect()
    const newObserver = getObserver(observer)
    for (const node of Array.from(carouselRef.current!.children)) {
      newObserver.observe(node)
    }

    return () => newObserver.disconnect()
  }, [])

  return (
    <div
      id={post.id.toString()}
      className="relative h-full shrink-0 snap-start"
    >
      <div
        ref={carouselRef}
        className="h-full flex overflow-x-auto snap-x snap-mandatory"
      >
        {post.images.map((image, i) => (
          <Image
            key={i}
            src={`/${BASE_PATH}/posts/${post.id}/${image}.jpg`} alt=""
            width={1280} height={720}
            className="w-full h-full shrink-0 object-cover snap-start" />
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
