"use client";
import IPageProps from "../../../interfaces/page";
import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    collection,
    addDoc,
    getDocs,
    query,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseSetup";
import Link from "next/link";

export default function TaskForm() {
    const router = useRouter();

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState({
        info: "",
        type: "User Story",
        estimate: 0,
        tag: "Front End",
        name: "",
        date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        status: "Backlog",
    });

    // Add task to the database
    const addTask = async (e: any) => {
        e.preventDefault();
        console.log("adding task");
        if (
            newTask.info != "" &&
            newTask.type != "" &&
            newTask.estimate != 0 &&
            newTask.name != ""
        ) {
            const docRef = await addDoc(collection(db, "tasks"), {
                info: newTask.info.trim(),
                type: newTask.type,
                estimate: newTask.estimate,
                tag: newTask.tag,
                name: newTask.name,
                date: newTask.date,
                status: newTask.status,
            });
            setNewTask({
                info: "",
                type: "User Story",
                estimate: 0,
                tag: "",
                name: "",
                date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
                status: "Backlog",
            });
        }
    };

    return (
        <div>
            <p className="inline-block my-10 flex text-5xl font-extrabold justify-center items-center text-black dark:text-white">
                <Link
                    className="mt-2 text-center"
                    title="Back to Menu"
                    href="/Menu"
                >
                    <Image
                        className="float-left mr-3"
                        priority
                        src="/logo.png"
                        height={50}
                        width={50}
                        alt="Sunday.com unnamed logo"
                    />
                </Link>
                Task Creation
            </p>
            <div className="h-screen flex justify-center">
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                                for="grid-password"
                            >
                                User Story
                            </label>
                            <input
                                value={newTask.info}
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        info: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="Task name"
                            />
                            <p className="text-gray-600 dark:text-white text-xs italic">
                                Make sure to follow INVEST criteria!
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                                for="grid-city"
                            >
                                User Story or Bug
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    value={newTask.type}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            type: e.target.value,
                                        })
                                    }
                                >
                                    <option>User Story</option>
                                    <option>Bug</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                                for="grid-state"
                            >
                                Tag
                            </label>
                            <div className="relative">
                                <select
                                    value={newTask.tag}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            tag: e.target.value,
                                        })
                                    }
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                >
                                    <option>Front end</option>
                                    <option>Back end</option>
                                    <option>API</option>
                                    <option>Database</option>
                                    <option>Framework</option>
                                    <option>Testing</option>
                                    <option>UI</option>
                                    <option>UX</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                                for="grid-zip"
                            >
                                Estimate
                            </label>
                            <input
                                value={newTask.estimate}
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        estimate: e.target.valueAsNumber,
                                    })
                                }
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-zip"
                                type="number"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                                for="grid-first-name"
                            >
                                Name
                            </label>
                            <input
                                value={newTask.name}
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        name: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="Norman Chen"
                            />
                            <p className="text-red-500 text-xs italic">
                                Please fill out this field.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <button
                                onClick={addTask}
                                className="mt-2 py-2 px-4 bg-green-500 hover:bg-green-400 focus:ring-green-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                type="submit"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <button className="mt-2 py-2 px-4 bg-red-500 hover:bg-red-400 focus:ring-red-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                <Link href="/ProductBacklog">
                                    Return to Product Backlog
                                </Link>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
