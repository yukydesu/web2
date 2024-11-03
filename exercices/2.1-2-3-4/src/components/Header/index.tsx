import "./Header.css";

type PageTitleProps = {
  title: string;
  version: number;
};

const pageTitle: PageTitleProps = {
  title: "Informations sur les films dans les cinémas",
  version: 0 + 1,
};

const Header = () => {
  return (
    <header className="header">
      <h1>{pageTitle.title}</h1>
      <h4>Version: {pageTitle.version}</h4>
    </header>
  );
};

export default Header;
