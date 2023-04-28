import { type NextPage } from "next";
import Form from "~/components/Form";
import Header from "~/components/Header";
import PostFeed from "~/components/posts/PostFeed";

const Home: NextPage = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What the truck is going on with you?" />
      <PostFeed />
    </>
  );
};

export default Home;
