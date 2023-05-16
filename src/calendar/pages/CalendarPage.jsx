import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { Calendar } from "react-big-calendar";

import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { UseUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = UseUiStore();
  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    console.log({ viewChanged: event });
    localStorage.setItem("lastView", event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };
  const onSelectSlotEvent = (slotInfo) => {
    // console.log({onSelectSlotEvent: slotInfo});
    setActiveEvent(null);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);
  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 90px )" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onSelectSlot={onSelectSlotEvent}
        selectable={true}
      />
      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  );
};
