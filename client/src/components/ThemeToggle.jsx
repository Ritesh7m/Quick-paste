import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem("theme", theme)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === "theme" && ["light", "dark"].includes(event.newValue)) {
        setTheme(event.newValue)
      }
    }
    window.addEventListener("storage", syncTheme)
    return () => window.removeEventListener("storage", syncTheme)
  }, [])

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-control bg-surface text-primary hover:bg-raised transition-colors"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />}
      </svg>
    </button>
  )
}

export default ThemeToggle
