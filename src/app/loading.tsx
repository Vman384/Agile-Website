"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
    // const router = useRouter();

    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const handleStart = (url: string) =>
    //         url !== router.asPath && setLoading(true);
    //     const handleComplete = (url: string) =>
    //         url === router.asPath && setLoading(false);

    //     router.events.on("routeChangeStart", handleStart);
    //     router.events.on("routeChangeComplete", handleComplete);
    //     router.events.on("routeChangeError", handleComplete);

    //     return () => {
    //         router.events.off("routeChangeStart", handleStart);
    //         router.events.off("routeChangeComplete", handleComplete);
    //         router.events.off("routeChangeError", handleComplete);
    //     };
    // });

    // return (
    //     loading && (
    //         <div className="flex justify-centre">
    //             <Image
    //                 priority
    //                 src="/named-logo-dark-text.png"
    //                 height={188}
    //                 width={750}
    //                 alt="Sunday.com logo"
    //             />

    //             <Spinner color="info" />
    //         </div>
    //     )
    // );

    return (
        <div className="flex justify-center text-center p-10 my-10 flex-1">
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
        </div>
    );
}
