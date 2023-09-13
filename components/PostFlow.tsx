"use client"

import {
  Post,
  PostType
} from "@/data/posts"
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import Map from "./Map"
import classNames from "classnames"
import PinIcon from "./Icons/PinIcon"
import { Marker } from "react-amap"
import getDistance from "@/utils/getDistance"
import formatDistance from "@/utils/formatDistance"
import getSpendTime from "@/utils/getSpendTime"
import ImagePost from "./ImagePost"
import getUserPosition from "@/libs/getUserPosition"
import VideoPost from "./VideoPost"
import { BASE_PATH } from "@/config"
import { InView } from "react-intersection-observer"
import { useDebounce } from 'use-debounce'

const PostFlow = ({
  defaultPosts
}: {
  defaultPosts: Post[]
}) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [currentPost, setCurrentPost] = useState<number>(0)
  const [debouncedCurrentPost] = useDebounce(currentPost, 100)
  const [viewPosts, setViewPosts] = useState<Post[]>(defaultPosts)

  const loadMore = useCallback(async () => {
    const res: Post[] = await fetch(`${BASE_PATH}/api/home`)
      .then(res => res.json())
    setViewPosts(prevPosts => [
      ...prevPosts,
      ...res
    ])
  }, [])
  useEffect(() => {
    debouncedCurrentPost + 1 >= viewPosts.length && loadMore()
  }, [debouncedCurrentPost])

  useEffect(() => {
    setUserPosition(getUserPosition())
  }, [])

  return (
    <div className="relative h-screen pb-[17rem] overflow-y-auto snap-y snap-proximity">
      <div className="bg-lightBackground pt-12 pb-6 text-center">
        <p>刷新</p>
      </div>
      {viewPosts.map((post, i) => (
        <InView
          key={i}
          threshold={1}
          onChange={inView => {
            if (inView)
              setCurrentPost(i)
          }}
          className="h-full"
        >
          {(i - 1 === currentPost
            || i + 1 === currentPost
            || i === currentPost)
            && (
              post.type === PostType.Video
                ? <VideoPost {...post} />
                : <ImagePost {...post} />
            )}
        </InView>
      ))}
      <div className="fixed bottom-16 w-screen h-56">
        <div className="z-10 absolute p-2 left-1/2 -translate-x-1/2">
          <div
            className={classNames(
              "h-2 w-16 rounded-full",
              "bg-slate-950",
            )}
          />
        </div>
        <Map
          center={[
            viewPosts[currentPost].position[0],
            viewPosts[currentPost].position[1] - 0.0002
          ]}
          className={classNames(
            "relative",
            "h-full",
            "border border-slate-500 box-content",
            'pbg'
          )}
        >
          <Marker
            position={viewPosts[currentPost].position}
            content={"<div style='transform: translateX(-25%)'><svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 256 256'><path fill='#ff2851' d='M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88Zm0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32Z'/></svg></div>"}
          />
          <div className={classNames(
            "absolute bottom-4 left-2 right-2",
            "rounded-xl",
            "border-2 border-white/20",
            "bg-gradient-to-b from-white/70 to-white/90 backdrop-blur-md",
            "p-4",
            "shadow-md",
            "flex items-center gap-4",
          )}>
            <PinIcon color="#FF2851" height={36} width={36} />
            <div>
              <p className="text-primary font-bold text-lg">
                {viewPosts[currentPost].name}
              </p>
              <span className="opacity-50 mr-4">
                {userPosition
                  ? formatDistance(getDistance(userPosition, viewPosts[currentPost].position)) :
                  "未打开定位"
                }
              </span>
              <span className="opacity-50">
                {userPosition
                  ? `${getSpendTime(getDistance(userPosition, viewPosts[currentPost].position))[1]}分钟`
                  : "未打开定位"}
              </span>
            </div>
          </div>
        </Map>
      </div>
    </div >
  )
}

export default PostFlow
