import { DrawerDesktop } from "./DrawerDesktop";
import { DrawerMobile } from "./DrawerMobile";

export function Sidebar() {
  return (
    <>
      <DrawerMobile />
      <DrawerDesktop />
    </>
  );
}
