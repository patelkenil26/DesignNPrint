interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/** Renders schema.org structured data. Server component — no client JS. */
export default function JsonLd({ data }: JsonLdProps) {
  // "<" is escaped so content can never close the script tag early
  const json = JSON.stringify(data).replace(/</g, '\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
