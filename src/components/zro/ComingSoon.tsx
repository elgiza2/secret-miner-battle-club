export default function ComingSoon({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="pt-tg-safe mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center gap-4 px-6 pb-40 text-center">
      <img src={icon} alt="" className="animate-float-soft h-32 w-32 object-contain" />
      <h1 className="font-display text-3xl font-extrabold">{title}</h1>
      <p className="text-sm text-muted-foreground">الصفحة دي هتتصمم قريباً</p>
    </div>
  );
}
