import { createServerSideHelpers } from "@trpc/react-query/server";
import { InferGetStaticPropsType } from "next";
import SuperJSON from "superjson";

import { DashboardCard } from "@/components/dashboards";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dashboards.map((dashboard) => (
          <DashboardCard key={dashboard.name} dashboard={dashboard} />
        ))}
      </div>
    </PageContainer>
  </AppLayout>
);

export default DashboardsPage;

export const getStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const { dashboards } = await helpers.dashboard.get.fetch();

  return {
    props: {
      dashboards,
    },
  };
};
