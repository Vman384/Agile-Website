export default interface CardButtonProps {
    card: {id: number,
            text: string,
            description: string};
    chooseCard: Function;
}