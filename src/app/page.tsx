import SectionWrapper from "@/components/layout/SectionWrapper";
import CallCTA from "@/components/marketing/CallCTA";
import Link from "next/link";
import { services } from "@/lib/services";
import LeadForm from "@/components/forms/LeadForm";





export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <SectionWrapper>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
              Cancel Subscriptions
              <br />
              <span className="text-primary">The Easy Way</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Step-by-step cancellation guides for 500+ services.
              No hidden fees. No confusion. Just simple, clear instructions.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all">
                Browse Services
              </button>

              <button className="border border-border px-7 py-3 rounded-xl font-semibold hover:bg-secondary transition">
                How It Works
              </button>
            </div>
          </div>
        </SectionWrapper>
      </section>


      <section className="py-20">
  <div className="max-w-4xl mx-auto">
    <LeadForm brandSlug="general" brandName="Any Service" />
  </div>
</section>



      {/* STATS */}
      <section className="border-y border-border bg-card py-14">
        <SectionWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="text-muted-foreground mt-2">Services Covered</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-primary">50,000+</p>
            <p className="text-muted-foreground mt-2">Users Helped</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-primary">4.9/5</p>
            <p className="text-muted-foreground mt-2">Average Rating</p>
          </div>
        </SectionWrapper>
      </section>

      {/* CATEGORIES */}
      <section className="py-24">
        <SectionWrapper>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Browse by Category
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Find step-by-step cancellation guides organized by industry.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Streaming", desc: "Netflix, Hulu, Disney+, Prime Video..." },
              { name: "Software", desc: "Adobe, Microsoft, Dropbox, Zoom..." },
              { name: "Fitness", desc: "Planet Fitness, ClassPass, Gym apps..." },
              { name: "Finance", desc: "Credit monitoring, budgeting apps..." },
              { name: "Shopping", desc: "Amazon, subscription boxes..." },
              { name: "Gaming", desc: "Xbox, PlayStation, online games..." },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group border border-border rounded-2xl p-8 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-secondary/30">
        <SectionWrapper>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Popular Cancellation Guides
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Most searched services this month.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                href={`/cancel/${service.slug}`}
                key={service.slug}
              >
                <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 mb-4 flex items-center justify-center text-primary font-bold">
                    {service.name.charAt(0)}
                  </div>

                  <h3 className="font-semibold group-hover:text-primary transition">
                    {service.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    Step-by-step cancellation guide
                  </p>
                </div>
              </Link>
              
            ))}
          </div>
        </SectionWrapper>
        
      </section>

      <CallCTA
        title="Ready to Cancel a Subscription?"
        description="Search our database of 500+ services and follow simple step-by-step instructions to cancel today."
        primaryButton="Browse Services"
        secondaryButton="Contact Support"
      />

    </div>
  );
}
