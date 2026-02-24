import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import QuickActions from '@/components/sections/QuickActions'
import PopularProducts from '@/components/sections/PopularProducts'
import PromoBanner from '@/components/sections/PromoBanner'
import WhyVendHub from '@/components/sections/WhyVendHub'
import MachinesSection from '@/components/sections/MachinesSection'
import MenuSection from '@/components/sections/MenuSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import LoyaltyTab from '@/components/benefits/LoyaltyTab'
import PartnerSection from '@/components/sections/PartnerSection'
import AboutSection from '@/components/sections/AboutSection'
import { supabase } from '@/lib/supabase'
import { partners as fallbackPartners } from '@/lib/data'
import type { Partner } from '@/lib/types'

export default async function Home() {
  const [cmsResult, partnersResult] = await Promise.all([
    supabase.from('site_content').select('key, value').eq('section', 'partnership'),
    supabase.from('partners').select('*').order('sort_order', { ascending: true }),
  ])

  const partnerCmsData: Record<string, string> = {}
  if (cmsResult.data) {
    for (const item of cmsResult.data) {
      partnerCmsData[item.key] = item.value
    }
  }
  const partnerList = (partnersResult.data?.length ? partnersResult.data : fallbackPartners) as Partner[]
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-cream">
        <HeroSection />
        <StatsSection />
        <QuickActions />
        <PopularProducts />
        <PromoBanner />
        <WhyVendHub />

        <MachinesSection />
        <MenuSection />

        <BenefitsSection loyaltyTab={<LoyaltyTab />} />
        <PartnerSection partners={partnerList} cmsData={partnerCmsData} />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
