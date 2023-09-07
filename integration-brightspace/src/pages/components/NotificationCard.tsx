import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Badge,
  Chip,
} from "@ellucian/react-design-system/core";
import { MoreVertical, ExternalLink, Bookmark } from "@ellucian/ds-icons/lib";
import { Notification } from "../../interfaces/Alert";

const isNew = true;
const NotificationCard = ({
  Title,
  OrgUnitId,
  Category,
  Message,
  Id,
  Course,
  AlertDateTime,
}: Notification) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",

      justifyContent: "space-between",
      padding: "20px",
      maxWidth: "70%",
      margin: "0 0 1rem 0",
    }}
  >
    <CardHeader
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {Title} {isNew && <Chip label="Nueva" activated />}
        </div>
      }
      subheader={
        <>
          <Typography variant="body2" color="error">
            {Course?.Name || "General"}
          </Typography>
          <Typography variant="body2" color="meadow600">
            {`${new Date(AlertDateTime).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} a las ${new Date(AlertDateTime).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`}
          </Typography>
        </>
      }
      sx={{ letterSpacing: "0.5px" }}
      // Wrap with container for more than one action
      action={
        <>
          <IconButton color="gray" aria-label="External link">
            <ExternalLink />
          </IconButton>
          <IconButton color="gray" aria-label="Bookmark">
            <Bookmark />
          </IconButton>
        </>
      }
    />

    {/* Set the negateSpacingAll for CardConent here */}
    <CardContent spacingOptions={{ negateSpacingAll: false }}>
      <div>
        <Typography variant="h3" color="textSecondary">
          {Message}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default NotificationCard;
