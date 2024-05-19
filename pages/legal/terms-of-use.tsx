import Markdown from "react-markdown";

import { AppLayout, PageContainer } from "@/components/layouts";

const TermsOfUsePage = () => (
  <AppLayout>
    <PageContainer
      title="Terms of Use"
      description="Last updated May 19, 2024"
      breadcrumbs={[{ name: "Terms of Use", href: "/legal/terms-of-use" }]}
    >
      <Markdown>{policy}</Markdown>
    </PageContainer>
  </AppLayout>
);

export default TermsOfUsePage;

const policy = `
Welcome to Nexeth Explorer ("we," "our," "us"). By using our website (explorer.nexeth.xyz), you agree to comply with and be bound by the following terms and conditions.

### 1. User Eligibility

There are no age restrictions for using Nexeth Explorer. Users of all ages are welcome.

### 2. User Responsibilities

Users are permitted to browse the site and view data. Users must not engage in any activities that disrupt the website or violate any laws.

### 3. Accuracy of Data

We provide data sourced from third-party APIs, including Alchemy, Thirdweb, and BlockScout. While we strive for accuracy, we are dependent on the data provided by these services and cannot guarantee its accuracy.

### 4. Limitation of Liability

Nexeth Explorer shall not be liable for any inaccuracies or errors in the data displayed on the site. Users use the site at their own risk.

### 5. Changes to Terms

We reserve the right to update these terms at any time. Changes will be posted on this page with an updated effective date.

### 6. Governing Law

These terms are governed by the laws of Australia.

### 7. Contact Us

For any inquiries related to these terms, please contact us at: nexeth@proton.me

`;
