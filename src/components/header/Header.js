import './header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <span className="header__title header__title--color">Marvel</span>{' '}
        information portal
      </h1>
      <ul className="header__list">
        <li className="header__item">
          <p className="header__link active">Characters</p>
        </li>
        <li className="header__item">
          <p className="header__link">Comics</p>
        </li>
      </ul>
    </header>
  );
}

export default Header;
