import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "../Main";

export default function TopScorerPerTeam() {
    const { statistics } = useContext(StatisticsContext);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    useEffect(() => {
        const groupedStatsByPlayer = statistics.reduce((acc, statistic) => {
            let currentTotal = acc[statistic.name];
            if (!currentTotal) {
                currentTotal = {pointsScored: 0, team: statistic.team};
                acc[statistic.name] = currentTotal;
            }
            currentTotal.pointsScored += statistic.pointsScored;
            return acc;
        }, {})

        const groupedStatsByTeam = Object.keys(groupedStatsByPlayer).reduce((acc, name) => {
            const playerData = groupedStatsByPlayer[name]
            let teamData = acc[playerData.team];
            if (!teamData) {
                teamData = {name, pointsScored: playerData.pointsScored}
                acc[playerData.team] = teamData;
            } else if( teamData.pointsScored === playerData.pointsScored) {
                teamData.name += ", " + name;
            } else if(teamData.pointsScored < playerData.pointsScored){
                teamData.name = name;
                teamData.pointsScored = playerData.pointsScored;
            }
                
            return acc;
        }, {})

        const sortedArray = Object.keys(groupedStatsByTeam)
            .map((team) => ({ name: groupedStatsByTeam[team].name, team, pointsScored: groupedStatsByTeam[team].pointsScored }))
            .toSorted((first, second) => second.pointsScored - first.pointsScored);
        setSortedStatistics(sortedArray);
    }, [statistics]);



    return (
        <div>
            <h3>Top scorer per team</h3>
            {
                sortedStatistics && sortedStatistics.map((stat, index) => <div key={index}>{stat.team} {stat.name} {stat.pointsScored}</div>)
            }
        </div>
    )
}