"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Zap, Code2, Bug, BarChart3, Check, ArrowLeft, ChevronLeft } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">کدیار</h1>
              <p className="text-xs text-gray-400">ابزار توسعه هوشمند</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              ویژگی‌ها
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              قیمت‌گذاری
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
              سوالات متداول
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              ورود به داشبورد
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="md:hidden flex items-center justify-center h-10 w-10 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.2] lg:leading-[1.25]">
  ابزار هوشمند <span className="text-red-500">توسعه‌دهندگان</span> برای افزایش بهره‌وری
</h1>
            <p className="text-xl text-gray-300 mb-8">
              کدیار، پلتفرم جامع مدیریت قطعه کدها، دیباگ هوشمند و ابزارهای توسعه برای برنامه‌نویسان حرفه‌ای
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full rounded-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white  font-medium transition-colors text-lg"
              >
                شروع رایگان
              </Link>
              <a
                href="#features"
                className="w-full rounded-full sm:w-auto px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white  font-medium transition-colors text-lg"
              >
                بیشتر بدانید
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">ویژگی‌های کلیدی</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              کدیار با ارائه ابزارهای هوشمند و کاربردی، تجربه برنامه‌نویسی شما را متحول می‌کند
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code2,
                title: "مدیریت قطعه کدها",
                description: "ذخیره، دسته‌بندی و جستجوی سریع قطعه کدهای پرکاربرد با قابلیت برچسب‌گذاری",
                color: "bg-red-600",
              },
              {
                icon: Bug,
                title: "دیباگر هوشمند",
                description: "تشخیص و رفع خودکار خطاهای کد با استفاده از هوش مصنوعی پیشرفته",
                color: "bg-purple-600",
              },
              {
                icon: BarChart3,
                title: "تحلیل عملکرد",
                description: "بررسی و بهینه‌سازی عملکرد کد با ابزارهای تحلیلی پیشرفته",
                color: "bg-green-600",
              },
              {
                icon: Zap,
                title: "افزایش بهره‌وری",
                description: "صرفه‌جویی در زمان و افزایش کیفیت کد با ابزارهای خودکارسازی",
                color: "bg-blue-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:shadow-lg"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">رابط کاربری قدرتمند</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              طراحی مدرن و کاربرپسند برای تجربه‌ای لذت‌بخش در استفاده از ابزارهای توسعه
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
          >
            <div className="aspect-[16/9] bg-[#1e1e1e] w-full">
              <div className="w-full h-full bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] p-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400">کدیار - داشبورد</div>
                </div>
                <div className="flex h-[calc(100%-2rem)]">
                  <div className="w-64 border-l border-gray-800 p-2">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded bg-red-600"></div>
                      <div className="flex-1 h-4 bg-gray-800 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 bg-gray-800 rounded flex items-center px-2">
                          <div className="w-4 h-4 rounded bg-gray-700 ml-2"></div>
                          <div className="flex-1 h-3 bg-gray-700 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-2">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-gray-800 rounded p-3">
                          <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-48 bg-gray-800 rounded p-3">
                        <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                        <div className="h-36 bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-48 bg-gray-800 rounded p-3">
                        <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-8 bg-gray-700 rounded flex items-center px-2">
                              <div className="w-4 h-4 rounded bg-gray-600 ml-2"></div>
                              <div className="flex-1 h-3 bg-gray-600 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">قیمت‌گذاری ساده و منعطف</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              پلن‌های متنوع متناسب با نیازهای شما، از توسعه‌دهندگان فردی تا تیم‌های بزرگ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "رایگان",
                price: "۰",
                description: "برای شروع کار و آشنایی با امکانات",
                features: ["ذخیره تا ۵۰ قطعه کد", "دسترسی به ابزارهای پایه", "۱ پروژه فعال", "پشتیبانی از طریق ایمیل"],
                cta: "شروع کنید",
                popular: false,
                color: "border-gray-800 hover:border-gray-700",
                buttonColor: "bg-gray-800 hover:bg-gray-700",
              },
              {
                name: "حرفه‌ای",
                price: "۱۹۹,۰۰۰",
                period: "ماهانه",
                description: "برای توسعه‌دهندگان حرفه‌ای",
                features: [
                  "ذخیره نامحدود قطعه کد",
                  "دسترسی به تمام ابزارها",
                  "۱۰ پروژه فعال",
                  "دیباگر هوشمند پیشرفته",
                  "پشتیبانی اولویت‌دار",
                ],
                cta: "انتخاب پلن حرفه‌ای",
                popular: true,
                color: "border-red-600",
                buttonColor: "bg-red-600 hover:bg-red-700",
              },
              {
                name: "تیمی",
                price: "۴۹۹,۰۰۰",
                period: "ماهانه",
                description: "برای تیم‌های توسعه",
                features: [
                  "همه امکانات پلن حرفه‌ای",
                  "پروژه‌های نامحدود",
                  "همکاری تیمی",
                  "داشبورد مدیریت تیم",
                  "API اختصاصی",
                  "پشتیبانی ۲۴/۷",
                ],
                cta: "انتخاب پلن تیمی",
                popular: false,
                color: "border-gray-800 hover:border-gray-700",
                buttonColor: "bg-gray-800 hover:bg-gray-700",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-[#1e1e1e] border ${plan.color} rounded-xl p-6 relative ${
                  plan.popular ? "shadow-lg shadow-red-900/20 transform md:-translate-y-4" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-0 left-0 mx-auto w-fit px-4 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    پیشنهاد ویژه
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">تومان / {plan.period}</span>}
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-2 ${plan.buttonColor} text-white rounded-md font-medium transition-colors`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">سوالات متداول</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">پاسخ به سوالات رایج شما درباره کدیار</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "آیا می‌توانم کدیار را به صورت رایگان امتحان کنم؟",
                answer:
                  "بله، پلن رایگان کدیار به شما امکان می‌دهد تا با امکانات پایه آشنا شوید و تا ۵۰ قطعه کد را ذخیره کنید. هیچ نیازی به وارد کردن اطلاعات کارت بانکی نیست.",
              },
              {
                question: "آیا می‌توانم بین پلن‌ها جابجا شوم؟",
                answer:
                  "بله، شما می‌توانید در هر زمان پلن خود را ارتقا دهید یا به پلن پایین‌تر تغییر دهید. تغییرات در صورتحساب بعدی شما اعمال خواهد شد.",
              },
              {
                question: "آیا کدیار از زبان‌های برنامه‌نویسی خاصی پشتیبانی می‌کند؟",
                answer:
                  "کدیار از بیش از ۵۰ زبان برنامه‌نویسی محبوب از جمله JavaScript، Python، Java، C++، TypeScript، PHP و بسیاری دیگر پشتیبانی می‌کند.",
              },
              {
                question: "آیا می‌توانم قطعه کدهای خود را به اشتراک بگذارم؟",
                answer:
                  "بله، کدیار به شما امکان می‌دهد قطعه کدهای خود را با سایر کاربران به اشتراک بگذارید یا آنها را به صورت عمومی یا خصوصی منتشر کنید.",
              },
              {
                question: "آیا کدیار از همکاری تیمی پشتیبانی می‌کند؟",
                answer:
                  "بله، در پلن تیمی کدیار، شما می‌توانید اعضای تیم خود را دعوت کنید و به صورت همزمان روی پروژه‌ها و قطعه کدها همکاری کنید.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all"
              >
                <h3 className="text-lg font-medium text-white mb-2">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-900/20 to-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">آماده افزایش بهره‌وری خود هستید؟</h2>
            <p className="text-xl text-gray-300 mb-8">
              همین امروز به کدیار بپیوندید و تجربه برنامه‌نویسی خود را متحول کنید
            </p>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors text-lg inline-flex items-center gap-2"
            >
              شروع رایگان
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">کدیار</h1>
                  <p className="text-xs text-gray-400">ابزار توسعه هوشمند</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">کدیار، همراه هوشمند برنامه‌نویسان برای افزایش بهره‌وری و کیفیت کد</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">محصولات</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    مدیریت قطعه کدها
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    دیباگر هوشمند
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    تحلیل عملکرد
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    همکاری تیمی
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">شرکت</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    درباره ما
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    بلاگ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    مشاغل
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">پشتیبانی</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    مستندات
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    آموزش‌ها
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    سوالات متداول
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    وضعیت سیستم
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} کدیار. تمامی حقوق محفوظ است.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                شرایط استفاده
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                امنیت
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
