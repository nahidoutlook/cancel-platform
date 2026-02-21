export const metadata = {
  title: "Disclaimer | CancelEasy",
  description:
    "Official disclaimer for CancelEasy subscription cancellation guidance platform.",
};

export default function DisclaimerPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p>
          CancelEasy provides independent subscription cancellation guidance and
          informational assistance. We are not affiliated with, endorsed by,
          sponsored by, or officially connected with any companies mentioned on this website.
        </p>

        <p>
          All trademarks and brand names are the property of their respective
          owners. Their use does not imply endorsement.
        </p>

        <p>
          We do not access user accounts, process cancellations, or guarantee
          subscription outcomes. Users are responsible for managing cancellations
          directly with the service provider.
        </p>

        <p>
          Information on this site is provided for general informational purposes
          only and should not be considered legal or financial advice.
        </p>

        <p>
          By using this website, you agree that CancelEasy shall not be liable for
          any damages arising from reliance on the information provided.
        </p>
      </div>
    </>
  );
}
