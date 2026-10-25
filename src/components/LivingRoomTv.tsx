import "./LivingRoomTv.css";

type LivingRoomTvProps = {
  scene: string;
  sceneAlt: string;
  roomName: string;
  videoId?: string;
  playlistId?: string;
};

export default function LivingRoomTv({
  scene,
  sceneAlt,
  roomName,
  videoId,
  playlistId,
}: LivingRoomTvProps) {
  let embedUrl: string | undefined;
  let youtubeUrl: string | undefined;

  if (videoId) {
    const id = encodeURIComponent(videoId);
    embedUrl = `https://www.youtube.com/embed/${id}?playsinline=1`;
    youtubeUrl = `https://www.youtube.com/watch?v=${id}`;
  } else if (playlistId) {
    const id = encodeURIComponent(playlistId);
    embedUrl = `https://www.youtube.com/embed?listType=playlist&list=${id}&playsinline=1`;
    youtubeUrl = `https://www.youtube.com/playlist?list=${id}`;
  }

  return (
    <div className="room-tv">
      <div className="room-tv__stage">
        <img
          className="room-tv__art"
          src={scene}
          alt={sceneAlt}
          width={1200}
          height={820}
        />
        {embedUrl && (
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
        )}
      </div>
      {youtubeUrl && (
        <a className="room-tv__link" href={youtubeUrl}
          target="_blank" rel="noopener noreferrer">
          Open music on YouTube ↗
        </a>
      )}
    </div>
  );
}
