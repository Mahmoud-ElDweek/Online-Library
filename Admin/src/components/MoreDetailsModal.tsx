import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react"

interface ModalProps {
  children: ReactNode;
}
const MoreDetailsModal = forwardRef (function MoreDetails({ children }: ModalProps, ref ) {

    const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref , () => {
    return {
      open(){
        if(dialog.current){
          dialog.current.showModal();
        }
      }
    }
  }) 

  return (
    <dialog ref={dialog} id="my_modal_3" className="modal" >
              <div className="modal-box w-11/12 max-w-4xl dark:bg-black">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                {children}
              </div>
            </dialog>
  )
})

export default MoreDetailsModal