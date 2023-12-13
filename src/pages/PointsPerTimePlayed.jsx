import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "../Main";

export default function PointsPerTimePlayed() {
    const { statistics } = useContext(StatisticsContext);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    useEffect(() => {
        const groupedStats = statistics.reduce((acc, statistic) => {
            let currentTotal = acc[statistic.name];
            if (!currentTotal) {
                currentTotal = {pointsScored: 0, timePlayed: 0};
                acc[statistic.name] = currentTotal;
            }
            currentTotal.pointsScored += statistic.pointsScored;
            currentTotal.timePlayed += statistic.timePlayed;
            return acc;
        }, {})
        console.log(groupedStats)

        const sortedArray = Object.keys(groupedStats)
            .map((name) => ({ name, pointsPerTime: groupedStats[name].pointsScored / groupedStats[name].timePlayed }))
            .toSorted((first, second) => second.pointsPerTime - first.pointsPerTime);
        setSortedStatistics(sortedArray);
    }, [statistics]);




    return (
        <div>
            <h3>Most points per minute played</h3>
            {
            sortedStatistics && sortedStatistics.map((stat, index) => <div key={index}>{stat.name} {(stat.pointsPerTime * 60).toFixed(2)}</div>)
            }
        </div>
    )
}