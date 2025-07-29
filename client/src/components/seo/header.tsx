import { Link } from "react-router";

export const Header = () => {
  return (
    <nav>
      <ul className="flex gap-2 bg-amber-200">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
      </ul>
    </nav>
  );
};
