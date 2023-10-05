import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify centre">
            <Image
                priority
                src="/named-logo-dark-text.png"
                height={188}
                width={750}
                alt="Sunday.com logo"
            />
        </div>
    );
}
