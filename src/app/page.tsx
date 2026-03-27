import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Search, Wrench, TrendingUp, Check, Quote, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-phoenix-50 text-phoenix-900 selection:bg-accent-200">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-phoenix-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-accent-700" />
            <span className="text-xl font-bold tracking-tight text-phoenix-900">Phoenix & Co.</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-phoenix-600">
            <Link href="#process" className="hover:text-phoenix-900 transition-colors">Our Process</Link>
            <Link href="#pricing" className="hover:text-phoenix-900 transition-colors">Pricing</Link>
            <Link href="#results" className="hover:text-phoenix-900 transition-colors">Results</Link>
          </nav>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-phoenix-900 rounded-lg hover:bg-phoenix-800 transition-colors shadow-sm"
          >
            Get a Free Audit
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-phoenix-100/50 via-white to-white -z-10" />

          <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 text-sm font-medium text-accent-800">
                  <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
                  Specialists in Local Business Reputation
                </div>
              </div>
              <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-phoenix-900 sm:text-6xl leading-[1.1] text-balance">
                Stop losing customers to bad reviews.
              </h1>
              <p className="mt-6 text-lg leading-8 text-phoenix-600 sm:max-w-md lg:max-w-none text-balance">
                We help local businesses—plumbers, contractors, restaurants, and dentists—clean up their brand image. We repair your online reputation quietly and effectively, so you can focus on running your business without the drama.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="#contact"
                  className="rounded-lg bg-accent-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-accent-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700 transition-all flex items-center gap-2"
                >
                  Fix My Reputation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#process" className="text-base font-medium leading-6 text-phoenix-900 hover:text-phoenix-700 transition-colors">
                  See how we do it <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Hero Visual / Trust Indicator */}
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 rounded-xl bg-phoenix-50/50 mix-blend-multiply blur-2xl filter" />
                <div className="relative rounded-2xl bg-white shadow-xl shadow-phoenix-200/50 ring-1 ring-phoenix-200/50 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-semibold text-phoenix-900 mb-6 font-sans">Platforms We Clean Up</h3>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="flex items-center justify-center">
                      <Image src="/google_logo.png" alt="Google" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/yelp_logo.png" alt="Yelp" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/reddit_logo.png" alt="Reddit" width={120} height={40} className="object-contain h-20 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/glassdoor_logo.svg" alt="Glassdoor" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                  </div>
                  <p className="mt-8 text-sm text-phoenix-500">Over 50+ local businesses restored.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process Section */}
        <section id="process" className="py-24 sm:py-32 bg-phoenix-50 border-t border-phoenix-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-700">Clear Action Plan</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-phoenix-900 sm:text-4xl text-balance">
                Our 3-Step Process
              </p>
              <p className="mt-6 text-lg leading-8 text-phoenix-600">
                We take the burden of reputation management off your shoulders with a straightforward, transparent approach.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-phoenix-200/50 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-phoenix-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <Search className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 1: Audit & Assess
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-phoenix-600">
                    <p className="flex-auto">
                      We perform a deep dive into your current online presence across Google, Yelp, and specialized platforms. We identify negative sentiment, unfair reviews, and areas of high leverage.
                    </p>
                  </dd>
                </div>

                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-phoenix-200/50 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-phoenix-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <Wrench className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 2: Respond & Rebuild
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-phoenix-600">
                    <p className="flex-auto">
                      Our team professionally addresses existing complaints, flags illegitimate reviews for removal, and implements strategies to bury negative threads by generating positive, authentic engagement.
                    </p>
                  </dd>
                </div>

                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-phoenix-200/50 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-phoenix-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <TrendingUp className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 3: Maintain & Grow
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-phoenix-600">
                    <p className="flex-auto">
                      With your baseline restored, we deploy continuous monitoring and automated pathways to capture positive reviews from your happy customers, ensuring your brand stays top-tier.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-phoenix-900 sm:text-4xl text-balance">Simple, Transparent Pricing</h2>
              <p className="mt-6 text-lg leading-8 text-phoenix-600">
                No hidden fees. We fix the immediate bleeding with a one-time reset, and keep your reputation spotless with ongoing maintenance.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-phoenix-200/50 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none shadow-sm overflow-hidden">
              <div className="p-8 sm:p-10 lg:flex-auto bg-white">
                <h3 className="text-2xl font-bold tracking-tight text-phoenix-900">Reputation Reset (One-Time)</h3>
                <p className="mt-6 text-base leading-7 text-phoenix-600">
                  A comprehensive overhaul of your current brand image. Perfect for businesses suffering from an unwarranted wave of bad reviews or a specific negative thread.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-accent-700">What&apos;s included in the Reset</h4>
                  <div className="h-px flex-auto bg-phoenix-100" />
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-phoenix-600 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Current state full audit</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Review flagging & removal requests</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Professional responses drafted</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Reddit/Search baseline mitigation</li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-phoenix-50 py-10 text-center ring-1 ring-inset ring-phoenix-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full border-l border-phoenix-200/50 lg:border-l-0">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-phoenix-600">One-time flat fee</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-phoenix-900">$1,500</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-phoenix-600">USD</span>
                    </p>
                    <Link
                      href="#contact"
                      className="mt-10 block w-full rounded-md bg-accent-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700 transition-colors"
                    >
                      Start the Audit
                    </Link>
                    <p className="mt-6 text-xs leading-5 text-phoenix-500">
                      Typically delivered in 14-30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-phoenix-200/50 lg:mx-0 lg:flex lg:max-w-none shadow-sm overflow-hidden bg-phoenix-900">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-white">Monthly Maintenance</h3>
                <p className="mt-6 text-base leading-7 text-phoenix-300">
                  After your reset, ensure you never slip back. We monitor your brand daily and build a strong moat of positive reviews.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-accent-400">What&apos;s included in Maintenance</h4>
                  <div className="h-px flex-auto bg-phoenix-700" />
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-phoenix-300 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> 24/7 web monitoring</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Automated review requests</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Same-day negative mitigation</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Bi-weekly reports</li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-phoenix-800/50 py-10 text-center ring-1 ring-inset ring-white/10 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-phoenix-300">Retainer</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-white">$500</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-phoenix-400">/ month</span>
                    </p>
                    <Link
                      href="#contact"
                      className="mt-10 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-phoenix-900 shadow-sm hover:bg-phoenix-50 transition-colors"
                    >
                      Subscribe
                    </Link>
                    <p className="mt-6 text-xs leading-5 text-phoenix-400">
                      Cancel anytime. No lock-in contracts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-24 sm:py-32 bg-phoenix-50 border-t border-phoenix-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-700">Proven Transformations</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-phoenix-900 sm:text-4xl text-balance">
                Real Businesses, Real Recovery
              </p>
              <p className="mt-6 text-lg leading-8 text-phoenix-600">
                See how we’ve helped local businesses turn their online presence from a liability into an asset.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between ring-1 ring-phoenix-200/50">
                <div>
                  <div className="flex items-center gap-x-2 text-phoenix-500 mb-6">
                    <span className="font-semibold text-sm">Local Restaurant</span>
                    <span>&bull;</span>
                    <span className="text-sm">Google Reviews</span>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-center">
                      <p className="text-sm font-medium text-phoenix-500 mb-1">Before Phoenix</p>
                      <p className="text-3xl font-bold text-phoenix-900">3.2<span className="text-lg text-phoenix-400">/5</span></p>
                    </div>
                    <ArrowRight className="text-phoenix-300 w-6 h-6" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-phoenix-500 mb-1">After 60 Days</p>
                      <p className="flex items-center justify-center gap-x-1 text-3xl font-bold text-accent-700">
                        4.6<span className="text-lg text-accent-400">/5</span>
                        <ArrowUpRight className="w-5 h-5 text-accent-600" />
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-phoenix-600">
                    Mitigated a wave of unfair 1-star reviews and enacted a system that captured 140+ new authentic 5-star ratings from happy diners.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between ring-1 ring-phoenix-200/50">
                <div>
                  <div className="flex items-center gap-x-2 text-phoenix-500 mb-6">
                    <span className="font-semibold text-sm">HVAC Contractor</span>
                    <span>&bull;</span>
                    <span className="text-sm">Reddit Thread</span>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-center">
                      <p className="text-sm font-medium text-phoenix-500 mb-1">Before Phoenix</p>
                      <p className="text-2xl font-bold text-phoenix-900">Page 1</p>
                    </div>
                    <ArrowRight className="text-phoenix-300 w-6 h-6" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-phoenix-500 mb-1">After 45 Days</p>
                      <p className="flex items-center justify-center gap-x-1 text-2xl font-bold text-accent-700">
                        Page 4
                        <ArrowDownRight className="w-5 h-5 text-accent-600" />
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-phoenix-600">
                    Pushed a highly damaging, defamatory Reddit thread off the first 3 pages of Google results by optimizing their core web assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 sm:py-32 bg-phoenix-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-phoenix-800 via-phoenix-900 to-phoenix-950 -z-10" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-accent-400">Client Stories</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                Trusted by 50+ Local Business Owners
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                <div className="flex flex-col justify-between rounded-2xl bg-white/5 p-8 shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-x-4 mb-6">
                    <Quote className="h-8 w-8 text-accent-500/50" />
                  </div>
                  <p className="text-base leading-7 text-phoenix-100 flex-auto italic">
                    "This space reserved for your client testimonial. Replace this text with a real quote showing how you saved their business from bad reviews."
                  </p>
                  <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
                    <div className="h-10 w-10 bg-phoenix-800 rounded-full flex items-center justify-center text-phoenix-300 font-bold">JD</div>
                    <div>
                      <div className="font-semibold text-white">John Doe</div>
                      <div className="text-sm text-phoenix-400">Owner, Local Plumbing LLC</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-white/5 p-8 shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-x-4 mb-6">
                    <Quote className="h-8 w-8 text-accent-500/50" />
                  </div>
                  <p className="text-base leading-7 text-phoenix-100 flex-auto italic">
                    "This space reserved for your client testimonial. Replace this text with a real quote showing how the one-time reset worked initially."
                  </p>
                  <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
                    <div className="h-10 w-10 bg-phoenix-800 rounded-full flex items-center justify-center text-phoenix-300 font-bold">SM</div>
                    <div>
                      <div className="font-semibold text-white">Sarah Miller</div>
                      <div className="text-sm text-phoenix-400">GM, Downtown Dental</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-white/5 p-8 shadow-sm ring-1 ring-white/10 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-x-4 mb-6">
                    <Quote className="h-8 w-8 text-accent-500/50" />
                  </div>
                  <p className="text-base leading-7 text-phoenix-100 flex-auto italic">
                    "This space reserved for your client testimonial. Replace this text with a real quote showing the benefits of monthly maintenance."
                  </p>
                  <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
                    <div className="h-10 w-10 bg-phoenix-800 rounded-full flex items-center justify-center text-phoenix-300 font-bold">MR</div>
                    <div>
                      <div className="font-semibold text-white">Michael Rodriguez</div>
                      <div className="text-sm text-phoenix-400">Founder, Elite Contractors</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section id="contact" className="py-24 sm:py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-phoenix-900 sm:text-4xl">Ready to take control of your reputation?</h2>
            <p className="mt-6 text-lg leading-8 text-phoenix-600">
              Stop letting a few bad reviews dictate your business growth. Get a free, confidential audit of your online presence today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@phoenixandco.com"
                className="w-full sm:w-auto rounded-lg bg-accent-700 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-accent-800 transition-colors"
              >
                Request Free Audit
              </a>
              <a
                href="tel:+18005550199"
                className="w-full sm:w-auto rounded-lg bg-phoenix-50 border border-phoenix-200 px-8 py-4 text-base font-semibold text-phoenix-900 shadow-sm hover:bg-phoenix-100 transition-colors"
              >
                Call (929) 832-8875
              </a>
            </div>
            <p className="mt-6 text-sm text-phoenix-500">
              No obligation. We’ll show you exactly what’s hurting your brand and how to fix it.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-phoenix-950 py-12 border-t border-phoenix-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-accent-700" />
            <span className="text-lg font-bold tracking-tight text-white">Phoenix & Co.</span>
          </div>
          <p className="text-sm text-phoenix-400">
            &copy; {new Date().getFullYear()} Phoenix & Co. Reputation Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-phoenix-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
