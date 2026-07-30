import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import sharp from "sharp"

/**
 * Shared Open Graph card template — the approved house style:
 *
 *   Layer 1   before/after photos split 50/50 with a 20% cross-fade band
 *             (pre-composed in raw pixels — Satori has no masks)
 *   Layer 1.5 white diagonal lift (135°) so the photos read bright
 *   Layer 2   "The Gradient" — the site's lavender/blue/pink mesh, bottom-
 *             anchored and semi-transparent
 *   Layer 2.5 white pool in the lower-right so the logo sits on clean white
 *   Layer 3   purple eyebrow badge / dark ink headline / white pill, and the
 *             logo unboxed bottom-right
 *
 * Only ever imported from opengraph-image.tsx route files (server, build
 * time) — it reads assets straight from public/ with node:fs.
 */

export const OG_SIZE = { width: 1200, height: 630 }

/**
 * Satori only emits PNG, which is ~1MB for photo-heavy cards — over
 * WhatsApp's 600KB og:image cap (it silently drops the preview). The template
 * therefore re-encodes to JPEG; route files must export this content type.
 */
export const OG_CONTENT_TYPE = "image/jpeg"

const W = 1200
const H = 630
// Left image spans 0–60%, right spans 40–100% → 20% cross-fade band.
const IMG_W = 720
const FADE_W = 240
const RIGHT_X = 480

// The Gradient — sampled from the live homepage mesh (saturation-boosted so
// it survives sitting over photography).
const LAVENDER = "224,196,255"
const VIOLET = "228,219,252"
const BLUE = "198,220,255"
const PINK = "247,205,232"
const INK = "#322b4d" // site heading tone
const PRIMARY = "#5b3fd6"

interface Crop {
  left: number
  top: number
  width: number
  height: number
}

type PhotoRef = [file: string, crop: Crop]

export interface OgPair {
  before: PhotoRef
  after: PhotoRef
}

/**
 * Before/after pairs clean enough to feature (crops dodge the baked-in
 * "Before"/"After" labels in the kitchen sources).
 */
export const OG_PAIRS = {
  kitchen: {
    before: [
      "images/gallery/1000012293.jpeg",
      { left: 420, top: 520, width: 980, height: 684 },
    ],
    after: [
      "images/gallery/1000012297.jpeg",
      { left: 560, top: 180, width: 1000, height: 875 },
    ],
  },
  ovenGlass: {
    before: [
      "images/gallery/1000014096.jpeg",
      { left: 50, top: 300, width: 1100, height: 960 },
    ],
    after: [
      "images/gallery/1000014102.jpeg",
      { left: 50, top: 300, width: 1100, height: 960 },
    ],
  },
  shower: {
    before: [
      "images/gallery/1000013374.jpeg",
      { left: 50, top: 250, width: 1100, height: 960 },
    ],
    after: [
      "images/gallery/1000013387.jpeg",
      { left: 50, top: 120, width: 1100, height: 960 },
    ],
  },
  void: {
    before: [
      "images/gallery/1000016441.jpeg",
      { left: 50, top: 300, width: 1100, height: 960 },
    ],
    after: [
      "images/gallery/1000016442.jpeg",
      { left: 50, top: 300, width: 1100, height: 960 },
    ],
  },
  /**
   * NB: the microwave pair was tried and dropped — its white-cavity closeups
   * disappear entirely under the white lift layer.
   */
} satisfies Record<string, OgPair>

/** Rotation for the town pages (index % length). */
export const OG_TOWN_PAIRS: OgPair[] = [
  OG_PAIRS.kitchen,
  OG_PAIRS.ovenGlass,
  OG_PAIRS.shower,
  OG_PAIRS.void,
]

async function loadCover(ref: PhotoRef, w: number, h: number): Promise<Buffer> {
  const buf = await readFile(join(process.cwd(), "public", ref[0]))
  return sharp(buf).extract(ref[1]).resize(w, h, { fit: "cover" }).toBuffer()
}

/**
 * Pre-compose the cross-faded before/after background in raw pixels: left
 * image owns 0–40%, right owns 60–100%, the middle 20% linearly blends.
 */
