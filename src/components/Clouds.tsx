import cloudUrl from "../assets/svg/cloud.svg";
import "./Clouds.css";

function Clouds() {
    return (
        <div className="clouds" aria-hidden="true">
            <img
                className="cloud cloud-1"
                src={cloudUrl}
                alt=""
            />

            <img
                className="cloud cloud-2"
                src={cloudUrl}
                alt=""
            />

            <img
                className="cloud cloud-2"
                src={cloudUrl}
                alt=""
            />

            <img
                className="cloud cloud-2"
                src={cloudUrl}
                alt=""
            />

            <img
                className="cloud cloud-2"
                src={cloudUrl}
                alt=""
            />
        </div>
    );
}

export default Clouds;