import { NavLink } from "react-router-dom";

export function NavMenu() {
    return ( <div>
                <NavLink to="/">Home Page</NavLink>
                <NavLink to="/most-points-scored">Most Points Scored in a Game</NavLink>
                <NavLink to="/most-points-scored-overall">Most Points Scored in Total</NavLink>
            </div>);
}