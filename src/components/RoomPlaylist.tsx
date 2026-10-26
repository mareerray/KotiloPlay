import "./LivingRoomTv.css";

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
    let embedUrl: string;
    let youtubeUrl: string;

    if (videoId) {
        const id = encodeURIComponent(videoId);

        embedUrl =
            `https://www.youtube.com/embed/${id}?playsinline=1`;

        youtubeUrl =
            `https://www.youtube.com/watch?v=${id}`;
    } else if (playlistId) {
        const id = encodeURIComponent(playlistId);

        embedUrl =
            "https://www.youtube.com/embed" +
            `?listType=playlist&list=${id}&playsinline=1`;

        youtubeUrl =
            `https://www.youtube.com/playlist?list=${id}`;
    } else {
        return null;
    }

    return (
        <section
            className="room-music-tv"
            aria-label={`${roomName} music`}
        >
            <div className="room-tv__dock">
                <iframe
                    key={embedUrl}
                    className="room-tv__player"
                    src={embedUrl}
                    title={`${roomName} YouTube music player`}
                    width={360}
                    height={250}
                    allow="encrypted-media; fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>

            <a
                className="room-tv__link"
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open music on YouTube ↗
            </a>
        </section>
    );
}

export default RoomPlaylist;