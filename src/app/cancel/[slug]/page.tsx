import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CallCTA from "@/components/marketing/CallCTA";
import LeadForm from "@/components/forms/LeadForm";
import { services } from "@/data";
import ExitIntentPopup from "@/components/marketing/ExitIntentPopup";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import LiveTicker from "@/components/marketing/LiveTicker";
import { createSupabaseAdmin } from "@/lib/supabase/admin";


import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/seo/breadcrumb";





interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ============================= */
/* Static Generation */
/* ============================= */
const BASE_URL = "https://cancelplatform.vercel.app";
export const dynamic = "force-dynamic";

{/*  export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
} */}

/* ============================= */
/* Dynamic Metadata */
/* ============================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const normalizedSlug = slug?.toLowerCase?.() ?? "";

  const supabase = createSupabaseAdmin();

    const { data: dbBrand } = await supabase
  .from("brands")
  .select("*")
  .eq("slug", normalizedSlug)
  .eq("is_published", true)
  .single();

// If brand exists in DB use it
           let service = dbBrand
        ? {
      name: dbBrand.name,
      slug: dbBrand.slug,
      category: dbBrand.category || "other",
          }
      : services.find((s) => s.slug === normalizedSlug);

  if (!service) {
           return {
              title: "Service Not Found | Cancel Platform",
              };
                }

  return {
  title: `How to Cancel ${service.name} Subscription (2026 Guide) | Cancel Platform`,
  description: `Step-by-step guide explaining how to cancel ${service.name} subscription and manage recurring billing in the USA.`,

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: `${BASE_URL}/cancel/${normalizedSlug}`,
  },

  openGraph: {
    title: `How to Cancel ${service.name}`,
    description: `Complete cancellation guide for ${service.name}.`,
    url: `${BASE_URL}/cancel/${normalizedSlug}`,
    type: "article",
    siteName: "Cancel Platform",
  },
};
}



/* ============================= */
/* Page Component */
/* ============================= */
export default async function ServicePage(
  { params }: PageProps
) {
  const { slug } = await params;

  const normalizedSlug = slug.toLowerCase();

  const supabase = createSupabaseAdmin();

const { data: dbBrand } = await supabase
  .from("brands")
  .select("*")
  .eq("slug", normalizedSlug)
  .eq("is_published", true)
  .single();

let service;

if (dbBrand) {
  service = {
    name: dbBrand.name,
    slug: dbBrand.slug,
    category: dbBrand.category || "other",
  };
} else {
  service = services.find((s) => s.slug === normalizedSlug);
}

if (!service) {
  return notFound();
}
  
  

  /* ============================= */
  /* Structured Data */
  /* ============================= */

  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this cancellation guide free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All guides are free and regularly updated.",
        },
      },
      {
        "@type": "Question",
        name: "Do you cancel subscriptions for me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide step-by-step instructions. You remain in control of your account.",
        },
      },
      {
        "@type": "Question",
        name: "How often are guides updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our cancellation instructions are reviewed frequently.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cancel",
        item: `${BASE_URL}/cancel`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${BASE_URL}/cancel/${normalizedSlug}`,
      },
    ],
  };

  const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to Cancel ${service.name}`,
  description: `Step-by-step cancellation guide for ${service.name}.`,
  provider: {
    "@type": "Organization",
    name: "Cancel Platform",
    url: BASE_URL,
  },
};

  return (
    <>
      {/* Structured Data */}
      <script 
      type="application/ld+json"
       dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(breadcrumbSchema) }} />

      <script 
      type="application/ld+json"
       dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(howToSchema) }} />

        <script
         type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(faqSchema) }} />


{/* Breadcrumb */}


<section className="pt-10">
  <SectionWrapper>     
<Breadcrumb className="mb-6">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/cancel">Cancel Services</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{service.name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

