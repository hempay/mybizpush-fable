import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    heading: "Information We Collect",
    body: "At MyBizPush Solutions Limited, we collect information you provide directly to us, such as when you:",
    list: [
      "Contact us for consultations or services",
      "Subscribe to our newsletters or updates",
      "Use our website or services",
      "Communicate with us via email, phone, or other channels",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to:",
    list: [
      "Provide, maintain, and improve our services",
      "Process transactions and send related information",
      "Send you technical notices, updates, and support messages",
      "Respond to your comments, questions, and requests",
      "Communicate with you about services, offers, and events",
    ],
  },
  {
    heading: "Information Sharing",
    body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.",
  },
  {
    heading: "Data Security",
    body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.",
  },
  {
    heading: "Your Rights",
    body: "You have the right to:",
    list: [
      "Access and update your personal information",
      "Request deletion of your personal information",
      "Opt-out of marketing communications",
      "Request a copy of your data",
    ],
  },
  {
    heading: "Governing Law",
    body: "This Privacy Policy is governed by and construed in accordance with the laws of the United States of America and Nigeria. Any disputes relating to this policy will be subject to the jurisdiction of the appropriate courts in either the United States or Nigeria, depending on the nature and location of the dispute.",
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Privacy Policy"
      sections={sections}
      contactIntro="If you have any questions about this Privacy Policy, please contact us at:"
    />
  );
}
