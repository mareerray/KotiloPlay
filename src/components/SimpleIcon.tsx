type SimpleIconProps = {
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
};

function SimpleIcon({
    className,
    strokeWidth,
}: SimpleIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="8" />
        </svg>
    );
}

export default SimpleIcon;