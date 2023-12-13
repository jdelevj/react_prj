import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "../Main";

export function MostPointsScored() {
    const { statistics } = useContext(StatisticsContext);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    useEffect(() => {
        const sortedArray = statistics.toSorted((first, second) => second.pointsScored - first.pointsScored);
        setSortedStatistics(sortedArray);
    }, [statistics]);
    return ( 
        
        <div>
            <h3>Most Points Scored In A Game</h3>
            {
            sortedStatistics && sortedStatistics.map((stat, index) => <div key={index}>{stat.name} {stat.pointsScored}</div>)
            }
        </div>
    );

}