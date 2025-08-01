import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { Icon } from "@iconify-icon/react";
import { cn } from "../../lib/utils";

interface Props {
  scrollPast: boolean;
}

function NavBar({ scrollPast }: Props) {
  return (
    <nav
      className={cn(
        "top-0 right-0 left-0 z-50 fixed flex mx-auto w-full h-28 transition-all duration-300 ease-in-out backdrop-filter backdrop-blur",
        scrollPast ? "bg-bukrow-foreground/20 " : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center mx-auto px-4 pl-8 md:pl-24 w-full font-semibold text-white">
        <div className="text-xl">BukRow</div>
        <ul className="flex gap-6 md:gap-12">
          <li className="">Discover</li>
          <li className="">Community</li>
          <li className="">Subscription</li>
        </ul>
        <div className="flex items-center gap-4">
          <BsChatDots size={24} />
          <Icon icon="hugeicons:notification-01" width="24" height="24" />
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#A2B3AD] p-8">
        <HiOutlineMenuAlt3 size={34} />
      </div>
    </nav>
  );
}

export default NavBar;
