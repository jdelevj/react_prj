import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { MostPointsScored } from "./pages/MostPointsScored";
import { MostPointsScoredOverall } from "./pages/MostPointsScoredOverall";
import PointsPerTimePlayed from "./pages/PointsPerTimePlayed";
import MostPointsPerTeam from "./pages/MostPointsPerTeam";
import TopScorerPerTeam from "./pages/TopScorerPerTeam";


export const StatisticsContext = createContext({});

export default function Main() {
    const [statistics, setStatistics] = useState([]);
    const statisticsContext= {statistics, setStatistics};
    return (
        <React.StrictMode>
            <StatisticsContext.Provider value={statisticsContext}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="" element={<HomePage />} />
                            <Route path="/most-points-scored" element={<MostPointsScored />} />
                            <Route path="/most-points-scored-overall" element={<MostPointsScoredOverall />} />
                            <Route path="/points-per-time-played" element={<PointsPerTimePlayed />} />
                            <Route path="/most-points-per-team" element={<MostPointsPerTeam />} />
                            <Route path="/top-scorer-per-team" element={<TopScorerPerTeam />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </StatisticsContext.Provider>
        </React.StrictMode>
    )
}