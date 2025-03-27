import { auth } from "@/auth";
import { Render } from "@/components/common/render";
import { AuthButton } from "@/components/layout/header/menu/user/auth-button";
import { UserMenu } from "@/components/layout/header/menu/user/user-menu";

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
