import { useRegisterSW } from "virtual:pwa-register/react";

function PWAUpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisterError(error) {
            console.error("PWA registration failed:", error);
        },
    });

    if (!needRefresh) {
        return null;
    }

    return (
        <aside
            className="pwa-update"
            role="status"
            aria-live="polite"
        >
            <p>A fresh little update is ready 🌿</p>

            <div className="pwa-update__actions">
                <button
                    type="button"
                    onClick={() => void updateServiceWorker(true)}
                >
                    Update now
                </button>

                <button
                    type="button"
                    onClick={() => setNeedRefresh(false)}
                >
                    Later
                </button>
            </div>
        </aside>
    );
}

export default PWAUpdatePrompt;