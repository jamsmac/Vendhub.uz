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

export default function Home() {
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
        <PartnerSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
