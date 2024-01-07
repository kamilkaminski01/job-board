import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from 'providers/user/context'
import { PATHS } from 'utils/consts'
import Logo from 'assets/icons/logo.png'
import './style.scss'
import Button from 'components/atoms/Button'
import NavDropdown from 'components/molecules/NavDropdown'

const Navbar = () => {
  const { isLogged } = useContext(UserContext)

  return (
    <nav>
      <Link className="nav__brand" to={PATHS.home}>
        <img src={Logo} alt="logo" />
      </Link>

      {isLogged ? (
        <div className="nav__menu">
          <div className="nav__links">
            <Link to={'#'}>About</Link>
          </div>

          <NavDropdown />
        </div>
      ) : (
        <div className="nav__menu">
          <Link className="nav__link" to={PATHS.login}>
            <Button className="nav__btn">Login</Button>
          </Link>
          <Link className="nav__link" to={PATHS.register}>
            <Button className="nav__btn btn--outline">Register </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
