import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const Y = "#FFB020"
const FONT = "Inter, -apple-system, sans-serif"
const BEATS = [
    ["🍕 Zomato at 1am.", "−₹349"],
    ["🎉 “Just one party.”", "−₹2,400"],
    ["☕ Coffee. Again.", "−₹180"],
]
const FLY = [
    ["−₹349", "6%", "62%", 5.5],
    ["−₹2,400", "86%", "58%", 6.5],
    ["−₹180", "4%", "36%", 4.8],
    ["−₹999", "80%", "36%", 5.2],
    ["−₹60", "10%", "16%", 6],
    ["−₹1,250", "84%", "14%", 5.8],
]
const COLS = 6
const ROWS = 3

function rnd(i: number) {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
}

const shards: any[] = []
for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
        const x0 = (c / COLS) * 100, x1 = ((c + 1) / COLS) * 100
        const y0 = (r / ROWS) * 100, y1 = ((r + 1) / ROWS) * 100
        const tris = [
            [[x0, y0], [x1, y0], [x0, y1]],
            [[x1, y0], [x1, y1], [x0, y1]],
        ]
        tris.forEach((t, k) => {
            const i = shards.length
            const cx = (t[0][0] + t[1][0] + t[2][0]) / 300
            const cy = (t[0][1] + t[1][1] + t[2][1]) / 300
            shards.push({
                clip: "polygon(" + t.map((p) => p[0] + "% " + p[1] + "%").join(",") + ")",
                x: (cx - 0.5) * 1100 + (rnd(i) - 0.5) * 260,
                y: (cy - 0.5) * 500 + 240 + rnd(i + 50) * 260,
                rotate: (rnd(i + 99) - 0.5) * 160,
                delay: rnd(i + 7) * 0.12,
            })
        })
    }
}

const stopStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 800,
    fontSize: "min(30vw, 360px)",
    letterSpacing: "-0.05em",
    lineHeight: 1,
    color: Y,
    whiteSpace: "nowrap",
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function IntroSequence() {
    const [stage, setStage] = React.useState(0)
    React.useEffect(() => {
        const t = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 5200),
            setTimeout(() => setStage(3), 5600),
            setTimeout(() => setStage(4), 7200),
            setTimeout(() => setStage(5), 8000),
        ]
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>
            <AnimatePresence>
                {stage === 1 && (
                    <motion.div key="beats" exit={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }} transition={{ duration: 0.4 }}
                        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                        {FLY.map((f, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: [0, 0.9, 0], y: -150 }}
                                transition={{ duration: f[3] as number, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                                style={{ position: "absolute", left: f[1] as string, top: f[2] as string, padding: "8px 14px", borderRadius: 100, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 600 }}>
                                {f[0]}
                            </motion.div>
                        ))}
                        {BEATS.map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.1 + i * 1.1 }}
                                style={{ display: "flex", gap: 18, fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", zIndex: 1 }}>
                                <span>{b[0]}</span><span style={{ color: "#FF5A5F", fontWeight: 700 }}>{b[1]}</span>
                            </motion.div>
                        ))}
                        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 3.5 }}
                            style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontStyle: "italic", color: "rgba(255,255,255,0.6)", marginTop: 8, textAlign: "center", padding: "0 24px" }}>
                            Month end. “Where did my money go?”
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {stage >= 3 && stage < 5 && (
                <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    style={{ position: "relative" }}>
                    <div style={{ ...stopStyle, visibility: "hidden" }}>STOP.</div>
                    {shards.map((s, i) => (
                        <motion.div key={i}
                            animate={stage >= 4 ? { x: s.x, y: s.y, rotate: s.rotate, opacity: 0, scale: 0.6 } : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                            transition={stage >= 4 ? { duration: 0.85, delay: s.delay, ease: [0.2, 0.7, 0.3, 1] } : { duration: 0 }}
                            style={{ position: "absolute", inset: 0, clipPath: s.clip, WebkitClipPath: s.clip }}>
                            <div style={stopStyle}>STOP.</div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <AnimatePresence>
                {stage === 4 && (
                    <motion.div key="sol" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        style={{ position: "absolute", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "#fff" }}>
                        We have a solution.
                    </motion.div>
                )}
            </AnimatePresence>

            {stage >= 5 && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
                    <div style={{ width: "min(80vw, 560px)", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <svg viewBox="40 50 535 165" style={{ width: "100%", overflow: "visible", marginBottom: 4 }}>
                            <g fill="none" stroke="#fff" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
                                {[
                                    "M50 200 V145 A35 35 0 0 1 120 145 V200 M120 145 A35 35 0 0 1 190 145 V200",
                                    "M315 110 V200",
                                    "M562 128 C548 106 498 106 498 138 C498 166 562 150 562 180 C562 210 510 210 494 188",
                                ].map((d, i) => (
                                    <motion.path key={i} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: i * 0.15, ease: "easeInOut" }} />
                                ))}
                                <motion.circle cx={270} cy={155} r={45} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.1, ease: "easeInOut" }} />
                                <motion.circle cx={400} cy={155} r={45} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.25, ease: "easeInOut" }} />
                            </g>
                            <motion.path d="M445 60 V200" fill="none" stroke={Y} strokeWidth={15} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }} />
                        </svg>
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3 }}
                            style={{ fontSize: "clamp(20px, 2.4vw, 26px)", fontWeight: 500, color: Y }}>
                            Your finance pal.
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    )
}
