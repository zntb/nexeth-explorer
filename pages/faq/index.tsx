import { FAQ } from "@/components/faq";
import { AppLayout, PageContainer } from "@/components/layouts";

const FaqPage = () => (
  <AppLayout>
    <PageContainer
      title="FAQ"
      description="Frequently asked questions about our app."
      breadcrumbs={[{ name: "FAQ", href: "/faq" }]}
    >
      <FAQ />
    </PageContainer>
  </AppLayout>
);

export default FaqPage;
