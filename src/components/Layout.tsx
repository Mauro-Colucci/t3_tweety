import { PropsWithChildren } from "react";
import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/Sidebar";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="h-screen bg-black">
      <div className="container mx-auto h-full max-w-6xl xl:px-32">
        <div className="grid h-full grid-cols-4">
          <Sidebar />
          <div className="col-span-3 border-x border-neutral-800 lg:col-span-2">
            {props.children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};
export default Layout;
