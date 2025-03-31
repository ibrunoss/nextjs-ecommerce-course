import { APP_BRAND } from "@/lib/constants/app";

export const MainFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-5 border-t flex-center gap-3">
      <div className="  ">
        {APP_BRAND} {currentYear} &copy; Todos os direitos reservados
      </div>
    </footer>
  );
};
