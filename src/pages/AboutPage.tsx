import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./about.css";

function AboutPage() {
    useEffect(() => {
        document.body.classList.add("about-background");

        return () => {
            document.body.classList.remove("about-background");
        };
    }, []);
    
    return (
        <div className="about-wallpaper">
        <article className="about-page" aria-labelledby="about-title">
            <Link className="about-page__back" to="/">
                ← Back home
            </Link>

            <header className="about-page__intro">
                <p className="about-page__eyebrow">
                    Make yourself at home
                </p>

                <h1 id="about-title">About KotiloPlay</h1>

                <p>
                    A little illustrated home for your music.
                    Choose a room, enjoy the seasonal scenery,
                    and take a moment for yourself.
                </p>
            </header>

            <section
                className="about-page__section"
                aria-labelledby="about-start"
            >
                <h2 id="about-start">Your first visit</h2>

                <ol className="about-page__steps">
                    <li>
                        Choose a room from the house to step inside.
                    </li>
                    <li>
                        Press play in the TV to start the room’s music.
                    </li>
                    <li>
                        Settle in, or use the room-navigation arrows
                        to explore another space.
                    </li>
                </ol>
            </section>

            <section
                className="about-page__section"
                aria-labelledby="about-music"
            >
                <h2 id="about-music">Bring your own music</h2>

                <p>
                    Each room has a default music selection,
                    but you can make it your own.
                </p>

                <ol className="about-page__steps">
                    <li>Open “Change music” inside a room.</li>
                    <li>
                        Paste a YouTube video or playlist link.
                        You can also give it your own title.
                    </li>
                    <li>Choose “Add music” to save it.</li>
                    <li>Press play inside the TV.</li>
                </ol>

                <p>
                    To play something you saved earlier, open
                    “Change music” and choose “Select” next to it.
                    You can also select the room’s default music
                    or remove saved items.
                </p>
            </section>

            <section
                className="about-page__section"
                aria-labelledby="about-saved"
            >
                <h2 id="about-saved">A note about saved music</h2>

                <ul className="about-page__list">
                    <li>
                        You can save up to 10 music selections
                        in each room.
                    </li>
                    <li>
                        Your list stays in this browser on this
                        device. No account is needed.
                    </li>
                    <li>
                        Saved lists do not sync between devices
                        or browsers.
                    </li>
                    <li>
                        Clearing this app’s browser storage removes
                        your saved selections.
                    </li>
                </ul>

                <p>
                    KotiloPlay saves links and titles, not downloaded
                    music. Playback uses YouTube and requires an
                    internet connection.
                </p>
            </section>

            <section
                className="about-page__section"
                aria-labelledby="about-project"
            >
                <h2 id="about-project">Made with care</h2>

                <p>
                    KotiloPlay was created by Mayuree Reunsati
                    as a personal software-development project,
                    bringing together cozy visual design, music,
                    and interactive web experiences.
                </p>

                <p>
                    The idea is simple: a small, welcoming place
                    to enjoy music while studying, cooking,
                    resting, or going about your day.
                </p>

                <a href="https://github.com/mareerray/KotiloPlay">
                    Explore the project on GitHub ↗
                </a>

                <p className="about-page__note">
                    Videos and music are provided through YouTube
                    and belong to their respective owners.<br />
                    KotiloPlay is an independent project and is
                    not affiliated with YouTube.
                </p>
            </section>

            <Link className="about-page__home" to="/">
                Choose a room →
            </Link>
        </article>
        </div>
    );
}

export default AboutPage;