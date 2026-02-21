export const metadata = {
  title: "About Us | CancelEasy",
  description:
    "Learn about CancelEasy and our mission to provide independent subscription cancellation guidance.",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border p-10">
          <h1 className="text-3xl font-bold mb-8">About CancelEasy</h1>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              CancelEasy is an independent informational platform designed to help
              users understand how to cancel subscriptions safely and efficiently.
            </p>

            <p>
              Our mission is to simplify subscription management by providing clear,
              structured cancellation guidance in one centralized place.
            </p>

            <p>
              We are not affiliated with, endorsed by, or sponsored by any brands
              listed on this website. All company names and trademarks belong to
              their respective owners.
            </p>

            <h2 className="text-xl font-semibold mt-10">
              Why We Built CancelEasy
            </h2>

            <p>
              Subscription services have become part of everyday life, but canceling
              them can sometimes be confusing. We aim to provide clear step-by-step
              information to reduce frustration and save time.
            </p>

            <h2 className="text-xl font-semibold mt-10">Our Commitment</h2>

            <p>
              We are committed to transparency, user privacy, and providing accurate
              informational content. We do not access user accounts or process
              cancellations on behalf of users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
