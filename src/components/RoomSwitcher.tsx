import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";

type RoomSwitcherProps = {
    roomId: string;
};

function RoomSwitcher({ roomId }: RoomSwitcherProps) {
    const index = rooms.findIndex((room) => room.id === roomId);

    if (index === -1 || rooms.length < 2) {
        return null;
    }

    const prevRoom =
        rooms[(index - 1 + rooms.length) % rooms.length];

    const nextRoom =
        rooms[(index + 1) % rooms.length];

    return (
        <nav className="room-switcher" aria-label="Switch room">
            <Link
                to={`/rooms/${prevRoom.id}`}
                className="room-switcher__btn"
                aria-label={`Previous room: ${prevRoom.name}`}
                title={prevRoom.name}
            >
                <span aria-hidden="true">«</span>
            </Link>

            <Link
                to={`/rooms/${nextRoom.id}`}
                className="room-switcher__btn"
                aria-label={`Next room: ${nextRoom.name}`}
                title={nextRoom.name}
            >
                <span aria-hidden="true">»</span>
            </Link>
        </nav>
    );
}

export default RoomSwitcher;