import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@ellucian/react-design-system/core";
import { SearchResult } from "../../core/entities/SearchResult";
import { mapUrlToTitle } from "../../core/domain-logic/search-service";

type ResultsListProps = {
  results: SearchResult[];
  classes: {
    card: string;
    chip: string;
    container: string;
  };
};

const ResultsList: React.FC<ResultsListProps> = ({ results, classes }) => (
  <div className="results">
    {results.map((result: SearchResult) => (
      <div className={classes.container}>
        <Card className={classes.card} accent="secondary">
          <CardHeader
            title={
              <>
                <Typography variant="h4">{result.title}</Typography>
                <p className={classes.chip}>{mapUrlToTitle(result.url)}</p>
              </>
            }
          />
          <CardContent>
            {React.createElement("div", {
              dangerouslySetInnerHTML: { __html: result.body },
            })}
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
);

export default ResultsList;
