import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "../Main";

export default function MostPointsPerTeam() {
    const { statistics } = useContext(StatisticsContext);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    useEffect(() => {
        const groupedStats = statistics.reduce((acc, statistic) => {
            const currentTotal = acc[statistic.team];
            acc[statistic.team] = (currentTotal ? currentTotal : 0) + statistic.pointsScored;
            return acc;
        }, {})
        console.log(groupedStats)

        const sortedArray = Object.keys(groupedStats).map((team) => ({ team, pointsScored: groupedStats[team] })).toSorted((first, second) => second.pointsScored - first.pointsScored);
        setSortedStatistics(sortedArray);
    }, [statistics]);




    return (
        <div>
            <h3>Most points scored by team</h3>
            {
                sortedStatistics && sortedStatistics.map((stat, index) => <div key={index}>{stat.team} {stat.pointsScored}</div>)
            }
        </div>
    )
}