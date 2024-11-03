// import css
import './Header.css';

type PageTitleProps = {
    title: string;
    version: number;
  };

function Header({ title, version }: PageTitleProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>Version {version}</p>
    </header>
  );
}

export default Header;
