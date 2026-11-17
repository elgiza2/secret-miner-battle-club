// Every picture the ZRO app uses, in one place.
import bolt from "@/assets/zro/bolt.png";
import cart from "@/assets/zro/cart.png";
import dice from "@/assets/zro/dice.png";
import energyBox from "@/assets/zro/energy-box.png";
import gamepad from "@/assets/zro/gamepad.png";
import gift from "@/assets/zro/gift.png";
import gramCoin from "@/assets/zro/gram-coin.png";
import pawn from "@/assets/zro/pawn.png";
import prvCoin from "@/assets/zro/prv-coin.png";
import season from "@/assets/zro/season.png";
import spinWheel from "@/assets/zro/spin.png";
import tonCoin from "@/assets/zro/ton-coin.png";
import xp from "@/assets/zro/xp.png";
import zroCoin from "@/assets/zro/zro-coin.png";
import type { TileKind } from "@/lib/zro-board";

export const ENERGY_ICON = bolt;
export const ZRO_ICON = zroCoin;
export const GRAM_ICON = gramCoin;
export const PRV_ICON = prvCoin;
export const TON_ICON = tonCoin;
export const DICE = dice;
export const PAWN = pawn;
export const GIFT = gift;
export const SEASON_ICON = season;
export const GAMEPAD = gamepad;
export const CART = cart;

/** Icon standing on each tile type. `lift` nudges the icon's base relative to the tile centre. */
export const TILE_ICONS: Record<TileKind, { src: string; alt: string; size: number; lift: number } | null> = {
  plain: null,
  bolt: { src: bolt, alt: "طاقة", size: 36, lift: 3 },
  zro: { src: zroCoin, alt: "ZRO", size: 36, lift: 4 },
  xp: { src: xp, alt: "XP", size: 42, lift: 10 },
  box: { src: energyBox, alt: "صندوق طاقة", size: 42, lift: 4 },
  gram: { src: gramCoin, alt: "GRAM", size: 36, lift: 4 },
  prv: { src: prvCoin, alt: "PRV", size: 36, lift: 4 },
  ton: { src: tonCoin, alt: "TON", size: 36, lift: 4 },
  spin: { src: spinWheel, alt: "سبين", size: 40, lift: 6 },
};

export const NAV_ITEMS = [
  { to: "/rewards", label: "المكافآت", icon: gift },
  { to: "/season", label: "الموسم", icon: season },
  { to: "/", label: "اللوحة", icon: dice },
  { to: "/games", label: "ألعاب", icon: gamepad },
  { to: "/store", label: "المتجر", icon: cart },
] as const;
