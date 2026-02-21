export const metadata = {
  title: "Privacy Policy | CancelEasy",
  description: "Privacy policy explaining how CancelEasy collects and uses information.",
};

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p>
          CancelEasy respects your privacy. We collect limited information necessary
          to provide subscription cancellation guidance and improve user experience.
        </p>

        <h2 className="text-lg font-semibold mt-6">Information We Collect</h2>
        <p>
          We may collect contact information submitted through forms, usage data,
          and analytics data to improve our services.
        </p>

        <h2 className="text-lg font-semibold mt-6">How We Use Information</h2>
        <p>
          Information is used to respond to inquiries, provide guidance, and
          improve website performance.
        </p>

        <h2 className="text-lg font-semibold mt-6">Data Sharing</h2>
        <p>
          We do not sell personal information. Data may be shared with trusted
          service providers necessary to operate this website.
        </p>

        <h2 className="text-lg font-semibold mt-6">Contact</h2>
        <p>
          For privacy inquiries, please contact us through our official contact page.
        </p>
      </div>
    </>
  );
}
