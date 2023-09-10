"use client"
import IPageProps from '../../../interfaces/page';
import Cardlist from './components/Cardlist';
import Card from './components/Card';

const Menu: React.FunctionComponent<IPageProps> = props => {
    const cards = [
        { 
          id: 1,
          text: "Scrum Board",
          description: "This is a small little paragaph about the scrum board and what it does"
        },
        {
          id: 2,
          text: "Product Backlog",
          description: "This is a small little paragaph about the product backlog and what it does"
        }
      ];

    return (
        <div>
          <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
          <Cardlist cards={cards}/>
        </div>
    )
}

export default Menu;