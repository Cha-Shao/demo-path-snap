import ExitIcon from "./Icons/ExitIcon"
import OptionIcon from "./Icons/OptionIcon"
import SearchIcon from "./Icons/SearchIcon"

const Header = () => {
  return (
    <div className="fixed z-50 top-2 left-2 right-2 flex gap-2">
      <div className="acrylic-card rounded-full flex items-center gap-2 px-2 py-1 grow">
        <span className="opacity-50"><SearchIcon /></span>
        <input
          type="text"
          placeholder="搜索附近好玩的"
          className="bg-transparent outline-none text-white placeholder:text-white/50"
        />
      </div>
      <div className="acrylic-card rounded-full flex items-center gap-2 px-2">
        <button className="w-8 h-8 flex justify-center items-center">
          <OptionIcon />
        </button>
        <div className="h-6 w-0.5 bg-white/20" />
        <button className="w-8 h-8 flex justify-center items-center">
          <ExitIcon />
        </button>
      </div>
    </div>
  )
}

export default Header
