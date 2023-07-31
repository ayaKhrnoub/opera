import { TbBrandBooking } from "react-icons/tb";
import { BiParty } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
const navLinks = [
  { id: 1, link: "home", path: "/" },
  { id: 2, link: "about us", path: "/about-us" },
  { id: 3, link: "news", path: "/news" },
  { id: 4, link: "our events", path: "/our-events" },
  { id: 5, link: "archives", path: "/archives" },
  { id: 6, link: "contact us", path: "/contact-us" },
];

const userLinks = [
  {
    id: 1,
    icon: ImProfile,
    type: "link",
    name: "profile",
    path: "/profile",
  },
  {
    id: 2,
    icon: TbBrandBooking,
    type: "link",
    name: "reservation",
    path: "/my-reservation",
  },
  { id: 3, icon: BiParty, type: "link", name: "party", path: "/my-tickets" },
  { id: 4, icon: FiLogOut, type: "button", name: "logout" },
];

export default { navLinks, userLinks };
