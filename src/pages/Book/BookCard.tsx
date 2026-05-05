import type { BookItem } from "./BookSearch.tsx";

type Props = {
    book: BookItem;
};

function BookCard({ book }: Props) {
    return (
        <Card to ={`/book-detail/${}`}>
        </Card>

        );
}

export default BookCard;

