export const metadata = {
  title: "Terms of Service | CancelEasy",
  description: "Terms governing use of the CancelEasy platform.",
};

export default function TermsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p>
          By accessing or using CancelEasy, you agree to comply with these Terms of Service.
        </p>

        <h2 className="text-lg font-semibold mt-6">Use of Service</h2>
        <p>
          CancelEasy provides independent informational guidance for subscription
          cancellations. We do not perform cancellations on behalf of users.
        </p>

        <h2 className="text-lg font-semibold mt-6">No Affiliation</h2>
        <p>
          CancelEasy is not affiliated with or endorsed by any companies mentioned.
        </p>

        <h2 className="text-lg font-semibold mt-6">Limitation of Liability</h2>
        <p>
          CancelEasy shall not be liable for damages resulting from reliance on
          website information.
        </p>

        <h2 className="text-lg font-semibold mt-6">Changes</h2>
        <p>
          We reserve the right to modify these terms at any time without prior notice.
        </p>
      </div>
    </>
  );
}
