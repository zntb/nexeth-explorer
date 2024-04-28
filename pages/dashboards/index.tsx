import { createServerSideHelpers } from "@trpc/react-query/server";
import { InferGetStaticPropsType } from "next";
import SuperJSON from "superjson";

import { DashboardSearch } from "@/components/dashboards/dashboard-search";
import { AppLayout, PageContainer } from "@/components/layouts";
import { appRouter } from "@/server/routers/router";

const DashboardsPage = ({
  dashboards,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      className="pb-8"
      title="Dashboards"
      description="All of your favourite Ethereum Dashboards in one place. Thanks to Superphiz for getting this started!"
      breadcrumbs={[{ name: "Dashboards", href: "/dashboards" }]}
    >
      <DashboardSearch dashboards={dashboards} />
    </PageContainer>
  </AppLayout>
);

export default DashboardsPage;

export const getStaticProps = async () => {
  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const { dashboards } = await router.dashboard.get.fetch();

  return {
    props: {
      dashboards,
    },
  };
};
