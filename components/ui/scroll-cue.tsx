export function ScrollCue() {
  return (
    <div className="hero-scroll-more" aria-hidden="true">
      <div className="wrap">
        {[1, 2, 3].map((index) => (
          <svg
            key={index}
            className={`caret-down-${index}`}
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3006 1.55947L9.01621 5.7599C7.83309 6.91981 5.93369 6.90101 4.77378 5.71789L0.573346 1.43346"
              stroke="white"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
