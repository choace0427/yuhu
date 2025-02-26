// "use client";

// import { useState } from "react";
// import { Container, Title, Text, Accordion, Box } from "@mantine/core";

// const legalSections = [
//   {
//     title: "Privacy Policy",
//     content: `
//       Effective Date: 1st March 2025

//       Yuhu Wellness ("we," "our," or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.yuhuapp.com, use our mobile application, or engage with our services.

//       By using our services, you agree to the collection and use of information in accordance with this policy.

//       1. Information We Collect
//       We collect various types of information to provide and improve our services:

//       1.1. Personal Data
//       When you register on our platform or use our services, we may collect the following information:
//       - Name and surname
//       - Email address
//       - Phone number
//       - Billing and payment information
//       - Location data (when booking a service)
//       - Identification documents (for therapists)

//       1.2. Non-Personal Data
//       We also collect non-personal data such as:
//       - Device type, browser type, and IP address
//       - Usage data, such as pages visited and time spent on the site
//       - Cookies and tracking technologies

//       2. How We Use Your Information
//       We use your information to:
//       - Provide and manage bookings for mobile massage and personal training services
//       - Process payments and invoices
//       - Improve user experience and website functionality
//       - Send promotional and marketing communications (with user consent)
//       - Ensure compliance with legal obligations

//       3. Sharing Your Information
//       We do not sell or rent your personal data. However, we may share your information with:
//       - Service providers (therapists, payment processors, and IT services)
//       - Legal authorities when required by law
//       - Business partners for operational purposes (with consent)

//       4. Data Security
//       We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.

//       5. Your Rights Under GDPR
//       As a user in the European Union, you have the following rights:
//       - Access & Correction: Request a copy of your personal data or correct any inaccuracies.
//       - Deletion: Request deletion of your personal data, subject to legal obligations.
//       - Objection & Restriction: Limit or object to certain data processing.
//       - Data Portability: Request transfer of your data to another provider.
//       To exercise these rights, contact us at info@yuhuapp.com.

//       6. Cookies and Tracking Technologies
//       We use cookies to enhance user experience. You can adjust cookie preferences in your browser settings.

//       7. Data Retention
//       We retain your data as long as necessary for the purposes stated above or as required by law.

//       8. Third-Party Links
//       Our website may contain links to third-party sites. We are not responsible for their privacy practices.

//       9. Updates to This Privacy Policy
//       We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.

//       10. Contact Information
//       If you have any questions about this Privacy Policy, contact us at:
//       Yuhu Wellness
//       Email: info@yuhuapp.com
//       Website: www.yuhuapp.com
//     `,
//   },
//   {
//     title: "Cookies Policy",
//     content: `
//       What Are Cookies?
//       Cookies are small text files stored on your device when you visit a website. They help improve user experience by remembering preferences and enabling website functionality.

//       Types of Cookies We Use
//       Essential Cookies
//       These cookies are necessary for the proper functioning of our website. They cannot be disabled.

//       Performance Cookies
//       These cookies help us analyze website traffic and improve performance. They collect anonymized data.

//       Functional Cookies
//       These cookies remember user preferences (e.g., language settings) to provide a better experience.

//       Marketing Cookies
//       These cookies track your browsing activity to deliver personalized ads. They are only used with your consent.

//       Managing Your Cookie Preferences
//       You can manage or disable cookies through your browser settings:
//       - Google Chrome: [Settings > Privacy and Security > Cookies]
//       - Firefox: [Settings > Privacy & Security > Cookies and Site Data]
//       - Safari: [Preferences > Privacy > Manage Website Data]
//       - Edge: [Settings > Privacy, Search, and Services > Cookies]
//     `,
//   },
//   {
//     title: "Imprint (Legal Notice)",
//     content: `
//       Website Owner: Yuhu Wellness
//       Legal Entity: [Insert company name or indicate if it's a sole proprietorship]
//       Registered Address: [Insert company address]
//       Phone Number: +34624388967
//       Email: info@yuhuapp.com
//       Website: www.yuhuapp.com
//       Company Registration Number: [Insert registration number, if applicable]
//       VAT Identification Number: [Insert VAT ID, if applicable]
//       Managing Director(s): [Insert name(s) of the person(s) responsible]

