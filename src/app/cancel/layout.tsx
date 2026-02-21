import StickyCTA from "@/components/marketing/StickyCTA";

export default function CancelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      {/* This padding creates space for fixed sticky CTA */}
      <div className="min-h-screen bg-white pb-24">
        {children}
      </div>

           
      {/* Sticky only for cancel pages */}
      <StickyCTA serviceName="" />
    </>
  );
}
