export type MusicSource = {
    videoId?: string;
    playlistId?: string;
};

export function parseYouTubeLink(value: string): MusicSource | null {
    try {
        const url = new URL(value.trim());

        if (
            !["https:", "http:"].includes(url.protocol) ||
            url.username ||
            url.password ||
            url.port
        ) {
            return null;
        }

        const host = url.hostname.toLowerCase();

        const isYouTube = [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "music.youtube.com",
        ].includes(host);

        const isShortLink = host === "youtu.be";

        if (!isYouTube && !isShortLink) {
            return null;
        }

        const playlistId = url.searchParams.get("list");

        if (playlistId) {
            return /^[a-zA-Z0-9_-]{2,200}$/.test(playlistId)
                ? { playlistId }
                : null;
        }

        const segments = url.pathname.split("/").filter(Boolean);
        let videoId: string | null = null;

        if (isShortLink) {
            videoId = segments[0] ?? null;
        } else if (url.pathname === "/watch") {
            videoId = url.searchParams.get("v");
        } else if (
            ["shorts", "live", "embed"].includes(segments[0])
        ) {
            videoId = segments[1] ?? null;
        }

        return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)
            ? { videoId }
            : null;
    } catch {
        return null;
    }
}
export const MAX_SAVED_MUSIC = 10;
export const MAX_TITLE_LENGTH = 30;

export type SavedMusic = {
    id: string;
    title: string;
    link: string;
};

function isSavedMusic(value: unknown): value is SavedMusic {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const item = value as Record<string, unknown>;

    return (
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.link === "string" &&
        parseYouTubeLink(item.link) !== null
    );
}

export function loadSavedMusic(storageKey: string): SavedMusic[] {
    try {
        const raw = localStorage.getItem(storageKey);

        if (!raw) {
            return [];
        }

        const data: unknown = JSON.parse(raw);

        return Array.isArray(data)
            ? data.filter(isSavedMusic)
            : [];
    } catch {
        return [];
    }
}

export async function fetchMusicTitle(
    source: MusicSource
): Promise<string | null> {
    // Use the parsed source, not the original pasted link.
    // This respects your rule that a playlist takes priority.
    const url = source.playlistId
        ? `https://www.youtube.com/playlist?list=${source.playlistId}`
        : source.videoId
            ? `https://www.youtube.com/watch?v=${source.videoId}`
            : null;

    if (!url) {
        return null;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(
        () => controller.abort(),
        5000
    );

    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
            { signal: controller.signal }
        );

        if (!response.ok) {
            return null;
        }

        const data: unknown = await response.json();

        if (
            typeof data === "object" &&
            data !== null &&
            "title" in data &&
            typeof data.title === "string"
        ) {
            return data.title.trim() || null;
        }

        return null;
    } catch {
        return null;
    } finally {
        window.clearTimeout(timeout);
    }
}
