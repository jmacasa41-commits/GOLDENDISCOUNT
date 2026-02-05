export function GoldenBadgeLogo({ className = "w-32 h-32" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer golden ring */}
            <circle cx="250" cy="250" r="235" fill="#E5A850" stroke="#fff" strokeWidth="8" />
            <circle cx="250" cy="250" r="210" fill="none" stroke="#fff" strokeWidth="4" />

            {/* Inner golden circle */}
            <circle cx="250" cy="250" r="190" fill="#E5A850" />
            <circle cx="250" cy="250" r="165" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="3 8" />

            {/* Main background */}
            <circle cx="250" cy="250" r="155" fill="#E5A850" />

            {/* White star at top */}
            <g transform="translate(250, 105)">
                <path d="M 0,-20 L 6,-6 L 20,-6 L 9,2 L 14,16 L 0,8 L -14,16 L -9,2 L -20,-6 L -6,-6 Z" fill="white" />
            </g>

            {/* Left laurel wreath */}
            <g transform="translate(100, 250)">
                <path d="M 0,-60 Q -8,-58 -10,-50 Q -8,-45 -5,-42 Q -2,-40 2,-40 Q 5,-40 7,-42 Q 10,-45 10,-50 Q 8,-58 0,-60 Z" fill="white" />
                <path d="M -5,-45 Q -10,-40 -12,-32 Q -10,-27 -6,-24 Q -3,-22 2,-22 Q 6,-22 9,-24 Q 12,-27 12,-32 Q 10,-40 5,-45 Z" fill="white" />
                <path d="M -8,-30 Q -12,-22 -14,-12 Q -12,-7 -8,-4 Q -5,-2 0,-2 Q 5,-2 8,-4 Q 12,-7 12,-12 Q 10,-22 8,-30 Z" fill="white" />
                <path d="M -10,-15 Q -14,-5 -15,5 Q -13,10 -9,13 Q -6,15 -1,15 Q 4,15 7,13 Q 11,10 11,5 Q 9,-5 10,-15 Z" fill="white" />
                <path d="M -12,0 Q -15,12 -16,25 Q -14,30 -10,33 Q -7,35 -2,35 Q 3,35 6,33 Q 10,30 10,25 Q 8,12 12,0 Z" fill="white" />
                <path d="M -13,15 Q -16,28 -17,42 Q -15,47 -11,50 Q -8,52 -3,52 Q 2,52 5,50 Q 9,47 9,42 Q 7,28 13,15 Z" fill="white" />
            </g>

            {/* Right laurel wreath (mirrored) */}
            <g transform="translate(400, 250) scale(-1, 1)">
                <path d="M 0,-60 Q -8,-58 -10,-50 Q -8,-45 -5,-42 Q -2,-40 2,-40 Q 5,-40 7,-42 Q 10,-45 10,-50 Q 8,-58 0,-60 Z" fill="white" />
                <path d="M -5,-45 Q -10,-40 -12,-32 Q -10,-27 -6,-24 Q -3,-22 2,-22 Q 6,-22 9,-24 Q 12,-27 12,-32 Q 10,-40 5,-45 Z" fill="white" />
                <path d="M -8,-30 Q -12,-22 -14,-12 Q -12,-7 -8,-4 Q -5,-2 0,-2 Q 5,-2 8,-4 Q 12,-7 12,-12 Q 10,-22 8,-30 Z" fill="white" />
                <path d="M -10,-15 Q -14,-5 -15,5 Q -13,10 -9,13 Q -6,15 -1,15 Q 4,15 7,13 Q 11,10 11,5 Q 9,-5 10,-15 Z" fill="white" />
                <path d="M -12,0 Q -15,12 -16,25 Q -14,30 -10,33 Q -7,35 -2,35 Q 3,35 6,33 Q 10,30 10,25 Q 8,12 12,0 Z" fill="white" />
                <path d="M -13,15 Q -16,28 -17,42 Q -15,47 -11,50 Q -8,52 -3,52 Q 2,52 5,50 Q 9,47 9,42 Q 7,28 13,15 Z" fill="white" />
            </g>

            {/* Large white "G" letter */}
            <g transform="translate(250, 300)">
                <path
                    d="M 50,-80 Q 80,-80 100,-60 Q 110,-50 110,-30 L 110,20 Q 110,40 100,50 Q 80,70 50,70 Q 20,70 0,50 Q -10,40 -10,20 L -10,-30 Q -10,-50 0,-60 Q 20,-80 50,-80 Z M 50,-60 Q 30,-60 20,-50 Q 10,-40 10,-30 L 10,20 Q 10,30 20,40 Q 30,50 50,50 L 70,50 L 70,0 L 40,0 L 40,20 L 50,20 L 50,30 Q 40,30 35,25 Q 30,20 30,10 L 30,-30 Q 30,-40 35,-45 Q 40,-50 50,-50 Q 60,-50 65,-45 Q 70,-40 70,-30 L 90,-30 Q 90,-40 85,-45 Q 75,-60 50,-60 Z"
                    fill="white"
                />
            </g>

            {/* Inner golden border */}
            <circle cx="250" cy="250" r="155" fill="none" stroke="#D4A04C" strokeWidth="2" />
        </svg>
    );
}
