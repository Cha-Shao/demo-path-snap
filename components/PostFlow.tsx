"use client"

import {
  Post,
  PostType
} from "@/data/posts"
import {
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

const PostFlow = ({
  defaultPosts
}: {
  defaultPosts: Post[]
}) => {
  const flowRef = useRef<HTMLDivElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [viewPosts, setViewPosts] = useState<{
    prev: Post | null,
    current: Post,
    next: Post,
    list: Post[]
  }>({
    prev: null,
    current: defaultPosts[0],
    next: defaultPosts[1],
    list: []
  })

  const handleScroll = async (
    entires: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    for (const entry of entires) {
      if (entry.intersectionRatio >= 1) {
        const newTargetId = entry.target.id
        if (newTargetId === viewPosts.current.id.toString())
          return
        if (newTargetId === viewPosts.prev?.id.toString()) {
          setViewPosts(prevData => ({
            prev: null,
            current: prevData.prev!,
            next: prevData.current,
            list: [prevData.next, ...prevData.list]
          }))
          console.log(viewPosts)
          return
        }
        if (newTargetId === viewPosts.next.id.toString()) {
          setViewPosts(prevData => {
            const newList = prevData.list
            newList.shift()
            return {
              prev: prevData.current,
              current: prevData.next,
              next: prevData.list[0],
              list: [...newList]
            }
          })
          if (viewPosts.list.length <= 1) {
            const res: Post[] = await fetch(`${BASE_PATH}/api/home`)
              .then(res => res.json())
            setViewPosts(prevData => ({
              ...prevData,
              list: [...prevData.list, ...res]
            }))
            console.log((viewPosts));
            
          }
        }
      }
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
    for (const node of Array.from(flowRef.current!.children)) {
      newObserver.observe(node)
    }

    setUserPosition(getUserPosition())

    return () => newObserver.disconnect()
  }, [])

  return (
    <div
      className="h-screen pb-[17rem] overflow-y-auto snap-y snap-proximity"
      ref={flowRef}
    >
      {viewPosts ? [viewPosts.prev, viewPosts.current, viewPosts.next]
        .filter(post => !!post)
        .map(post =>
          post!.type === PostType.Video ? (
            <VideoPost key={post!.id} {...post!} />
          ) : (
            <ImagePost key={post!.id} {...post!} />
          )
        ) : (
        <div>
          loading
        </div>
      )}
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
            viewPosts.current.position[0],
            viewPosts.current.position[1] - 0.0002
          ]}
          className={classNames(
            "relative",
            "h-full",
            "border border-slate-500 box-content",
            'pbg'
          )}
        >
          <Marker
            position={viewPosts.current.position}
            content={"<div style='transform: translateX(-25%);'><svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 256 256'><path fill='#ff2851' d='M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88Zm0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32Z'/></svg></div>"}
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
                {viewPosts.current.name}
              </p>
              <span className="opacity-50 mr-4">
                {userPosition
                  ? formatDistance(getDistance(userPosition, viewPosts.current.position)) :
                  "未打开定位"
                }
              </span>
              <span className="opacity-50">
                {userPosition
                  ? `${getSpendTime(getDistance(userPosition, viewPosts.current.position))[1]}分钟`
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
