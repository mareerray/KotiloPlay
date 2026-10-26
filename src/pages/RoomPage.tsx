import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";

import { rooms } from "../data/rooms";
import type { Room } from "../data/rooms";

import RoomPlaylist from "../components/RoomPlaylist";
import RoomBackground from "../components/RoomBackground";
import RoomSwitcher from "../components/RoomSwitcher";

import {
    MAX_SAVED_MUSIC,
    MAX_TITLE_LENGTH,
    parseYouTubeLink,
    loadSavedMusic,
    fetchMusicTitle,
} from "../utils/roomMusic";

import type {
    MusicSource,
    SavedMusic,
} from "../utils/roomMusic";

import "./room.css";


function RoomContent({ room }: { room: Room }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const storageKey = `kotiloplay:music-list:${room.id}`;

    const [savedMusic, setSavedMusic] = useState(
        () => loadSavedMusic(storageKey)
    );

    // null means "use the room's default music".
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [draftLink, setDraftLink] = useState("");
    const [draftTitle, setDraftTitle] = useState("");
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const selectedMusic = savedMusic.find(
        (item) => item.id === selectedId
    );

    const music: MusicSource =
        (selectedMusic
            ? parseYouTubeLink(selectedMusic.link)
            : null) ?? {
            videoId: room.videoId,
            playlistId: room.playlistId,
        };

    const hasDefaultMusic = Boolean(
        room.videoId || room.playlistId
    );

    const currentMusicTitle =
        selectedMusic?.title ?? `${room.name} default`;

    function openEditor() {
        setDraftLink("");
        setDraftTitle("");
        setError("");
        setMessage("");
        dialogRef.current?.showModal();
    }

    function closeEditor() {
        dialogRef.current?.close();
    }

    async function saveMusic(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (saving) {
            return;
        }

        setError("");

        if (savedMusic.length >= MAX_SAVED_MUSIC) {
            setError(
                "You can save up to 10 items in this room. Remove one to add another."
            );
            return;
        }

        const link = draftLink.trim();
        const source = parseYouTubeLink(link);

        if (!source) {
            setError(
                "Please paste a valid YouTube video or playlist link."
            );
            return;
        }

        // Compare the parsed IDs so different URL formats
        // for the same source count as duplicates.
        const existing = savedMusic.find((item) => {
            const other = parseYouTubeLink(item.link);

            return source.playlistId
                ? other?.playlistId === source.playlistId
                : other?.videoId === source.videoId;
        });

        if (existing) {
            setError(
                "This music is already saved in this room."
            );
            return;
        }

        setSaving(true);

        try {
            const title =
                draftTitle.trim() ||
                (await fetchMusicTitle(source)) ||
                (source.playlistId ? "My playlist" : "My video");

            const item: SavedMusic = {
                id: crypto.randomUUID(),
                title: title.slice(0, MAX_TITLE_LENGTH).trim(),
                link,
            };

            const next = [...savedMusic, item];

            // Save successfully before updating the visible list.
            localStorage.setItem(storageKey, JSON.stringify(next));

            setSavedMusic(next);
            setSelectedId(item.id);
            setDraftLink("");
            setDraftTitle("");
            setMessage(`Added “${item.title}”.`);
        } catch {
            setError(
                "Your browser could not save this music. Please try again."
            );
        } finally {
            setSaving(false);
        }
    }

    function selectMusic(id: string | null) {
        setSelectedId(id);
        setError("");
        closeEditor();
    }

    function removeMusic(id: string) {
        const next = savedMusic.filter((item) => item.id !== id);

        try {
            localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
            setError("Your browser could not remove this item.");
            return;
        }

        setSavedMusic(next);
        setError("");

        if (selectedId === id) {
            setSelectedId(null);
        }

        setMessage("Saved music removed.");
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

                {hasDefaultMusic && (
                    <section aria-labelledby="default-music-heading">
                        <h3 id="default-music-heading">Default music</h3>

                        <div className="music-editor__item">
                            <span
                                className={
                                    selectedId === null
                                        ? "music-editor__active-title"
                                        : ""
                                }
                            >
                                {selectedId === null && (
                                    <span role="img" aria-label="Selected">
                                        ♫{" "}
                                    </span>
                                )}
                                {room.name} default
                            </span>

                            <button
                                type="button"
                                onClick={() => selectMusic(null)}
                            >
                                Select
                            </button>
                        </div>
                    </section>
                )}
                <section aria-labelledby="saved-music-heading">
                    <h3 id="saved-music-heading">
                        Saved music — {savedMusic.length} / {MAX_SAVED_MUSIC}
                    </h3>

                    {savedMusic.length === 0 ? (
                        <p>No saved music yet. Add your first choice below.</p>
                    ) : (
                        <ul className="music-editor__saved">
                            {savedMusic.map((item) => (
                                <li
                                    key={item.id}
                                    className="music-editor__item"
                                >
                                    <span
                                        className={
                                            selectedId === item.id
                                                ? "music-editor__active-title"
                                                : ""
                                        }
                                    >
                                        {selectedId === item.id && (
                                            <span role="img" aria-label="Selected">
                                                ♫{" "}
                                            </span>
                                        )}
                                        {item.title}
                                    </span>

                                    <div className="music-editor__item-actions">
                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={() => selectMusic(item.id)}
                                            aria-label={`Select ${item.title}`}
                                        >
                                            Select
                                        </button>

                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={() => removeMusic(item.id)}
                                            aria-label={`Remove ${item.title}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>)}
                </section>

                <form onSubmit={saveMusic}>
                    <h3>Add music</h3>

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
                        disabled={saving}
                        required
                        aria-describedby="room-music-help"
                    />

                    <label htmlFor="room-music-title">
                        Title (optional)
                    </label>

                    <input
                        id="room-music-title"
                        type="text"
                        value={draftTitle}
                        onChange={(event) =>
                            setDraftTitle(event.target.value)
                        }
                        placeholder="Leave empty to try the YouTube title"
                        maxLength={MAX_TITLE_LENGTH}
                        disabled={saving}
                    />

                    <p id="room-music-help" className="music-editor__help">
                        Saved in this browser for this room only.
                        Playlist links use the playlist.<br />
                        Select your music, then press play in the player.
                    </p>

                    {savedMusic.length >= MAX_SAVED_MUSIC && (
                        <p>
                            This room has 10 saved items.
                            Remove one to add another.
                        </p>
                    )}

                    {error && (
                        <p className="music-editor__error" role="alert">
                            {error}
                        </p>
                    )}

                    <p role="status">{message}</p>

                    <div className="music-editor__actions">
                        <button
                            type="submit"
                            disabled={
                                saving ||
                                savedMusic.length >= MAX_SAVED_MUSIC
                            }
                        >
                            {saving ? "Adding…" : "Add music"}
                        </button>

                        <button type="button" onClick={closeEditor}>
                            Close
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
            <p className="room-page__current-music" role="status">
                Current music: ♫ {currentMusicTitle}
            </p>
            {room.scene ? (

                <RoomBackground
                    src={room.scene}
                    alt={room.sceneAlt ?? room.name}
                />
            ) : (
                <p className="room-page__placeholder">
                    A cozy scene for this room is coming soon.
                </p>
            )}

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

            <RoomSwitcher roomId={room.id} />
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