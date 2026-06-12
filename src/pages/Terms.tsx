import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing and using the services provided by MyBizPush Solutions Limited, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
  },
  {
    heading: "Services Description",
    body: "MyBizPush Solutions Limited provides comprehensive technology and business solutions including but not limited to:",
    list: [
      "IT consultation and technology strategy",
      "Website design and development",
      "Digital marketing and social media management",
      "Mobile application development",
      "Business branding and graphic design",
      "Content creation and SEO services",
    ],
  },
  {
    heading: "Payment Terms",
    body: "Payment terms will be specified in individual service agreements. Unless otherwise stated, payment is due upon completion of services or as outlined in the project proposal. Late payments may incur additional fees as specified in the service agreement.",
  },
  {
    heading: "Intellectual Property",
    body: "Upon full payment, clients will own the final deliverables created specifically for their project. MyBizPush Solutions Limited retains the right to use project work for portfolio and marketing purposes unless otherwise agreed upon in writing.",
  },
  {
    heading: "Limitation of Liability",
    body: "MyBizPush Solutions Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.",
  },
  {
    heading: "Confidentiality",
    body: "We respect the confidentiality of our clients' information and will not disclose any confidential information to third parties without prior written consent, except as required by law.",
  },
  {
    heading: "Termination",
    body: "Either party may terminate services with written notice. Upon termination, payment will be due for all work completed up to the termination date.",
  },
  {
    heading: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of the United States of America and Nigeria, and any disputes relating to these terms will be subject to the jurisdiction of the appropriate courts in either the United States or Nigeria, depending on the nature and location of the dispute.",
  },
];

export default function Terms() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Terms of Service"
      sections={sections}
      contactIntro="For questions regarding these Terms of Service, please contact us at:"
    />
  );
}
