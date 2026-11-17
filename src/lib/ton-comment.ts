// Builds a TON text-comment payload (op 0 + UTF-8 text) as a base64 BOC with no dependencies,
// so paying never needs Node's Buffer inside Telegram.
function crc32c(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const b of bytes) {
    crc ^= b;
    for (let k = 0; k < 8; k++) crc = crc & 1 ? (crc >>> 1) ^ 0x82f63b78 : crc >>> 1;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function commentPayload(text: string): string {
  const body = new Uint8Array([0, 0, 0, 0, ...new TextEncoder().encode(text)]);
  if (body.length > 127) throw new Error("comment too long");
  const cell = new Uint8Array([0, body.length * 2, ...body]);
  const head = [0xb5, 0xee, 0x9c, 0x72, 0x41, 0x01, 1, 1, 0, cell.length, 0];
  const boc = new Uint8Array([...head, ...cell]);
  const c = crc32c(boc);
  const out = new Uint8Array([...boc, c & 255, (c >>> 8) & 255, (c >>> 16) & 255, c >>> 24]);
  let s = "";
  for (const b of out) s += String.fromCharCode(b);
  return btoa(s);
}
