# Image Assets — د. عيسى صبري Landing Page

Each folder holds the visual for one learning system.
The current files are SVG illustrations that work as production placeholders.

## To replace with real photos

1. Add your image to the correct folder using the same filename (or update `imageSrc` in `src/data/systems.ts`)
2. Preferred format: **WebP** (best size/quality tradeoff)
3. Recommended dimensions: **1200 × 900 px** (4:3 ratio)
4. Target file size: **< 200 KB** per image (use squoosh.app or similar)

---

### Folders

| Folder | System | Visual direction |
|---|---|---|
| `center/` | الحضور في السنتر | Classroom, teacher at whiteboard, students interacting |
| `online/` | Online Live | Student at home on laptop in a video session |
| `books/` | كتب شيخ البرمجة | The 3-book bundle on a desk, study materials |
| `platform/` | نادي المبرمجين | Laptop open to a learning platform with assignments and progress |

### Current placeholder files

- `center/classroom-session.svg`
- `online/home-live-session.svg`
- `books/programming-books-bundle.svg`
- `platform/programmers-club-dashboard.svg`

### How the component handles images

`SystemVisual.tsx` uses a React `useState` + `onError` pattern:
- Renders `<img src={sys.imageSrc} ...>` first
- If the file fails to load, switches to an inline SVG fallback
- So you can add real images incrementally — each folder is independent
