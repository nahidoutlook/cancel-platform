import SectionWrapper from "@/components/layout/SectionWrapper";
import CallCTA from "@/components/marketing/CallCTA";
import CategorySection from "@/components/home/CategorySection";
import Link from "next/link";
import { services } from "@/data";
import LeadForm from "@/components/forms/LeadForm";

const BASE_URL = "https://cancelplatform.vercel.app";


export const metadata = {
  title: "Cancel Subscriptions Easily | 500+ Services Covered",
  description:
    "Step-by-step subscription cancellation guides for Netflix, Amazon, gyms, apps, insurance, and more. Fast, simple, and secure cancellation help.",
};






export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">


      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Cancel Platform",
      url: BASE_URL,
    }),
  }}
/>

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
              <Link
                  href="/cancel"
                className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all"
                      >
                  Browse Services
              </Link>

                <Link
                   href="#how-it-works"
                   className="border border-border px-7 py-3 rounded-xl font-semibold hover:bg-secondary transition"
                    >
                    How It Works
                  </Link>
             
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
          <CategorySection />
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

          <div className="overflow-hidden bg-card rounded-lg py-6 w-full">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-container {
                display: flex;
                animation: scroll 80s linear infinite;
                width: fit-content;
              }
              .marquee-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="marquee-container gap-3 flex">
              {[...services, ...services].map((service, index) => (
                <Link
                  href={`/cancel/${service.slug}`}
                  key={`${service.slug}-${index}`}
                >
                  <div className="group bg-white border border-border rounded-md p-3 hover:shadow-sm transition-all duration-300 cursor-pointer flex-shrink-0 whitespace-nowrap">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition">
                      {service.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
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
