import { Link, useParams } from "react-router-dom";
import { rooms } from "../data/rooms";
import RoomPlaylist from "../components/RoomPlaylist";
import LivingRoomTv from "../components/LivingRoomTv";
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
                    A little cozy escape
                </p>

                <h1 id="room-title">{room.name}</h1>

                <p>
                    Settle in, put on some music, and take a moment
                    for yourself.
                </p>
            </header>

            {room.id === "living-room" && room.scene ? (
                <LivingRoomTv
                    scene={room.scene}
                    sceneAlt={room.sceneAlt ?? room.name}
                    roomName={room.name}
                    videoId={room.videoId}
                    playlistId={room.playlistId}
                />
            ) : (
                <>
                    <div className="room-page__scene-wrap">
                        {room.scene ? (
                            <img
                                className="room-page__scene"
                                src={room.scene}
                                alt={room.sceneAlt ?? room.name}
                                width={1200}
                                height={820}
                            />
                        ) : (
                            <p className="room-page__placeholder">
                                A cozy scene for this room is coming soon.
                            </p>
                        )}
                    </div>

                    {room.videoId || room.playlistId ? (
                        <RoomPlaylist
                            roomName={room.name}
                            videoId={room.videoId}
                            playlistId={room.playlistId}
                        />
                    ) : (
                        <p className="room-page__music-placeholder">
                            A soundtrack for this room is coming soon.
                        </p>
                    )}
                </>
            )}
        </section>
    );
}

export default RoomPage;