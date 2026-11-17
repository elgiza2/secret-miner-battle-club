// Hand-picked open-source HTML5 games that run without ads, grouped by category.
export type Game = { id: string; title: string; url: string; cat: GameCat; color: string; emoji: string };
export type GameCat = "puzzle" | "arcade" | "action" | "racing";
export const GAME_CATS: { key: GameCat | ""; label: string }[] = [
  { key: "", label: "الكل" }, { key: "puzzle", label: "ألغاز" }, { key: "arcade", label: "آركيد" },
  { key: "action", label: "أكشن" }, { key: "racing", label: "سباق" },
];
export const GAMES: Game[] = [
  { id: "2048", title: "2048", url: "https://play2048.co/", cat: "puzzle", color: "#edc22e", emoji: "🔢" },
  { id: "hextris", title: "Hextris", url: "https://hextris.github.io/hextris/", cat: "puzzle", color: "#e74c3c", emoji: "⬡" },
  { id: "astray", title: "Astray", url: "https://wwwtyro.github.io/Astray/", cat: "puzzle", color: "#2e86de", emoji: "🌀" },
  { id: "clumsy", title: "Clumsy Bird", url: "https://ellisonleao.github.io/clumsy-bird/", cat: "arcade", color: "#54a0ff", emoji: "🐦" },
  { id: "pacman", title: "Pac-Man", url: "https://pacman.platzh1rsch.ch/", cat: "arcade", color: "#feca57", emoji: "👾" },
  { id: "tetris", title: "Tetris", url: "https://chvin.github.io/react-tetris/", cat: "arcade", color: "#5f27cd", emoji: "🧱" },
  { id: "snake", title: "Snake", url: "https://patorjk.com/games/snake/", cat: "arcade", color: "#1dd1a1", emoji: "🐍" },
  { id: "breakout", title: "Breakout", url: "https://end3r.github.io/Gamedev-Canvas-workshop/lesson10.html", cat: "arcade", color: "#ff6b6b", emoji: "🧱" },
  { id: "tower", title: "Tower Blocks", url: "https://www.lessmilk.com/tower-game/", cat: "arcade", color: "#ff9f43", emoji: "🏗️" },
  { id: "spacehuggers", title: "Space Huggers", url: "https://killedbyapixel.github.io/SpaceHuggers/", cat: "action", color: "#341f97", emoji: "🚀" },
  { id: "underrun", title: "Underrun", url: "https://phoboslab.org/underrun/", cat: "action", color: "#222f3e", emoji: "🔫" },
  { id: "racer", title: "JS Racer", url: "https://codeincomplete.com/games/racer/v4-final/", cat: "racing", color: "#ee5253", emoji: "🏎️" },
  { id: "hexgl", title: "HexGL", url: "https://hexgl.bkcore.com/play/", cat: "racing", color: "#0abde3", emoji: "🛸" },
];
