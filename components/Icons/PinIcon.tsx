import { SVGAttributes } from "react";

export default function PinIcon(props: SVGAttributes<SVGSVGElement>) {
  const {
    width = "20",
    height = "20",
    color = "white",
    ...attrs
  } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{
        color
      }}
      {...attrs}
      viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M128 60a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44Zm0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm0-112a92.1 92.1 0 0 0-92 92c0 77.36 81.64 135.4 85.12 137.83a12 12 0 0 0 13.76 0a259 259 0 0 0 42.18-39C205.15 170.57 220 136.37 220 104a92.1 92.1 0 0 0-92-92Zm31.3 174.71a249.35 249.35 0 0 1-31.3 30.18a249.35 249.35 0 0 1-31.3-30.18C80 167.37 60 137.31 60 104a68 68 0 0 1 136 0c0 33.31-20 63.37-36.7 82.71Z" />
    </svg>
  )
}