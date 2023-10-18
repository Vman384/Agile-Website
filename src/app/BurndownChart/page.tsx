"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

import { useState, useEffect } from 'react';

import {
    collection,
    addDoc,
    getDocs,
    querySnapshot,
    query,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";


import { db } from "../../../config/firebaseSetup";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const salesData = [
  { day: "1", sales: 100},
  { day: "2", sales: 50 },
  { day: "3", sales: 20 },
  { day: "4", sales: 5 },
  { day: "5", sales: 0 },
  { day: "6", sales: 0 },
];

function LineChart() {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
           let tasksArr: (typeof taskList) = [];

            querySnapshot.forEach((doc: any) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });
            setTaskList(tasksArr);
        });
    }, []);

    console.log(taskList)
    

  const data = {
    labels: salesData.map((data) => data.day),
    datasets: [
      {
        label: "Revenue",
        data: salesData.map((data) => data.sales),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Story Points",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,

            family: "Arial",
          },
        },
        min: 0 ,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Sprint Days",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10">
        Burndown Chart
      </h1>
      <div
        style={{
          width: "900px",
          height: "400px",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default LineChart;