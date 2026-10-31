type RoomBackgroundProps = {
    src: string;
    alt: string;
};

function RoomBackground({ src, alt }: RoomBackgroundProps) {
    return (
        <div className="room-bg">
            <img
                className="room-bg__blur"
                src={src}
                alt=""
                aria-hidden="true"
                decoding="async"
            />
            <img 
                className="room-bg__image" 
                src={src} 
                alt={alt} 
                fetchPriority="high"
                decoding="async" 
            />
        </div>
    );
}

export default RoomBackground;