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
            />
            <img className="room-bg__image" src={src} alt={alt} />
        </div>
    );
}

export default RoomBackground;