import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";
import { useCalendarStore } from "./useCalendarStore";

//Con este hook se ahorran los useselecto y se llama todo directamente desde el hook

export const UseUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const { setActiveEvent } = useCalendarStore();

  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
    setActiveEvent(null);
  };

  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  return {
    //propiedades
    isDateModalOpen,
    //metodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
