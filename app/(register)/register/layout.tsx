import { SiteFooterRegister } from "@/components/site-footer-register"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: "Cadastro",
    template: `%s | 'Cadastro'`,
  },
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex h-screen flex-col justify-center">
      <main className="mt-40 flex grow flex-col sm:mt-2">{children}</main>
      <SiteFooterRegister />
    </div>
  )
}
