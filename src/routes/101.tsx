import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { act, initData } from "@/hooks/use-zro";
import { toast } from "@/lib/notify";
import { adminDeleteTask, adminMe, adminSaveTask, adminSetTaskAdmin, adminStats, adminTasks } from "@/lib/zro-admin.functions";

export const Route = createFileRoute("/101")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "ZRO" }, { name: "robots", content: "noindex" }] }),
});

type Task = { id?: string; title: string; url: string; chat_id: string | null; reward_energy: number; active: boolean; expires_at?: string | null };
const EMPTY: Task = { title: "", url: "", chat_id: "", reward_energy: 10, active: true };

function AdminPage() {
  const me = useQuery({ queryKey: ["zro-admin-me"], queryFn: () => adminMe({ data: { initData: initData() } }) });
  if (me.isLoading) return <ZroPage><p className="text-center text-sm text-muted-foreground">…</p></ZroPage>;
  if (!me.data?.role) return <ZroPage><p className="text-center text-sm text-muted-foreground">الصفحة دي مش موجودة.</p></ZroPage>;
  return (
    <ZroPage>
      {me.data.role === "owner" && <Stats />}
      <Tasks />
    </ZroPage>
  );
}

function Stats() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["zro-admin-stats"], queryFn: () => adminStats({ data: { initData: initData() } }), refetchInterval: 30_000 });
  const [name, setName] = useState("");
  const d = q.data;
  const setAdmin = async (username: string, remove = false) => {
    const r = await act(() => adminSetTaskAdmin({ data: { initData: initData(), username, remove } }));
    if (r) { setName(""); qc.invalidateQueries({ queryKey: ["zro-admin-stats"] }); toast.success("تم"); }
  };
  const box = (label: string, value: string | number) => (
    <div className="surface rounded-[20px] p-3"><p className="text-xs text-muted-foreground">{label}</p><p dir="ltr" className="text-start font-display text-xl font-extrabold">{value}</p></div>
  );
  return (
    <>
      <Section title="الإحصائيات">
        <div className="grid grid-cols-2 gap-3">
          {box("المستخدمين", d?.users ?? "…")}{box("جداد آخر 24 ساعة", d?.users24 ?? "…")}
          {box("موثقين", d?.verified ?? "…")}{box("بريميوم", d?.premium ?? "…")}
          {box("المدفوعات", d?.payments ?? "…")}{box("طلبات السحب", d?.withdrawals ?? "…")}
          {box("GRAM اتدفع", d ? d.gram.toFixed(2) : "…")}{box("GRAM آخر 24 ساعة", d ? d.gram24.toFixed(2) : "…")}
        </div>
      </Section>
      <Section title="آخر المدفوعات">
        <div className="surface flex flex-col divide-y divide-border rounded-[20px] px-3">
          {(d?.recent ?? []).map((p: any) => (
            <div key={p.memo} dir="ltr" className="flex items-center justify-between py-2 text-xs">
              <span>{p.kind}{p.ref ? `·${p.ref}` : ""} · {p.tg_id}</span><b>{Number(p.amount)} GRAM</b>
            </div>
          ))}
          {d && d.recent.length === 0 && <p className="py-3 text-center text-xs text-muted-foreground">مفيش مدفوعات لسه</p>}
        </div>
      </Section>
      <Section title="أدمن المهام">
        <div className="surface flex flex-col gap-2 rounded-[20px] p-3">
          <div className="flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} dir="ltr" placeholder="@username" className="min-w-0 flex-1 rounded-2xl bg-muted px-3 py-2 text-sm outline-none" />
            <button type="button" onClick={() => name && setAdmin(name)} className="btn-glossy btn-invite pressable rounded-full px-4 font-display text-sm font-bold">أضف</button>
          </div>
          {(d?.admins ?? []).map((a: any) => (
            <div key={a.tg_id} className="flex items-center justify-between text-sm">
              <span dir="ltr">@{a.username ?? a.tg_id}</span>
              <button type="button" aria-label="شيل" onClick={() => setAdmin(a.username ?? "", true)} className="pressable text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Tasks() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["zro-admin-tasks"], queryFn: () => adminTasks({ data: { initData: initData() } }) });
  const [edit, setEdit] = useState<Task | null>(null);
  const refresh = () => { qc.invalidateQueries({ queryKey: ["zro-admin-tasks"] }); qc.invalidateQueries({ queryKey: ["zro-tasks"] }); };
  const save = async () => {
    if (!edit) return;
    const r = await act(() => adminSaveTask({ data: { initData: initData(), task: edit } }));
    if (r) { setEdit(null); refresh(); toast.success("اتحفظت"); }
  };
  const del = async (id: string) => {
    if (!confirm("تمسح المهمة؟")) return;
    const r = await act(() => adminDeleteTask({ data: { initData: initData(), id } }));
    if (r) { refresh(); toast.success("اتمسحت"); }
  };
  const field = "rounded-2xl bg-muted px-3 py-2 text-sm outline-none";
  return (
    <Section title="المهام">
      {edit ? (
        <div className="surface flex flex-col gap-2 rounded-[20px] p-3">
          <input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} placeholder="اسم المهمة" className={field} />
          <input value={edit.url} onChange={(e) => setEdit({ ...edit, url: e.target.value })} dir="ltr" placeholder="https://t.me/..." className={field} />
          <input value={edit.chat_id ?? ""} onChange={(e) => setEdit({ ...edit, chat_id: e.target.value })} dir="ltr" placeholder="@channel (للتحقق من الانضمام)" className={field} />
          <label className="flex items-center gap-2 text-sm">طاقة
            <input type="number" value={edit.reward_energy} onChange={(e) => setEdit({ ...edit, reward_energy: Number(e.target.value) })} dir="ltr" className={`${field} w-24`} />
          </label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={edit.active} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} /> ظاهرة</label>
          <div className="flex gap-2">
            <button type="button" onClick={save} className="btn-glossy btn-success pressable flex-1 rounded-full py-2 font-display text-sm font-bold">احفظ</button>
            <button type="button" onClick={() => setEdit(null)} className="surface pressable flex-1 rounded-full py-2 font-display text-sm font-bold">إلغاء</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setEdit({ ...EMPTY })} className="btn-glossy btn-invite pressable w-full rounded-full py-2.5 font-display text-sm font-bold">مهمة جديدة</button>
      )}
      <div className="surface mt-3 flex flex-col divide-y divide-border rounded-[20px] px-3">
        {(q.data ?? []).map((t: any) => (
          <div key={t.id} className="flex items-center gap-2 py-2.5">
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-bold ${t.active ? "" : "opacity-50"}`}>{t.title}</p>
              <p dir="ltr" className="truncate text-start text-[11px] text-muted-foreground">{t.url} · ⚡{t.reward_energy}</p>
            </div>
            <button type="button" aria-label="تعديل" onClick={() => setEdit({ ...t })} className="pressable p-1"><Pencil className="h-4 w-4" /></button>
            <button type="button" aria-label="مسح" onClick={() => del(t.id)} className="pressable p-1 text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </Section>
  );
}
