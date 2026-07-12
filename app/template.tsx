/**
 * Remounts on every navigation so outgoing and incoming trees both exist
 * long enough for next-view-transitions to snapshot named shared elements.
 *
 * Intentionally NO view-transition-name here — a full-page named container
 * becomes a giant cross-fade and hides geometry morphs on nested names
 * (sidebar, title, steps). Unnamed content fades via ::view-transition-*(root).
 */
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
