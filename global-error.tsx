"use client";

// This only fires if the root layout itself throws, so it can't rely on
// globals.css or any providers — it must render its own <html>/<body>.
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0a0b10",
          color: "#eef0f6",
          textAlign: "center",
          padding: "2rem"
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Inkwell hit a snag</h1>
        <p style={{ color: "#9aa0b4", marginBottom: "1.5rem", maxWidth: 420 }}>
          Something went wrong loading the app. Try reloading the page.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#8b7bff",
            color: "#0a0b10",
            border: "none",
            borderRadius: "999px",
            padding: "0.6rem 1.4rem",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