</SectionWrapper>
</section>

      {/* ============================= */}
{/* Conversion Hero Section */}
{/* ============================= */}
<section 
  id="lead-form" 
  className="scroll-mt-24 pt-20 pb-28 bg-gradient-to-br from-white to-blue-100 relative">

  <div className="absolute -top-40 -left-40 w-96 h-96 bg-white-200 rounded-full blur-3xl opacity-30"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

  {/* Brand Watermark Background Styling */}

  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="text-[120px] font-bold text-blue-200 opacity-60 select-none hidden lg:block">
      {service.name}
      </span>
  </div>
    {/* Brand Watermark Background Styling End */}


  <SectionWrapper>
    <div className="grid lg:grid-cols-12 gap-16 items-start align-start">



      {/* LEFT SIDE - Content */}
      <div className="lg:col-span-7 space-y-8">



        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
          Cancel {service.name} Subscriptions
        </h1>

        <p className="text-sm text-muted-foreground mt-4">
         subscriptions often renew automatically unless canceled correctly.
         Some users report charges continuing due to account reactivation or payment retries.
         Independent subscription assistance service. Not affiliated with or endorsed by {service.name}.
        </p>

        <p>

          </p>

                 

        {/* Steps Card */}
        

       

        <div className="space-y-3">

        <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm">
        <span className="text-gray-600 font-semibold">✔</span>
        <p>No login or password required</p>
        </div>

        <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm">
        <span className="text-gray-600 font-semibold">✔</span>
       <p>Avoid future charges</p>
        </div>

        <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm">
       <span className="text-gray-600 font-semibold">✔</span>
       <p>Billing & renewal issues</p>
        </div>

        <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm">
        <span className="text-gray-600 font-semibold">✔</span>
        <p>When support is unresponsive</p>
        </div>

        <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm">
        <span className="text-gray-600 font-semibold">✔</span>
       <p>Privacy-protected form</p>
       </div>
        </div>

      

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span>✓ Updated for 2026</span>
          <span>✓ 500+ Services Covered</span>
          <span>✓ Free Guides</span>
        </div>

          <div className="mt-12 space-y-8">

          <h2 className="text-2xl font-semibold">
              How Cancellation Assistance Works
            </h2>

            <div className="space-y-6">

          <div>
            <h3 className="font-semibold text-lg">
            Tell Us the Service
            </h3>
          <p className="text-muted-foreground">
            Share the subscription and issue you’re facing.
            </p>
            </div>

            <div>
           <h3 className="font-semibold text-lg">
             Get Guidance
           </h3>
           <p className="text-muted-foreground">
            We explain available cancellation options.
         </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Cancel Successfully
            </h3>
             <p className="text-muted-foreground">
             Follow guidance to avoid future billing.
           </p>
         </div>

           <div>
             <h3 className="font-semibold text-lg">
                Not affiliated with or endorsed by {service.name}.
              </h3>
             <p className="text-muted-foreground">
                 Independent assistance
              </p>
            </div>

          </div>

        </div>




        <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground border-t pt-6">
         <span>🔒 Secure Form</span>
         <span>⚡ Fast Response</span>
         <span>🛡 Privacy Protected</span>
         <span>⭐ Transparent Process</span>
        </div>


  
        <div className="max-w-xl space-y-10 mt-12">

        <div>
        <h3 className="text-2xl font-semibold mb-6">
        Common Issues When Cancelling {service.name}
        </h3>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
        <li> Automatic renewal after pause</li>
        <li> Account reactivated by household member</li>
        <li> Charged after plan downgrade</li>
        <li> No cancellation confirmation email</li>

       </div>

        </div>
     
      </div>
  




      {/* Live Tracker */}

      <div className="mt-4">
         <LiveTicker serviceName={service.name} />
      </div>



 
    </div>

      {/* RIGHT SIDE - Sticky Lead Form */}
<div className="lg:col-span-5 self-start">

  <div className="sticky top-28 space-y-6">


    
    <LeadForm
      brandSlug={service.slug}
      brandName={service.name}
    />

    {/* Toll-Free Box */}
    <div className="w-full bg-indigo-500 text-white rounded-4xl p-6 text-center shadow-md relative">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
        Independent Assistance
      </span>

      <p className="text-sm font-medium mt-4">
        Optional Guidance Support
