import Link from 'next/link'
import CardButtonProps from '../../../../interfaces/menu';

const CardButton: React.FunctionComponent<CardButtonProps> = ({ card, chooseCard }) => {
    const linkAddress = "/" + card.text.split(" ").join("")

    return (
        <Link href={linkAddress}>
            <button className="mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" >
                    Select
            </button>
        </Link>
    )
}

export default CardButton
