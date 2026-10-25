import { Link, useParams } from "react-router-dom";
import { rooms } from "../data/rooms";
import autumnRoom from "../assets/svg/living-room-autumn.svg";
import "./room.css";

function RoomPage() {
    const { roomId } = useParams();
    const room = rooms.find((room) => room.id === roomId);

    if (!room) {
        return (
            <section className="room-page">
                <h1>Room not found</h1>
                <Link to="/">← Back home</Link>
            </section>
        );
    }

    return (
        <section className="room-page" aria-labelledby="room-title">
            <Link className="room-page__back" to="/">
                ← Back home
            </Link>

            <header className="room-page__intro">
                <p className="room-page__eyebrow">
                    A little autumn escape
                </p>

                <h1 id="room-title">{room.name}</h1>

                <p>
                    Golden leaves, warm tea, and a moment just for you.
                </p>
            </header>

            <img
                className="room-page__scene"
                src={autumnRoom}
                alt="An animated cozy autumn living room with falling leaves,
                    a sage armchair, a glowing lamp, and steaming tea."
                width={800}
                height={560}
            />
        </section>
    );
}

export default RoomPage;