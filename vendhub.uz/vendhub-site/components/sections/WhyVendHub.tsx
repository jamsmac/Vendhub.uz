import Card from '@/components/ui/Card'
import SectionHeader from '@/components/ui/SectionHeader'

const REASONS = [
  {
    emoji: '\u2615',
    title: '25+ напитков',
    description:
      'Эспрессо, латте, капучино, матча и холодные напитки',
    accent: 'bg-amber-100',
  },
  {
    emoji: '\uD83D\uDCCD',
    title: '16 автоматов',
    description:
      'Больницы, университеты, госучреждения, маркеты, ЖК',
    accent: 'bg-blue-100',
  },
  {
    emoji: '\uD83C\uDF81',
    title: 'Программа лояльности',
    description:
      'Баллы, скидки до 10% и эксклюзивные бонусы',
    accent: 'bg-purple-100',
  },
  {
    emoji: '\u26A1',
    title: 'Быстрый заказ',
    description:
      'Закажите заранее через Telegram Mini App',
    accent: 'bg-yellow-100',
  },
]

export default function WhyVendHub() {
  return (
    <section className="mt-16 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Почему VendHub?" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason) => (
            <Card key={reason.title} hover className="p-6">
              <div
                className={`w-12 h-12 rounded-xl ${reason.accent} flex items-center justify-center text-2xl`}
              >
                {reason.emoji}
              </div>
              <h3 className="font-bold text-chocolate mt-4">{reason.title}</h3>
              <p className="text-sm text-chocolate/60 mt-2">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