//       Dispute Resolution
//       We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.

//       Liability for Content
//       We make every effort to keep the information on our website up to date, but we do not assume liability for its correctness, completeness, or accuracy. As a service provider, we are responsible for our content under general laws, but we are not obligated to monitor transmitted or stored third-party information.

//       Liability for Links
//       Our website may contain links to external websites. We have no control over their content and, therefore, assume no liability for them. The respective provider or operator of the linked sites is always responsible for their content.

//       Copyright Notice
//       All content, texts, images, and graphics on this website are subject to copyright law. Any reproduction, modification, or distribution requires prior written consent from Yuhu Wellness.
//     `,
//   },
//   {
//     title: "Terms of Service",
//     content: `
//       Terms of Service – Yuhu Wellness
//       Effective Date: 1st March 2025

//       1. General Terms
//       Yuhu Wellness ("we," "our," or "us") provides on-demand massage and personal training services through its website www.yuhuapp.com. By booking a service, you agree to the following terms.

//       2. Bookings & Payments
//       - All bookings must be made online or through our platform.
//       - Payment is required at the time of booking.
//       - If payment fails, the appointment will not be confirmed.

//       3. Cancellation & Rescheduling Policy
//       - More than 2 hours before the appointment: No charge.
//       - Less than 30 minutes before the appointment: 50% of the service fee will be charged as compensation to the therapist.
//       - No-show or cancellation upon therapist arrival: Full service fee will be charged.
//       - Rescheduling: Clients may reschedule free of charge up to 2 hours before the session.

//       4. Therapist Rights & Safety
//       - Our therapists have the right to refuse service if they feel unsafe, the environment is unsuitable, or the client is under the influence of alcohol/drugs.
//       - If a therapist refuses service due to inappropriate client behavior, the full amount will be charged, and the client may be banned.

//       5. Hygiene & Preparation
//       - Clients must ensure a clean, safe, and private space for treatments.
//       - Therapists reserve the right to decline service if conditions are unhygienic, without a refund.

//       6. Liability Disclaimer
//       - Yuhu Wellness is not responsible for any allergic reactions, injuries, or other medical issues arising from treatments.
//       - Clients should disclose any medical conditions before the session.

//       7. Refunds & Disputes
//       - Refunds will only be issued if the cancellation policy is met.
//       - If a therapist does not show up, a full refund will be issued or a rescheduled appointment at no cost.
//       - Any disputes must be reported within 24 hours of the appointment.

//       8. Customer Conduct
//       - We have a zero-tolerance policy for inappropriate or disrespectful behavior.
//       - Any violation will result in immediate termination of the session, full charges applied, and potential legal action.

//       9. Modification of Terms
//       We may update these Terms of Service at any time. The latest version will always be available on our website.

//       10. Contact Information
//       For any questions regarding these terms, contact us at:
//       Email: info@yuhuapp.com
//       Website: www.yuhuapp.com
//     `,
//   },
// ];

// export default function LegalPage() {
//   const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

//   return (
//     <Container size="lg" py="xl">
//       <Title order={1} ta="center" mb="xl">
//         Legal Information
//       </Title>
//       <Text ta="center" color="dimmed" mb="xl">
//         Welcome to the legal section of Yuhu Wellness. Below you can find our
//         legal documents.
//       </Text>

//       <Accordion
//         value={activeAccordion}
//         onChange={setActiveAccordion}
//         variant="separated"
//         radius="md"
//       >
//         {legalSections.map((section, index) => (
//           <Accordion.Item key={index} value={section.title}>
//             <Accordion.Control>{section.title}</Accordion.Control>
//             <Accordion.Panel>
//               <Box style={{ whiteSpace: "pre-wrap" }}>{section.content}</Box>
//             </Accordion.Panel>
//           </Accordion.Item>
//         ))}
//       </Accordion>
//     </Container>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Accordion,
  Paper,
  Grid,
  Box,
  List,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBook,
  IconCookie,
  IconFileDescription,
  IconClipboardList,
} from "@tabler/icons-react";