</p>

      <a
        href="tel:18005550899"
        className="block text-2xl font-bold mt-2 hover:underline"
      >
        📞 1-800-555-0899
      </a>

      <p className="text-xs opacity-90 mt-1">
        Mon–Fri 9AM – 6PM EST
      </p>
    </div>

    

    {/* Live Chat Box */}
    <div className="w-full bg-green-100 border border-green-200 rounded-4xl p-6 text-center shadow-sm">
      <p className="text-sm font-medium text-green-800">
        Prefer Live Chat Support?
      </p>

      <button className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200">
        💬 Start Live Chat Now
      </button>

      <p className="text-xs text-green-700 mt-2">
        Avg. response time: under 2 minutes
      </p>
    </div>

  </div>
</div>


      
</div>
     
      
  </SectionWrapper>
</section>



      {/* CallCTA Section */}
      <section className="py-20 bg-gradient-to-t from-blue-100 to-white">
        <SectionWrapper>
          <div className="max-w-3xl">
            
            <CallCTA
              title="How to Cancel & Avoid Future Charges"
              description="Explore 500+ updated cancellation guides and avoid surprise renewals before your next billing cycle."
              primaryButton="Browse All Cancellation Guides"
              secondaryButton="Get Support Assistance"
/>

          </div>
        </SectionWrapper>

        
        

      </section>

      <h2 className="text-2xl font-bold mt-16 mb-6">
  Related Services
</h2>

<div className="grid md:grid-cols-3 gap-4">
  {services
    .filter(
      (s) =>
        s.category === service.category &&
        s.slug !== service.slug
    )
    .slice(0, 6)
    .map((related) => (
      <Link
        key={related.slug}
        href={`/cancel/${related.slug}`}
        className="border rounded-lg p-4 hover:shadow"
      >
        Cancel {related.name}
      </Link>
    ))}
</div>

      
      {/* FAQ */}
        <section className="bg-gradient-to-t from-white to-blue-50 pt-16 pb-16">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Frequently Asked Questions
            </h2>
  <FaqAccordion
  items={[
    {
      question: `Is cancelling ${service.name} free?`,
      answer:
        "Yes. All cancellation guides on our platform are free and regularly updated.",
    },
    {
      question: `Do you cancel ${service.name} subscriptions for me?`,
      answer:
        "We provide clear step-by-step instructions. You remain fully in control of your account.",
    },
    {
      question: "How often are guides updated?",
      answer:
        "Our cancellation instructions are reviewed frequently to ensure accuracy.",
    },
  ]}

/>
            
            
          </div>
        </SectionWrapper>

        
      </section>

      {/* Disclaimer Section */}
          <section className="bg-gradient-to-t from-white to-blue-100 py-20">
        
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-700">
            <p className="mb-3">
              <strong>Disclaimer:</strong> This website provides independent
              subscription cancellation assistance and informational guidance.
              We are not affiliated with, endorsed by, or sponsored by any company,
              brand, or service mentioned on this site. All trademarks are the
              property of their respective owners.
            </p>
        
            <p>
              We do not access user accounts, process cancellations on behalf of users,
              or guarantee outcomes. Users are responsible for managing their
              subscriptions directly with the service provider.
            </p>
          </div>
          </section>

      {/* Exit Intent Popup */}
      <ExitIntentPopup serviceName={service.name} />


  {/* Desktop Floating Call Bar */}
  <div className="hidden lg:block fixed bottom-6 right-6 z-50">
  <a
    href="tel:18005550899"
    className="bg-blue-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-blue-700 transition font-semibold"
  >
    📞 Need Help? Call Now
  </a>
  </div>


  {/* ============================= */}
  {/* Mobile Floating CTA Buttons */}
  {/* ============================= */}
  




    </>
  );
}
