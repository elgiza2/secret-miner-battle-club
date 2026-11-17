<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- The browser Supabase client reads its URL/key only from src/lib/supabase-config.ts (pinned, not VITE_* env), because this project's injected env points at a different, empty backend.
- ZRO game rules (energy, roll cost, regen, tile rewards, path layout) live only in src/lib/zro-board.ts as pure functions with tests, so UI and a future server can share them.
- All ZRO images are imported through src/lib/zro-assets.ts so pages never reference image files directly.
- Board tiles are CSS-transformed squares (rotateX/rotateZ) drawn by the `tile*` utilities in styles.css; z-order is by tile index so nearer tiles overlap farther ones.
- TON wallet connect is loaded lazily via src/hooks/use-ton-wallet.ts (browser-only lib); games come from the public GameMonetize feed fetched client-side.
