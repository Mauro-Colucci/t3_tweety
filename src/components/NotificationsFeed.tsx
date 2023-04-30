import { api } from "~/utils/api";
import { GiRaven } from "react-icons/gi";

const NotificationsFeed = () => {
  const ctx = api.useContext();

  const { data } = api.notification.get.useQuery(undefined, {
    onSuccess: () => {
      ctx.user.getCurrent.invalidate();
    },
  });

  if (data?.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data?.map((notification) => (
        <div
          className="flex items-center gap-4 border-b border-neutral-800 p-6"
          key={notification.id}
        >
          <GiRaven color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};
export default NotificationsFeed;
