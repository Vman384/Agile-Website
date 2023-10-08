"use client"
import React, { useEffect, useState, useRef } from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebaseSetup";

const Timesheet = React.memo(() => {
  const eventsRef = collection(db, 'timesheet');
  const schedulerRef = React.createRef();

  const [showBusinessOnly, setShowBusinessOnly] = useState(false);
  const [showDailyTotals, setShowDailyTotals] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const iRef = useRef(0);

  const name = [
    {id: 1, name: "Vedansh", color: "#38761d"},
    {id: 2, name: "Felix", color: "#0d8ecf"},
    {id: 3, name: "Sineth", color: "#f1c232"},
    {id: 4, name: "Tam", color: "#9532a8"},
    {id: 5, name: "Norman", color: "#a8a432"},
    {id: 6, name: "Tyler", color: "#1822db"}


  ];

  
  useEffect(() => {
    const eventsRef = collection(db, 'timesheet');
    const q = query(eventsRef, orderBy('start'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
      setIsLoading(false); // Set loading to false when data arrives
    });
    if (schedulerRef.current && !isLoading) {
        console.log(events)
        const startDate = "2023-10-01";
        schedulerRef.current.control.update({ startDate, events });
        console.log("updated")
    }
    return () => {
      unsubscribe();

    };
  }, [isLoading,eventsRef]);


  const [config, setConfig] = useState({
    locale: "en-us",
    eventOverlap: "visible",
    rowHeaderColumns: [
      {name: "Date"},
      {name: "Day", width: 40}
    ],
    events: events,
    onBeforeRowHeaderRender: (args:any) => {
      args.row.columns[0].horizontalAlignment = "center";
      args.row.columns[1].text = args.row.start.toString("ddd");
      if (args.row.columns[2]) {
        args.row.columns[2].text = args.row.events.totalDuration().toString("h:mm");
      }
    },
    onBeforeEventRender: (args:any) => {
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      const project = name.find(p => p.id === args.data.project) || name.find(p => p.id === args.data.text.project) || name.find(p => p.id === args.project);
      args.data.barColor = project.color;
  
      args.data.html = "";
      args.data.areas = [
        {
          top: 5,
          left: 5,
          text: args.data.text.text,
        },
        {
          top: 20,
          left: 5,
          text: project.name,
          fontColor: "#999999"
        },
        {
          top: 13,
          right: 5,
          text: duration.toString("h:mm"),
          fontColor: "#999999"
        }
      ];
  
    },
    cellWidthSpec: "Auto",
    cellWidthMin: 25,
    timeHeaders: [{"groupBy":"Hour"},{"groupBy":"Cell","format":"mm"}],
    scale: "CellDuration",
    cellDuration: 15,
    eventHeight: 40,
    days: DayPilot.Date.today().daysInMonth(),
    viewType: "Days",
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    showNonBusiness: !showBusinessOnly,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args:any) => {
      const dp = args.control;
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
      dp.clearSelection();
      if (modal.canceled) { return; }
      console.log(args)
      console.log(DayPilot.guid())
      console.log(modal.result)
      const docRef = await addDoc(collection(db, "timesheet"), {
        start: args.start.value,
        end: args.end.value,
        project: modal.result.project,
        text: modal.result.text,
        id: DayPilot.guid()
    });
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    }
  });


  const changeSummary = (e) => {
    setShowDailyTotals(e.target.checked);

    if (e.target.checked) {
      setConfig(prevConfig => ({
        ...prevConfig,
        rowHeaderColumns: [
          {name: "Date"},
          {name: "Day", width: 40},
          {name: "Total", width: 60}
        ]
      }));
    }
    else {
      setConfig(prevConfig => ({
        ...prevConfig,
        rowHeaderColumns: [
          {name: "Date"},
          {name: "Day", width: 40}
        ]
      }));
    }
  }

  return (
    <div>
      <div className={"space"}>
        <label><input type={"checkbox"} onChange={changeSummary} checked={showDailyTotals} /> Show daily totals</label>
      </div>
        {events.length === 0 ? (
        <p>Loading...</p>
        ) : (
        <DayPilotScheduler
          {...config}
          ref={schedulerRef}
        />
      )}
    </div>
  );
})

export default Timesheet;
