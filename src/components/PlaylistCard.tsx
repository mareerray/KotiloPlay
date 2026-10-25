import type { Playlist } from "../data/playlists";
import { Link } from "react-router-dom";
import "./PlaylistCard.css";

type Props = {
    playlist: Playlist;
};

function PlaylistCard({ playlist }: Props) {
    return (
        <Link
            to={`/play/${playlist.id}`}
            className="playlist-card"
            aria-label={`Play ${playlist.title}`}
        >
            <span className="playlist-card__cover" aria-hidden="true">
                {playlist.coverEmoji}
            </span>

            <span className="playlist-card__text">
                <span className="playlist-card__title">
                    {playlist.title}
                </span>

                <span className="playlist-card__mood">
                    {playlist.mood}
                </span>
            </span>

            <span className="playlist-card__play" aria-hidden="true">
                ▶
            </span>
        </Link>
    );
}

export default PlaylistCard;