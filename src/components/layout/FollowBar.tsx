import { api } from "~/utils/api";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users, isLoading } = api.user.getAll.useQuery();
  if (!users || users?.length === 0) return null;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="hidden px-6 py-4 lg:block">
      <div className="rounded-xl bg-neutral-800 p-4">
        <h2 className="text-xl font-semibold text-white">Who to stalk!</h2>
        <div className="mt-4 flex flex-col gap-6">
          {users.map((user) => (
            <div key={user.id} className="flex gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                  {user.name}
                </span>
                <span className="text-sm text-neutral-400">{`@${user.username}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
