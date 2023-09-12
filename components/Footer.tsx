'use client'

import classNames from "classnames"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { BASE_PATH } from "@/config"

const routes: {
  label: string
  icon: string
  path: string
}[] = [{
  label: '浏览',
  icon: 'icon-[ph--compass-bold]',
  path: '/'
}, {
  label: '周边',
  icon: 'icon-[ph--map-pin-bold]',
  path: '/explore'
}, {
  label: '发布',
  icon: 'icon-[ph--camera-bold]',
  path: '/upload'
}, {
  label: '我的',
  icon: 'icon-[ph--user-bold]',
  path: '/profile'
}]

const Footer = () => {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 w-screen h-16 grid grid-cols-4 items-center bg border-t border-white">
      {routes.map((route, i) => (
        <Link key={i} href={route.path}>
          <div className={classNames(
            'text-center',
            pathname.startsWith(route.path.split('/')[1]) && 'text-primary'
          )}>
            <span className={classNames(route.icon, 'text-3xl -mb-1')} />
            <p className="text-xs">{route.label}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Footer