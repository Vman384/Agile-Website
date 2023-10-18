import PBacklog_pic from "../../../components/Guide/PBacklog_pic";
import PBacklog_task_creation_pic from "../../../components/Guide/PBacklog_task_creation_pic";
import Register_pic from "../../../components/Guide/Register_pic";

import Link from "next/link";
import Image from "next/image";

export default function Guide() {
    return (
        <div className="mb-10">
            <div className="mt-8 mb-2 justify-center mx-5 flex">
                <Link href="/Menu" title="Back to Menu">
                    <Image
                        className="hidden dark:block"
                        priority
                        src="/named-logo-light-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />

                    <Image
                        className="block dark:hidden"
                        priority
                        src="/named-logo-dark-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />
                </Link>
            </div>

            <main className="px-6 mx-auto">
                <p className="mt-8 mb-8 text-3xl text-center dark:text-white">
                    <span className="font-bold">Guide Page</span>
                    <div className="flex-row">
                        <p className="inline-block whitespace-nowrap text-2xl mt-5">
                            Welcome to the Guide for&nbsp;&nbsp;
                            <Image
                                className="hidden dark:block float-right mt-1"
                                priority
                                src="/named-logo-light-text.png"
                                height={70}
                                width={125}
                                alt="Sunday.com logo"
                            />
                            <Image
                                className="block dark:hidden float-right mt-1"
                                priority
                                src="/named-logo-dark-text.png"
                                height={70}
                                width={125}
                                alt="Sunday.com logo"
                            />
                        </p>
                    </div>
                </p>
                <p className="mt-8 dark:text-white text-2xl text-center font-bold">
                    Register
                    <p className="mt-2 dark:text-white text-lg font-normal">
                        To access the app, you click register on login page
                    </p>
                    <p className="mt-1 dark:text-white text-lg font-normal">
                        and make an account to use this app with your email and
                        password.
                    </p>
                    <Register_pic />
                </p>

                <p className="mt-8 dark:text-white text-2xl font-bold text-center">
                    Product Backlog
                    <p className="mt-4 dark:text-white text-lg font-normal">
                        From the menus this is the product backlog page.
                    </p>
                    <p className="mt-1 mb-4 dark:text-white text-lg font-normal">
                        Here you can see all your tasks for the project you're
                        working on.
                    </p>
                    <PBacklog_pic />
                    <p className="mt-8  dark:text-white text-lg font-normal">
                        You can also drag and drop each task and adjust each
                        aspect of the task.
                    </p>
                    <p className="mt-1 dark:text-white text-lg font-normal">
                        If you want to add new tasks, click the green button
                    </p>
                    <p className="mt-1 mb-8 dark:text-white text-lg font-normal">
                        and fill out the necessary details for the new task.
                    </p>
                    <PBacklog_task_creation_pic />
                </p>

                <p className="mt-8 dark:text-white text-2xl font-bold text-center">
                    Scrum Board
                    <p className="mt-2 dark:text-white text-lg font-normal">
                        This is the scrum board, similiar to the product
                        backlog,
                    </p>
                    <p className="mt-1 dark:text-white text-lg font-normal">
                        you can see all your tasks, drag and drop each tasks.
                    </p>
                    <p className="mt-1 dark:text-white text-lg font-normal">
                        Click the plus icon to add new tasks and
                    </p>
                    <p className="mt-1 dark:text-white text-lg font-normal">
                        fill out necessary details for the new task.
                    </p>
                </p>

                <div className="mt-8 dark:text-white text-2xl text-center">
                    <p className="mb-4">
                        Now enjoy easily planning and current and upcoming
                        projects with your team! ☺
                    </p>
                    <Link className="mt-2 text-center" href="/Menu">
                        <p className="inline-block hover:underline">
                            <Image
                                className="float-left mr-3"
                                priority
                                src="/logo.png"
                                height={25}
                                width={25}
                                alt="Sunday.com unnamed logo"
                            />
                            Back to menu
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
