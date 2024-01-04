import Link from "next/link";
import Image from "next/image";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={41}
          className="invert"
        />
      </Link>
    </nav>
  </header>
);

export default NavBar;