async function crossfadeBackground(pair: OgPair): Promise<string> {
  const [leftBuf, rightBuf] = await Promise.all([
    loadCover(pair.before, IMG_W, H),
    loadCover(pair.after, IMG_W, H),
  ])
  const [leftRaw, rightRaw] = await Promise.all([
    sharp(leftBuf).removeAlpha().raw().toBuffer(),
    sharp(rightBuf).removeAlpha().raw().toBuffer(),
  ])

  const out = Buffer.alloc(W * H * 3)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const o = (y * W + x) * 3
      if (x < RIGHT_X) {
        const i = (y * IMG_W + x) * 3
        out[o] = leftRaw[i]
        out[o + 1] = leftRaw[i + 1]
        out[o + 2] = leftRaw[i + 2]
      } else if (x >= IMG_W) {
        const i = (y * IMG_W + (x - RIGHT_X)) * 3
        out[o] = rightRaw[i]
        out[o + 1] = rightRaw[i + 1]
        out[o + 2] = rightRaw[i + 2]
      } else {
        const t = (x - RIGHT_X) / FADE_W
        const li = (y * IMG_W + x) * 3
        const ri = (y * IMG_W + (x - RIGHT_X)) * 3
        out[o] = Math.round(leftRaw[li] * (1 - t) + rightRaw[ri] * t)
        out[o + 1] = Math.round(leftRaw[li + 1] * (1 - t) + rightRaw[ri + 1] * t)
        out[o + 2] = Math.round(leftRaw[li + 2] * (1 - t) + rightRaw[ri + 2] * t)
      }
    }
  }

  const composite = await sharp(out, {
    raw: { width: W, height: H, channels: 3 },
  })
    .jpeg({ quality: 88 })
    .toBuffer()

  return `data:image/jpeg;base64,${composite.toString("base64")}`
}

/** Display fonts (OFL) — committed locally so builds stay offline. */
function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts")
  return Promise.all([
    readFile(join(dir, "PlusJakartaSans-ExtraBold.ttf")),
    readFile(join(dir, "PlusJakartaSans-SemiBold.ttf")),
  ])
}

async function logoDataUri(): Promise<string> {
  const buf = await readFile(
    join(process.cwd(), "public", "logo-transparent.png")
  )
  return `data:image/png;base64,${buf.toString("base64")}`
}

function titleSize(title: string): number {
  if (title.length > 26) return 62
  if (title.length > 14) return 68
  if (title.length > 10) return 78
  return 92
}

export interface BrandOgOptions {
  /** Uppercase badge line, e.g. "House cleaning · Nottinghamshire". */
  eyebrow: string
  /** The headline, dark ink over The Gradient. */
  title: string
  /** White pill line — keep short so it never wraps. */
  subtitle: string
  /** Which before/after pair backs the card. */
  pair?: OgPair
  /** Explicit headline px when the adaptive size wraps badly. */
  titleSizeOverride?: number
}

/** Render the branded share card. */
export async function brandOgImage({
  eyebrow,
  title,
  subtitle,
  pair = OG_PAIRS.kitchen,
  titleSizeOverride,
}: BrandOgOptions) {
  const [bg, logo, [extraBold, semiBold]] = await Promise.all([
    crossfadeBackground(pair),
    logoDataUri(),
    loadFonts(),
  ])

  const png = await new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Layer 1: cross-faded before/after */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          alt=""
          width={W}
          height={H}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${W}px`,
            height: `${H}px`,
          }}
        />

        {/* Layer 1.5: white diagonal lift */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.6) 32%, rgba(255,255,255,0.28) 62%, rgba(255,255,255,0.3) 100%)",
            display: "flex",
          }}
        />

        {/* Layer 2: The Gradient — bottom-anchored, semi-transparent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage: `linear-gradient(to top, rgba(${VIOLET},1) 0%, rgba(${VIOLET},0.94) 30%, rgba(${VIOLET},0.6) 55%, rgba(${VIOLET},0) 80%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage: `radial-gradient(circle at 12% 96%, rgba(${LAVENDER},0.95), transparent 55%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage: `radial-gradient(circle at 88% 92%, rgba(${BLUE},0.9), transparent 50%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage: `radial-gradient(circle at 55% 108%, rgba(${PINK},0.75), transparent 45%)`,
            display: "flex",
          }}
        />

        {/* Layer 2.5: white pool so the logo sits on clean white */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            backgroundImage:
              "radial-gradient(circle at 90% 84%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 26%, rgba(255,255,255,0) 60%)",
            display: "flex",
          }}
        />

        {/* Layer 3a: logo, unboxed on the white pool */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={340}
          height={168}
          style={{
            position: "absolute",
            right: "52px",
            bottom: "48px",
            width: "340px",
            height: "168px",
            objectFit: "contain",
          }}
        />

        {/* Layer 3b: text lockup */}
        <div
          style={{
            position: "absolute",
            left: "64px",
            bottom: "52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: PRIMARY,
              borderRadius: "9999px",
              padding: "12px 24px 13px",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "24px",
              lineHeight: 1,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(91,63,214,0.35)",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "700px",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: `${titleSizeOverride ?? titleSize(title)}px`,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.72)",
              borderRadius: "9999px",
              padding: "14px 26px 16px",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 600,
              fontSize: "29px",
              lineHeight: 1,
              color: INK,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: extraBold,
          weight: 800,
          style: "normal",
        },
        {
          name: "Plus Jakarta Sans",
          data: semiBold,
          weight: 600,
          style: "normal",
        },
      ],
    }
  ).arrayBuffer()

  const jpeg = await sharp(Buffer.from(png))
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer()

  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": OG_CONTENT_TYPE },
  })
}
