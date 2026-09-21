export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-navy-900"
      role="contentinfo"
      aria-label="تذييل الصفحة"
    >
      <div className="wrap border-t border-white/[0.07] pt-2.5 pb-3.5 sm:pt-3 sm:pb-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="text-center sm:text-right">
              <p className="text-sm font-[700] leading-tight text-white/75">
                منصة الدكتور عيسى صبري المتولي
              </p>

              <p className="mt-0.5 text-xs font-[500] leading-tight text-brand/65">
                ونادي المبرمجين
              </p>
            </div>

            <p className="text-xs font-[600] text-white/40">
              لطلاب البكالوريا (عربي - لغات)
            </p>
          </div>

          <div className="border-t border-white/[0.05] pt-2">
            <p className="text-[11px] font-[500] text-white/25">
              © {year} جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}