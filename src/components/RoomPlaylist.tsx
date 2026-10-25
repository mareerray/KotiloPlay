type RoomPlaylistProps = {
    roomName: string;
    videoId?: string;
    playlistId?: string;
};

function RoomPlaylist({
    roomName,
    videoId,
    playlistId,
}: RoomPlaylistProps) {
    if (!videoId && !playlistId) {
        return null;
    }

    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${encodeURIComponent(
            videoId
        )}?playsinline=1`
        : `https://www.youtube.com/embed?listType=playlist&list=${encodeURIComponent(
            playlistId!
        )}&playsinline=1`;

    const youtubeUrl = videoId
        ? `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
        : `https://www.youtube.com/playlist?list=${encodeURIComponent(
            playlistId!
        )}`;

    return (
        <section
            className="room-playlist"
            aria-label={`${roomName} music`}
        >

            <iframe
                key={embedUrl}
                className="room-playlist__player"
                src={embedUrl}
                title={`${roomName} YouTube music player`}
                width={560}
                height={315}
                allow="encrypted-media; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />

            <a
                className="room-playlist__link"
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open on YouTube ↗
            </a>
        </section>
    );
}

export default RoomPlaylist;