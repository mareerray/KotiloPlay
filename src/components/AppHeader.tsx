import { Link } from "react-router-dom";

function AppHeader() {
    return (
        <header className="site-header" id="top">
            <Link
                className="site-brand"
                to="/"
                aria-label="KotiloPlay home"
            >
                <img
                    src="src/assets/kotiloplay-logo-nobg-1.png"
                    alt=""
                    width={64}
                    height={64}
                />

                <span>KotiloPlay</span>
            </Link>
        </header>
    );
}

export default AppHeader;