const legalSections = [
  {
    title: "Privacy Policy",
    icon: <IconBook size={16} />,
    content: `
      Effective Date: 1st March 2025

      Yuhu Wellness ("we," "our," or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.yuhuapp.com, use our mobile application, or engage with our services.

      By using our services, you agree to the collection and use of information in accordance with this policy.

      1. Information We Collect
      We collect various types of information to provide and improve our services:

      1.1. Personal Data
      When you register on our platform or use our services, we may collect the following information:
      - Name and surname
      - Email address
      - Phone number
      - Billing and payment information
      - Location data (when booking a service)
      - Identification documents (for therapists)

      1.2. Non-Personal Data
      We also collect non-personal data such as:
      - Device type, browser type, and IP address
      - Usage data, such as pages visited and time spent on the site
      - Cookies and tracking technologies

      2. How We Use Your Information
      We use your information to:
      - Provide and manage bookings for mobile massage and personal training services
      - Process payments and invoices
      - Improve user experience and website functionality
      - Send promotional and marketing communications (with user consent)
      - Ensure compliance with legal obligations

      3. Sharing Your Information
      We do not sell or rent your personal data. However, we may share your information with:
      - Service providers (therapists, payment processors, and IT services)
      - Legal authorities when required by law
      - Business partners for operational purposes (with consent)

      4. Data Security
      We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.

      5. Your Rights Under GDPR
      As a user in the European Union, you have the following rights:
      - Access & Correction: Request a copy of your personal data or correct any inaccuracies.
      - Deletion: Request deletion of your personal data, subject to legal obligations.
      - Objection & Restriction: Limit or object to certain data processing.
      - Data Portability: Request transfer of your data to another provider.
      To exercise these rights, contact us at info@yuhuapp.com.

      6. Cookies and Tracking Technologies
      We use cookies to enhance user experience. You can adjust cookie preferences in your browser settings.

      7. Data Retention
      We retain your data as long as necessary for the purposes stated above or as required by law.

      8. Third-Party Links
      Our website may contain links to third-party sites. We are not responsible for their privacy practices.

      9. Updates to This Privacy Policy
      We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.

      10. Contact Information
      If you have any questions about this Privacy Policy, contact us at:
      Yuhu Wellness
      Email: info@yuhuapp.com
      Website: www.yuhuapp.com
    `,
  },
  {
    title: "Cookies Policy",
    icon: <IconCookie size={16} />,
    content: `
      What Are Cookies?
      Cookies are small text files stored on your device when you visit a website. They help improve user experience by remembering preferences and enabling website functionality.

      Types of Cookies We Use
      Essential Cookies
      These cookies are necessary for the proper functioning of our website. They cannot be disabled.

      Performance Cookies
      These cookies help us analyze website traffic and improve performance. They collect anonymized data.

      Functional Cookies
      These cookies remember user preferences (e.g., language settings) to provide a better experience.

      Marketing Cookies
      These cookies track your browsing activity to deliver personalized ads. They are only used with your consent.

      Managing Your Cookie Preferences
      You can manage or disable cookies through your browser settings:
      - Google Chrome: [Settings > Privacy and Security > Cookies]
      - Firefox: [Settings > Privacy & Security > Cookies and Site Data]
      - Safari: [Preferences > Privacy > Manage Website Data]
      - Edge: [Settings > Privacy, Search, and Services > Cookies]
    `,
  },
  {
    title: "Imprint (Legal Notice)",
    icon: <IconFileDescription size={16} />,
    content: `
      Website Owner: Yuhu Wellness
      Legal Entity: [Insert company name or indicate if it's a sole proprietorship]
      Registered Address: [Insert company address]
      Phone Number: +34624388967
      Email: info@yuhuapp.com
      Website: www.yuhuapp.com
      Company Registration Number: [Insert registration number, if applicable]
      VAT Identification Number: [Insert VAT ID, if applicable]
      Managing Director(s): [Insert name(s) of the person(s) responsible]

      Dispute Resolution
      We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.

      Liability for Content
      We make every effort to keep the information on our website up to date, but we do not assume liability for its correctness, completeness, or accuracy. As a service provider, we are responsible for our content under general laws, but we are not obligated to monitor transmitted or stored third-party information.

      Liability for Links
      Our website may contain links to external websites. We have no control over their content and, therefore, assume no liability for them. The respective provider or operator of the linked sites is always responsible for their content.

      Copyright Notice
      All content, texts, images, and graphics on this website are subject to copyright law. Any reproduction, modification, or distribution requires prior written consent from Yuhu Wellness.
    `,
  },
  {
    title: "Terms of Service",
    icon: <IconClipboardList size={16} />,
    content: `
      Terms of Service – Yuhu Wellness
      Effective Date: 1st March 2025

      1. General Terms
      Yuhu Wellness ("we," "our," or "us") provides on-demand massage and personal training services through its website www.yuhuapp.com. By booking a service, you agree to the following terms.

      2. Bookings & Payments
      - All bookings must be made online or through our platform.
      - Payment is required at the time of booking.
      - If payment fails, the appointment will not be confirmed.

      3. Cancellation & Rescheduling Policy
      - More than 2 hours before the appointment: No charge.
      - Less than 30 minutes before the appointment: 50% of the service fee will be charged as compensation to the therapist.
      - No-show or cancellation upon therapist arrival: Full service fee will be charged.
      - Rescheduling: Clients may reschedule free of charge up to 2 hours before the session.

      4. Therapist Rights & Safety
      - Our therapists have the right to refuse service if they feel unsafe, the environment is unsuitable, or the client is under the influence of alcohol/drugs.
      - If a therapist refuses service due to inappropriate client behavior, the full amount will be charged, and the client may be banned.

      5. Hygiene & Preparation
      - Clients must ensure a clean, safe, and private space for treatments.
      - Therapists reserve the right to decline service if conditions are unhygienic, without a refund.

      6. Liability Disclaimer
      - Yuhu Wellness is not responsible for any allergic reactions, injuries, or other medical issues arising from treatments.
      - Clients should disclose any medical conditions before the session.

      7. Refunds & Disputes
      - Refunds will only be issued if the cancellation policy is met.
      - If a therapist does not show up, a full refund will be issued or a rescheduled appointment at no cost.
      - Any disputes must be reported within 24 hours of the appointment.

      8. Customer Conduct
      - We have a zero-tolerance policy for inappropriate or disrespectful behavior.
      - Any violation will result in immediate termination of the session, full charges applied, and potential legal action.

      9. Modification of Terms
      We may update these Terms of Service at any time. The latest version will always be available on our website.

      10. Contact Information
      For any questions regarding these terms, contact us at:
      Email: info@yuhuapp.com
      Website: www.yuhuapp.com
    `,
  },
];

export default function LegalPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveAccordion(hash);
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <Container size="xl" py="xl">
      <Paper shadow="xs" p="md" withBorder>
        <Title order={1} ta="center" mb="xl">
          Legal Information
        </Title>
        <Text ta="center" color="dimmed" mb="xl">
          Welcome to the legal section of Yuhu Wellness. Below you can find our
          legal documents.
        </Text>

        <Grid>
          <Grid.Col span={12}>
            <Accordion
              value={activeAccordion}
              onChange={setActiveAccordion}
              variant="separated"
              radius="md"
            >
              {legalSections.map((section, index) => (
                <Accordion.Item
                  key={index}
                  value={section.title}
                  id={section.title.toLowerCase().replace(/\s+/g, "-")}
                >
                  <Accordion.Control icon={section.icon}>
                    {section.title}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Box style={{ whiteSpace: "pre-wrap" }}>
                      {section.content}
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
