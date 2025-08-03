import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={"/logo/en-logo.svg"} alt="Logo" width={120} height={30} priority />
    </Link>
  );
};

export default Logo;
