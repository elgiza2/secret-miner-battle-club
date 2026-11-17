// Every picture the ZRO app uses, in one place.
import bolt from "@/assets/zro/bolt.png";
import cart from "@/assets/zro/cart.png";
import cloud from "@/assets/zro/cloud.png";
import dice from "@/assets/zro/dice.png";
import energyBox from "@/assets/zro/energy-box.png";
import fighter from "@/assets/zro/fighter.png";
import gamepad from "@/assets/zro/gamepad.png";
import gift from "@/assets/zro/gift.png";
import meteor from "@/assets/zro/meteor.png";
import pawn from "@/assets/zro/pawn.png";
import season from "@/assets/zro/season.png";
import stump from "@/assets/zro/stump.png";
import xp from "@/assets/zro/xp.png";
import zroCoin from "@/assets/zro/zro-coin.png";
import type { TileKind } from "@/lib/zro-board";

export const ENERGY_ICON = bolt;
export const ZRO_ICON = zroCoin;
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
};

export const NAV_ITEMS = [
  { to: "/rewards", label: "المكافآت", icon: gift },
  { to: "/season", label: "الموسم", icon: season },
  { to: "/", label: "اللوحة", icon: dice },
  { to: "/games", label: "ألعاب", icon: gamepad },
  { to: "/store", label: "المتجر", icon: cart },
] as const;

/** Floating scenery beside the path; `at` is the tile index within each 24-tile block. */
export const DECOR = [
  { src: stump, at: 3, side: "left", inset: 22, size: 64 },
  { src: fighter, at: 7, side: "right", inset: 14, size: 68 },
  { src: meteor, at: 14, side: "left", inset: 12, size: 72 },
  { src: cloud, at: 20, side: "right", inset: 10, size: 72 },
] as const;
