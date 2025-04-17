import Image from "next/image";
import Link from "next/link";

import { APP_BRAND } from "@/lib/constants/app";
import { HOME_PATH } from "@/lib/constants/routes";

export const Logo = () => {
  return (
    <Link href={HOME_PATH} className="flex-start">
      <Image
        src={"/images/logo.svg"}
        alt={`${APP_BRAND} logo`}
        width={48}
        height={48}
        priority
      />
      <span className="hidden lg:block font-bold-text-2xl ml-3">
        {APP_BRAND}
      </span>
    </Link>
  );
};
