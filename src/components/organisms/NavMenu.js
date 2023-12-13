import { NavLink } from "react-router-dom";

export function NavMenu() {
    return ( <div>
                <NavLink to="/">Home Page</NavLink>
                <NavLink to="/most-points-scored">Most Points Scored in a Game</NavLink>
                <NavLink to="/most-points-scored-overall">Most Points Scored in Total</NavLink>
                <NavLink to="/points-per-time-played">Most Points Per Time Played</NavLink>
                <NavLink to="/most-points-per-team">Most Points Scored By Team</NavLink>
                <NavLink to="/top-scorer-per-team">Top Scorer Per Team</NavLink>
            </div>);
}



