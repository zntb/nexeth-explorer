import { AppLayout, PageError } from "@/components/layouts";

const Page500 = () => (
  <AppLayout>
    <PageError
      statusCode="5🫠0"
      title="Critical Error"
      message={`An unexpected error occurred. Please try again later or contact support.`}
      redirectUrl="/"
      redirectText="Home"
    />
  </AppLayout>
);

export default Page500;
