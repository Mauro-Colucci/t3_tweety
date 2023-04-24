const FollowBar = () => {
  return (
    <div className="hidden px-6 py-4 lg:block">
      <div className="rounded-xl bg-neutral-800 p-4">
        <h2 className="text-xl font-semibold text-white">Who to stalk!</h2>
        <div className="mt-4 flex flex-col gap-6">{/* todo user list */}</div>
      </div>
    </div>
  );
};
export default FollowBar;
