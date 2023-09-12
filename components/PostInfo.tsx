import classNames from "classnames"
import PinIcon from "./Icons/PinIcon"
import ShareIcon from "./Icons/ShareIcon"
import HeartIcon from "./Icons/HeartIcon"
import { Post, PostType } from "@/data/posts"
import { HTMLAttributes } from "react"

const PostInfo = (props: Post
  & Omit<HTMLAttributes<HTMLDivElement>, "id">
  & { currentImage?: number }) => {
  const {
    id,
    type,
    video,
    images,
    name,
    intro,
    location,
    position,
    card,
    currentImage = 0,
    ...attrs
  } = props

  return (
    <div {...attrs} className={
      classNames(
        'absolute left-0 top-0',
        'w-full h-full bg-gradient-to-t from-black/50 from-10% via-transparent via-30%',
        'flex flex-col justify-end gap-2',
        'text-lg p-2 pb-6',
        props.className
      )
    } >
      <div className="flex gap-2">
        <div className="acrylic-card max-w-[70vw] h-8 flex items-center gap-1 rounded-lg px-2">
          <PinIcon />
          <span className="text-white line-clamp-1">{location}</span>
        </div>
        <button className="acrylic-card w-8 h-8 flex justify-center items-center rounded-lg">
          <ShareIcon />
        </button>
        <button className="acrylic-card w-8 h-8 flex justify-center items-center rounded-lg">
          <HeartIcon />
        </button>
      </div>
      <p className="text-white line-clamp-2">{intro}</p>
      {type === PostType.Image && (
        <div className="flex gap-1">
          {images.map((_, i) => (
            <div key={i} className={classNames(
              'grow h-1 rounded-full',
              'duration-100',
              currentImage === i ? 'bg-light' : 'bg-light/50'
            )} />
          ))}
        </div>
      )}
    </div >
  )
}

export default PostInfo
