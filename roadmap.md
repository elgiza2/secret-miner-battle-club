# Roadmap

- [x] Import project from GitHub (same backend)
- [x] Remove $7,777 prize box + zero reward balances for all users + stop re-granting (DB trigger/functions, bot, UI)
- [x] Redesign Tasks page: clean list, each task with its image
- [x] Bot: /start message + admin panel via /101; add task = name -> link -> image; delete-tasks button
- [x] Bot token secret with SS suffix (TELEGRAM_BOT_TOKEN_SS) so projects don't mix
- [x] Redesign landing/hero per the pasted dark video hero spec
- [x] Deploy on Vercel with provided token and update all links (bot webhook, app URL, TON manifest)
- [x] Daily auto channel post at 03:00 UTC (channel -1002616088306), English, clean image, Open App button, no emojis; scheduled from Supabase pg_cron; send first post now
- [x] Auto notifications to users every 7 hours (Supabase pg_cron -> telegram-bot auto_notify)
- [x] Channel post images must feature the uploaded plush character (file_00000000071c8246b425b04574665609.png), clean bold text, no emojis
- [x] Character images with pink + blue gradient backgrounds for: daily channel posts (3) AND the /start welcome image (telegram_admins.welcome_image_url)
- [x] SUPERSEDES character/pink-blue: all post images + /start image in ASTRONAUT style (purple cosmic, reference IMG_20261004_062717_727.jpg), English bold text, no emojis; host in public bucket ads-tasks (user-images bucket does not exist -> fix uploadTelegramImage + store_image to use ads-tasks)

## Status
- [x] Restore the originally intended animated background; restore Gram icon; show requested Nova coin icon; remove "TON market" label
- [x] Investigate and fix mining not crediting real balances after completion
- [x] Identify referral code owner safely for user-requested test
- [x] Remove "OPEN SOURCE DATA" label; use uploaded purple Gram symbol throughout; refresh bottom navigation symbols
- [x] Restore moving background inside Telegram with local MP4, WebM fallback, and visible poster
- [x] Prize removed (UI, DB, bot); tasks redesigned with images; /101 admin flow + delete-all
- [x] Astronaut images hosted in ads-tasks (p1-p3 + welcome-start); bot uses ads-tasks
- [x] Notifications every ~7h (03:00, 10:00, 17:00 UTC); old broken daily cron removed
- [x] Dark hero landing for browser visitors (inside Telegram the app opens)
- [x] First channel post: blocked, bot must be added as admin of channel -1002616088306
- [x] Vercel deploy done via CLI (nova-app-beryl.vercel.app); animated video bg brighter + mp4 fallback
- [x] Undo browser-only landing; dark video + glass style applied to every page in the app
- [x] New bot token (TELEGRAM_BOT_TOKEN_SS) + webhook set; /start and /101 admin live
- [x] Daily post: new AI astronaut/dark-planet image every day (14 rotating scenes); first post sent (msg 332)

## Imported into new project (Nov 2026)
- [x] Import repo from GitHub, keep same live backend
- [x] Old Groyper app replaced by ZRO app (iOS glass redesign dropped)

## ZRO mining app (new, page by page)
- [x] Board home page (اللوحة): clean 3D tiles path, real icons, character that moves on dice roll, energy + ZRO balance
- [x] Side decoration images removed from the board
- [x] Tile icons tuned: ZRO coin now reads "ZRO", GRAM/PRV/TON added as reward tiles
- [x] Real 3D dice: cube tumbles and stops on the face it rolled
- [x] Spin tile + icon added (its reward is still to be decided)
- [x] Rewards page (المكافآت)
- [x] Season page (الموسم)
- [x] Games page (ألعاب)
- [x] Store page (المتجر)
- [x] Save ZRO progress on a server instead of the device (needs decision)
- [x] Real coin logos, TON merged into GRAM, bigger board, no coin strip, no "Miner"
- [x] Season (5 GRAM pass), rewards, store (GRAM or ads), wallet (0.05 GRAM verify gate) pages — design only
- [x] Wire purchases, verification payment and tasks to the database

## Round 4 (requested)
- [x] Remove PRV everywhere; ZRO micro rewards (0.001..0.05 rare), GRAM max 0.01
- [x] Remove "انضم واربح"; lucky draw redesign, entry 0.05 GRAM
- [x] More premium season rewards; store bundles (coins+spins+energy)
- [x] Remove in-app back buttons; use Telegram BackButton, fullscreen
- [x] Remove dot under avatar; header shows only "ZRO" on every page, no page titles
- [x] Games: replace with ad-free games, categorized; search next to "الكل"
- [x] Wallet order: balance → withdraw/deposit → verify (hidden if verified) → coins; min withdraw 2
- [x] Wheel redesign like GAMEE screenshot
- [x] Real DB with zro_ prefixed tables
- [x] Bot /start message with custom emoji + colored buttons; community id -1004311142881
- [x] Fixed tasks: Mixsaa community + Mixsaa app
- [x] Monetag ads SDK zone 12288175 (show_12288175) on ad buttons
- [x] Inline text notices instead of toasts
- [x] Top safe area for Telegram buttons
- [x] Find ad-free free games source
- [x] Investigate DB issue stopping /start in other bots
- [x] Add games from NEBULA CDN
- [ ] Fix /start not responding
- [ ] Draw: after joining show invite + 'each friend raises your chance'
- [ ] New games source (modern, ad-free) + ad before each game
- [ ] 4 languages (ar/en/ru/fa) app + bot, auto by user language, default en
- [ ] Fix payments across app
- [ ] Admin panel /101 (@eigiza @torker): stats, payment notifications, tasks CRUD, task-only admins
- [ ] 15 days of community posts (image+text), send sample to @eigiza (needs community link + @eigiza must /start bot)
- [ ] Binance ZRO link in wallet
