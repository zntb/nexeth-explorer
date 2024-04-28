import { Hero } from "@/components/landing";
import { AppLayout, PageContainer } from "@/components/layouts";

const HomePage = () => (
  <AppLayout>
    <PageContainer showBreadcrumbs={false}>
      <Hero />
    </PageContainer>
  </AppLayout>
);

export default HomePage;
