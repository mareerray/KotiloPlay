export type Playlist = {
    id: string;
    title: string;
    mood: string;
    videoId: string;
    coverEmoji: string;
};

export const playlists: Playlist[] = [
    {
        id: "cozy-morning",
        title: "Cozy Morning",
        mood: "Soft start to the day",
        videoId: "jfKfPfyJRdk",
        coverEmoji: "☀️",
    },
    {
        id: "rainy-day",
        title: "Rainy Day",
        mood: "Calm and thoughtful",
        videoId: "DWcJFNfaw9c",
        coverEmoji: "🌧️",
    },
    {
        id: "garden-peace",
        title: "Garden Peace",
        mood: "Nature and quiet",
        videoId: "5qap5aO4i9A",
        coverEmoji: "🌿",
    },
];