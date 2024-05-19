import Markdown from "react-markdown";

import { AppLayout, PageContainer } from "@/components/layouts";

const PrivacyPolicyPage = () => (
  <AppLayout>
    <PageContainer
      title="Privacy Policy"
      description="Last updated May 19, 2024"
      breadcrumbs={[{ name: "Privacy Policy", href: "/legal/privacy-policy" }]}
    >
      <Markdown>{policy}</Markdown>
    </PageContainer>
  </AppLayout>
);

export default PrivacyPolicyPage;

const policy = `
Nexeth Explorer ("we," "our," "us") values your privacy. This Privacy Policy outlines how we handle your information when you use our website (explorer.nexeth.xyz).

### 1. Data Collection

We do not collect personal data from users as our site does not require login or personal information for access.

### 2. Use of Data

We use analytics to understand page view counts and site usage. This is done through Vercel Analytics. No personal data is collected through this process.

### 3. Data Security

We take reasonable measures to protect the data we collect through analytics from unauthorized access or disclosure.

### 4. Cookies

We may use cookies or similar technologies to enhance your browsing experience and gather analytics data.

### 5. Children's Privacy

Nexeth Explorer is accessible to users of all ages. We do not knowingly collect personal data from children.

### 6. Changes to this Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.

### 7. Contact Us

For any privacy-related inquiries, please contact us at: nexeth@proton.me

`;
