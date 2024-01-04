// "use client";

// import * as Dialog from "@radix-ui/react-dialog";
// import type { FC, ReactNode } from "react";
// import { useRouter } from "next/navigation";
// import { useStore, useAtomValue } from "jotai";
// import { navActiveAtom } from "@/store/atoms";

// interface ModalProps {
//   children: ReactNode;
// }

// const Modal: FC<ModalProps> = ({ children }) => {
//   const router = useRouter();
//   const store = useStore();
//   const navActive = useAtomValue(navActiveAtom, {
//     store,
//   });

//   const handleOnOpenChange = (open: boolean) => {
//     if (!open) {
//       router.back();
//     }
//   };

//   return (
//     <Dialog.Root open onOpenChange={handleOnOpenChange}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/70" />
//         <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//           {children}
//           {navActive ? 'active' : 'not active'}

//         </Dialog.DialogContent>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default Modal;