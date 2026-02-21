export const metadata = {
  title: "Contact Us | CancelEasy",
  description:
    "Contact CancelEasy for assistance and general inquiries regarding subscription guidance.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border p-10">
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

          <p className="text-gray-600 mb-8">
            Have questions about our platform or need clarification about a
            cancellation guide? Reach out to us using the form below.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 text-sm text-gray-500">
            <p>
              For urgent matters related to subscription cancellation, please refer
              to the specific service guide on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
