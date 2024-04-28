import { PageError } from "@/components/layouts";

const Page404 = () => (
  <PageError
    statusCode="4🧐4"
    title="Not Found"
    message={`Page not found. Check the URL or go back to the homepage.`}
    redirectUrl="/"
    redirectText="Home"
  />
);

export default Page404;
