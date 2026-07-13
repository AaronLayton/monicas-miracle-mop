/**
 * Renders schema.org JSON-LD as one or more <script type="application/ld+json">
 * tags. Server Component — no "use client".
 *
 * Pass a single schema object or an array of objects. Arrays render one script
 * tag per object (Google recommends separate blocks per top-level entity, though
 * a single @graph array is also valid).
 *
 * Usage:
 *   import { JsonLd } from "@/components/json-ld"
 *   import { localBusinessSchema, webSiteSchema } from "@/lib/seo/schema"
 *   <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
 */

/**
 * Escape a JSON string for safe inline embedding inside a <script> element.
 * Prevents a `</script>` sequence inside string data from prematurely closing
 * the tag, and neutralises HTML-comment / processing-instruction openers.
 */
function serialize(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}

export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  )
}
