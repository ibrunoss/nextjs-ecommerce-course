import { auth } from "@/auth";
import { AuthButton } from "@/components/layout/header/auth-button";
import { Render } from "@/components/common/render";
import { UserMenu } from "./user-menu";

export const AuthButtonOrMenuButton = async () => {
  const session = await auth();

  return (
    <Render when={Boolean(session)} fallback={<AuthButton />}>
      <UserMenu
        name={session?.user?.name ?? "U"}
        email={session?.user?.email ?? ""}
        srcImage={session?.user?.image ?? undefined}
      />
    </Render>
  );
};
