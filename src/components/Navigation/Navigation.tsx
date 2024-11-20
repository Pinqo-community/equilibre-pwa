import NavigationLink from "../reusable/NavigationLink";

const Navigation = () => {
  return (
    <nav className="fixed justify-between w-full bottom-0 pb-4 sm:px-4">
      <ul className="flex gap-4 justify-between w-full">
        <NavigationLink page="/" pageTitle="Index" />
        <NavigationLink page="/mood" pageTitle="Mood" />
        <NavigationLink page="/journal" pageTitle="Journal" />
      </ul>
    </nav>
  );
};

export default Navigation;
