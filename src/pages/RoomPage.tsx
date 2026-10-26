import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { rooms } from "../data/rooms";
import type { Room } from "../data/rooms";
import RoomPlaylist from "../components/RoomPlaylist";
import LivingRoomTv from "../components/LivingRoomTv";
import "./room.css";

type MusicSource = {
    videoId?: string;
    playlistId?: string;
};

function parseYouTubeLink(value: string): MusicSource | null {
    try {
        const url = new URL(value.trim());

        if (
            !["https:", "http:"].includes(url.protocol) ||
            url.username ||
            url.password ||
            url.port
        ) {
            return null;
        }

        const host = url.hostname.toLowerCase();

        const isYouTube = [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "music.youtube.com",
        ].includes(host);

        const isShortLink = host === "youtu.be";

        if (!isYouTube && !isShortLink) {
            return null;
        }

        const playlistId = url.searchParams.get("list");

        if (playlistId) {
            return /^[a-zA-Z0-9_-]{2,200}$/.test(playlistId)
                ? { playlistId }
                : null;
        }

        const segments = url.pathname.split("/").filter(Boolean);
        let videoId: string | null = null;

        if (isShortLink) {
            videoId = segments[0] ?? null;
        } else if (url.pathname === "/watch") {
            videoId = url.searchParams.get("v");
        } else if (
            ["shorts", "live", "embed"].includes(segments[0])
        ) {
            videoId = segments[1] ?? null;
        }

        return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)
            ? { videoId }
            : null;
    } catch {
        return null;
    }
}

function getSavedLink(storageKey: string): string {
    try {
        const saved = localStorage.getItem(storageKey);
        return saved && parseYouTubeLink(saved) ? saved : "";
    } catch {
        return "";
    }
}

function getDefaultLink(room: Room): string {
    if (room.videoId) {
        return `https://www.youtube.com/watch?v=${room.videoId}`;
    }

    if (room.playlistId) {
        return `https://www.youtube.com/playlist?list=${room.playlistId}`;
    }

    return "";
}

function RoomContent({ room }: { room: Room }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const index = rooms.findIndex((r) => r.id === room.id);
    const prevRoom = rooms[(index - 1 + rooms.length) % rooms.length];
    const nextRoom = rooms[(index + 1) % rooms.length];
    const storageKey = `kotiloplay:music:${room.id}`;

    const [savedLink, setSavedLink] = useState(() =>
        getSavedLink(storageKey)
    );

    const [draftLink, setDraftLink] = useState(
        savedLink || getDefaultLink(room)
    );

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const music: MusicSource =
        parseYouTubeLink(savedLink) ?? {
            videoId: room.videoId,
            playlistId: room.playlistId,
        };

    function openEditor() {
        setDraftLink(savedLink || getDefaultLink(room));
        setError("");
        setMessage("");
        dialogRef.current?.showModal();
    }

    function closeEditor() {
        dialogRef.current?.close();
    }

    function saveMusic(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const link = draftLink.trim();

        if (!parseYouTubeLink(link)) {
            setError(
                "Please paste a valid YouTube video or playlist link."
            );
            return;
        }

        try {
            localStorage.setItem(storageKey, link);
        } catch {
            setError(
                "Your browser could not save this choice. Check that site storage is allowed."
            );
            return;
        }

        setSavedLink(link);
        setError("");
        setMessage(`Music updated for ${room.name}.`);
        closeEditor();
    }

    function restoreDefault() {
        try {
            localStorage.removeItem(storageKey);
        } catch {
            setError(
                "Your browser could not remove the saved choice."
            );
            return;
        }

        setSavedLink("");
        setDraftLink(getDefaultLink(room));
        setError("");
        setMessage(`Default music restored for ${room.name}.`);
        closeEditor();
    }

    return (
        <section className="room-page" aria-labelledby="room-title">
            <div className="room-page__toolbar">
                <Link className="room-page__back" to="/">
                    ← Back home
                </Link>

                <button
                    type="button"
                    className="room-page__change-music"
                    aria-haspopup="dialog"
                    aria-controls="room-music-editor"
                    onClick={openEditor}
                >
                    ♫ Change music
                </button>
            </div>

            <dialog
                ref={dialogRef}
                id="room-music-editor"
                className="music-editor"
                aria-labelledby="music-editor-title"
                aria-describedby="room-music-help"
            >
                <div className="music-editor__heading">
                    <h2 id="music-editor-title">
                        Music for {room.name}
                    </h2>

                    <button
                        type="button"
                        className="music-editor__close"
                        onClick={closeEditor}
                        aria-label="Close music settings"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={saveMusic}>
                    <label htmlFor="room-music-link">
                        YouTube video or playlist link
                    </label>

                    <input
                        id="room-music-link"
                        type="url"
                        value={draftLink}
                        onChange={(event) => {
                            setDraftLink(event.target.value);
                            setError("");
                        }}
                        placeholder="https://www.youtube.com/..."
                        aria-describedby={
                            error
                                ? "room-music-help room-music-error"
                                : "room-music-help"
                        }
                        aria-invalid={Boolean(error)}
                        autoFocus
                        required
                    />

                    <p
                        id="room-music-help"
                        className="music-editor__help"
                    >
                        Saved in this browser for this room only.
                        Links containing a playlist use the playlist.
                    </p>

                    {error && (
                        <p
                            id="room-music-error"
                            className="music-editor__error"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <div className="music-editor__actions">
                        <button type="submit">
                            Save music
                        </button>

                        <button
                            type="button"
                            onClick={closeEditor}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={restoreDefault}
                            disabled={!savedLink}
                        >
                            Restore default
                        </button>
                    </div>
                </form>
            </dialog>

            <p className="room-page__music-status" role="status">
                {message}
            </p>

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
                    videoId={music.videoId}
                    playlistId={music.playlistId}
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

                    {music.videoId || music.playlistId ? (
                        <RoomPlaylist
                            roomName={room.name}
                            videoId={music.videoId}
                            playlistId={music.playlistId}
                        />
                    ) : (
                        <p className="room-page__music-placeholder">
                            Choose some music for this room using
                            “Change music” above.
                        </p>
                    )}
                </>
            )}

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
        </section>
    );
}

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

    return <RoomContent key={room.id} room={room} />;
}

export default RoomPage;