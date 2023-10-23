import './header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <span className="header__title header__title--color">Marvel</span>{' '}
        information portal
      </h1>
      <ul className="header__list">
        <li className="header__item active">Characters</li>
        <li className="header__item">Comics</li>

        {/* <li className="header__item">
          // eslint-disable-next-line
          <a className="header__link active" href="#">
            Characters
          </a>
        </li>
        <li className="header__item">
          // eslint-disable-next-line
          <a className="header__link" href="#">
            Comics
          </a>
        </li> */}
      </ul>
    </header>
  );
}

export default Header;
