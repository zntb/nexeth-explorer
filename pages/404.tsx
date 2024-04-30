import { AppLayout, PageError } from "@/components/layouts";

const Page404 = () => (
  <AppLayout>
    <PageError
      statusCode="4🧐4"
      title="Not Found"
      message={`Page not found. Check the URL or go back to the homepage.`}
      redirectUrl="/"
      redirectText="Home"
    />
  </AppLayout>
);

export default Page404;
