import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "../Main";

export function MostPointsScoredOverall() {
    const { statistics } = useContext(StatisticsContext);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    useEffect(() => {
        const groupedStats = statistics.reduce((acc, statistic) => {
            const currentTotal = acc[statistic.name];
            acc[statistic.name] = (currentTotal ? currentTotal : 0) + statistic.pointsScored;
            return acc;
        }, {})
        console.log(groupedStats)

        const sortedArray = Object.keys(groupedStats).map((name) => ({ name, pointsScored: groupedStats[name] })).toSorted((first, second) => second.pointsScored - first.pointsScored);
        setSortedStatistics(sortedArray);
    }, [statistics]);

    return (<div>Most Points Scored Total
        {
            sortedStatistics && sortedStatistics.map((stat, index) => <div key={index}>{stat.name} {stat.pointsScored}</div>)
        }
    </div>);
}

