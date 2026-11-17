// Every picture the ZRO app uses, in one place.
import bolt from "@/assets/zro/bolt.png";
import cart from "@/assets/zro/cart.png";
import dice from "@/assets/zro/dice.png";
import energyBox from "@/assets/zro/energy-box.png";
import gamepad from "@/assets/zro/gamepad.png";
import gift from "@/assets/zro/gift.png";
import gramCoin from "@/assets/zro/gram-coin.png";
import pawn from "@/assets/zro/pawn.png";
import season from "@/assets/zro/season.png";
import spinWheel from "@/assets/zro/spin.png";
import wallet from "@/assets/zro/wallet.png";
import premiumPass from "@/assets/zro/premium-pass.png";
import luckyDraw from "@/assets/zro/lucky-draw.png";
import xp from "@/assets/zro/xp.png";
import zroCoin from "@/assets/zro/zro-coin.png";
import type { TileKind } from "@/lib/zro-board";

export const ENERGY_ICON = bolt;
export const ZRO_ICON = zroCoin;
export const GRAM_ICON = gramCoin;
export const WALLET_ICON = wallet;
export const PREMIUM_PASS = premiumPass;
export const ENERGY_BOX = energyBox;
export const XP_ICON = xp;
export const SPIN_ICON = spinWheel;
export const DICE = dice;
export const PAWN = pawn;
export const GIFT = gift;
export const SEASON_ICON = season;
export const GAMEPAD = gamepad;
export const CART = cart;
export const LUCKY_DRAW = luckyDraw;

/** Icon standing on each tile type. `lift` nudges the icon's base relative to the tile centre. */
export const TILE_ICONS: Record<TileKind, { src: string; alt: string; size: number; lift: number } | null> = {
  plain: null,
  bolt: { src: bolt, alt: "طاقة", size: 32, lift: 3 },
  zro: { src: zroCoin, alt: "ZRO", size: 32, lift: 4 },
  xp: { src: xp, alt: "XP", size: 42, lift: 10 },
  box: { src: energyBox, alt: "صندوق طاقة", size: 42, lift: 4 },
  gram: { src: gramCoin, alt: "GRAM", size: 32, lift: 4 },
  spin: { src: spinWheel, alt: "سبين", size: 40, lift: 6 },
};

export const NAV_ITEMS = [
  { to: "/rewards", label: "المكافآت", icon: gift },
  { to: "/season", label: "الموسم", icon: season },
  { to: "/", label: "اللوحة", icon: dice },
  { to: "/games", label: "ألعاب", icon: gamepad },
  { to: "/wallet", label: "المحفظة", icon: wallet },
] as const;
import drawBg from "@/assets/zro/draw-bg.jpg";
export const DRAW_BG = drawBg;
/** Every app image, so the welcome screen can download and cache them up front. */
export const ALL_IMAGES: string[] = Object.values(import.meta.glob("@/assets/zro/*.{png,jpg}", { eager: true, import: "default" })) as string[];
