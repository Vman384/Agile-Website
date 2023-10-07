import Link from "next/link";

export default function CardButton({
    card,
}: {
    card: { id: number; text: string; description: string };
}) {
    const linkAddress = "/" + card.text.split(" ").join("");

    return (
        <Link href={linkAddress}>
            <button className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 focus:ring-green-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                Select
            </button>
        </Link>
    );
}
