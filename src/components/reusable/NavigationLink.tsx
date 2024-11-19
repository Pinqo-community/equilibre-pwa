import { Link } from "@tanstack/react-router";
import "./navigationLink.css";

interface NavigationLinkProps {
  page: string;
  pageTitle: string;
}

const NavigationLink = ({ page, pageTitle }: NavigationLinkProps) => {
  return (
    <Link
      className="bg-blue-500 px-6 py-4 text-white font-bold rounded-md outline-offset-4 hover:bg-blue-400 transition-all ease-in-out"
      to={page}
    >
      {pageTitle}
    </Link>
  );
};

export default NavigationLink;
