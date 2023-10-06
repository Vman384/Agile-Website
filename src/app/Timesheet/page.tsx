"use client"
import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

const Timesheet = () => {

  const schedulerRef = React.createRef();
  const getScheduler = () => schedulerRef.current.control;

  const [showBusinessOnly, setShowBusinessOnly] = useState(false);
  const [showDailyTotals, setShowDailyTotals] = useState(false);

  const projects = [
    {id: 1, name: "Vedansh", color: "#38761d"},
    {id: 2, name: "Felix", color: "#0d8ecf"},
    {id: 3, name: "Sineth", color: "#f1c232"},
    {id: 4, name: "Tam", color: "#f1c232"},
    {id: 5, name: "Norman", color: "#f1c232"},
    {id: 6, name: "Tyler", color: "#f1c232"}


  ];

  const [config, setConfig] = useState({
    locale: "en-us",
    rowHeaderColumns: [
      {name: "Date"},
      {name: "Day", width: 40}
    ],
    onBeforeRowHeaderRender: (args) => {
      args.row.columns[0].horizontalAlignment = "center";
      args.row.columns[1].text = args.row.start.toString("ddd");
      if (args.row.columns[2]) {
        args.row.columns[2].text = args.row.events.totalDuration().toString("h:mm");
      }
    },
    onBeforeEventRender: (args) => {
      console.log(args)
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      const project = projects.find(p => p.id === args.data.project) ||projects.find(p => p.id === args.data.text.project);
      console.log(project)
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
    allowEventOverlap: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
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
        {name: "Project", id: "project", options: projects}
      ];
      const data = {
        start: args.start,
        end: args.end,
        project: projects[0].id,
        text: "New task"
      };
      const options = {
        locale: "en-us",
      };
      const modal = await DayPilot.Modal.form(form, data, options);
      dp.clearSelection();
      if (modal.canceled) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
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
      <DayPilotScheduler
        {...config}
        ref={schedulerRef}
      />
    </div>
  );
}

export default Timesheet;
