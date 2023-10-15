"use client"
import { collection, onSnapshot, doc, setDoc, deleteDoc, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebaseSetup";
import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const eventsRef = collection(db, 'timesheet');

  const name = [
    {id: 1, name: "Vedansh", color: "#38761d"},
    {id: 2, name: "Felix", color: "#0d8ecf"},
    {id: 3, name: "Sineth", color: "#f1c232"},
    {id: 4, name: "Tam", color: "#9532a8"},
    {id: 5, name: "Norman", color: "#a8a432"},
    {id: 6, name: "Tyler", color: "#1822db"}

  ];
  const calendarRef = useRef()

  const editEvent = async (e) => {
    const args = e
    const dp = calendarRef.current.control;
    const form = [
      {name: "Text", id: "text"},
      {name: "Start", id: "start", type: "datetime"},
      {name: "End", id: "end", type: "datetime", onValidate: (args) => {
          if (args.values.end.getTime() < args.values.start.getTime()) {
            args.valid = false;
            args.message = "End must be after start";
          }
        }
      },
      {name: "Name", id: "project", options: name}
    ];
    const data = {
      start: args.start,
      end: args.end,
      project: name[0].id,
      text: "New task"
    };
    const options = {
      locale: "en-us",
    };
    const modal = await DayPilot.Modal.form(form, data, options);
    if (!modal.result) { return; }
    dp.events.update({
      start: e.start,
      end: e.end,
      text: modal.result
    });
  };

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const form = [
        {name: "Text", id: "text"},
        {name: "Start", id: "start", type: "datetime"},
        {name: "End", id: "end", type: "datetime", onValidate: (args) => {
            if (args.values.end.getTime() < args.values.start.getTime()) {
              args.valid = false;
              args.message = "End must be after start";
            }
          }
        },
        {name: "Name", id: "project", options: name}
      ];
      const data = {
        start: args.start,
        end: args.end,
        project: name[0].id,
        text: "New task"
      };
      const options = {
        locale: "en-us",
      };
    const modal = await DayPilot.Modal.form(form, data, options);
      if (!modal.result) { return; }
      console.log(modal.result)
      dp.events.add({
        start: args.start,
        end: args.end,
        text: modal.result
      });
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2023-10-02T10:30:00",
        end: "2023-10-02T13:00:00",
        participants: 2,
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-10-03T09:30:00",
        end: "2023-10-03T11:30:00",
        backColor: "#6aa84f",
        participants: 1,
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-10-03T12:00:00",
        end: "2023-10-03T15:00:00",
        backColor: "#f1c232",
        participants: 3,
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-10-01T11:30:00",
        end: "2023-10-01T14:30:00",
        backColor: "#cc4125",
        participants: 4,
      },
    ];
    const startDate = "2023-10-02";

    calendarRef.current.control.update({startDate, events});
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-10-02"}
          selectionDay={"2023-10-02"}
          onTimeRangeSelected={ args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}

export default Calendar;