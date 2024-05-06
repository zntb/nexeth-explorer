import { BuiltBy, Disclaimer, Hero, Partners } from "@/components/landing";
import { AppLayout, PageContainer } from "@/components/layouts";

const HomePage = () => (
  <AppLayout>
    <PageContainer showBreadcrumbs={false} className="gap-8 pt-[100px]">
      <Hero />
      <Partners />
      <BuiltBy />
      <Disclaimer />
    </PageContainer>
  </AppLayout>
);

export default HomePage;
