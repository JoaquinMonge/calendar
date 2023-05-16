import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore, UseUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { setActiveEvent } = useCalendarStore();
  const { openDateModal } = UseUiStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Joaquin",
      },
    });
    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
