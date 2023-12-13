import { useContext, useState } from "react";
import { StatisticsContext } from "../../Main";

export function FileBrowser() {
    const { setStatistics } = useContext(StatisticsContext);
    const [errors, setErrors] = useState([]);
    let parsingErrors = [];
    function handleFileBrowse(event) {
        parsingErrors = [];
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (progressEvent) => {
            let performanceStats = [];
            const result = progressEvent.target.result;
            if (result) {
                const lines = result.split(/\r\n|\r|\n/);
                lines.forEach((line, index) => {
                    if (line.trim()) {
                        performanceStats.push(convertStringToPlayerPeformance(line, index + 1));
                    }

                });
                console.log(performanceStats, parsingErrors);

                setStatistics(performanceStats);

            } else {
                parsingErrors.push('Empty file loaded');
            }
            setErrors(parsingErrors);
        }

    }

    function convertStringToPlayerPeformance(performanceString, lineNumber) {
        const tokens = performanceString.split(',');
        if (tokens.length !== 6) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong number of columns`);
            return;
        }
        const name = tokens[0].trim();
        if (name.length === 0) {
            parsingErrors.push(`Error at line ${lineNumber}: empty name field`);
            return;
        } else if (!name.match(/^[a-z A-Z']+$/)) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong name field`);
            return;
        }

        const team = tokens[1].trim();
        if (team.length === 0) {
            parsingErrors.push(`Error at line ${lineNumber}: empty team field`);
            return;
        }

        const timePlayed = parseInt(tokens[2], 10);
        if (!Number.isInteger(+tokens[2].trim()) || timePlayed <= 0) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong Time Played field`);
            return;
        }

        const pointsScored = parseInt(tokens[3], 10);
        if (!Number.isInteger(+tokens[3].trim()) || pointsScored <= 0) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong Points field`);
            return;
        }

        const rebounds = parseInt(tokens[4], 10);
        if (!Number.isInteger(+tokens[4].trim()) || rebounds <= 0) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong Rebounds field`);
            return;
        }

        const assists = parseInt(tokens[5], 10);
        if (!Number.isInteger(+tokens[5].trim()) || assists <= 0) {
            parsingErrors.push(`Error at line ${lineNumber}: wrong Assists field`);
            return;

        }

        return {
            name, team, timePlayed, pointsScored, rebounds, assists,
        };

    }



    return (
        <div>
            <input type="file" onChange={handleFileBrowse} />
            {errors.map((error, index) => <div key={index}>{error}</div>)}
        </div>

    )
}


