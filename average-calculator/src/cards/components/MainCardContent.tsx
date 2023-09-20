import React from "react";
import {
  useWidth,
  isWidthDown,
  Typography,
  Button,
} from "@ellucian/react-design-system/core";
import { useCardControl } from "@ellucian/experience-extension-utils";
import { useIntl } from "react-intl";
import { Stack } from "../../components/Stack";
import { ClickableTypography } from "../../components/ClickableTypography";

export function MainCardContent() {
  const { navigateToPage } = useCardControl();
  const intl = useIntl();

  const isMobile: boolean = isWidthDown("md", useWidth());

  return (
    <>
      <Typography variant="body1" sx={{ my: 2, mx: 1 }}>
        {intl.formatMessage({ id: "#card.introText" })}
      </Typography>
      {isMobile ? (
        <Stack
          sx={{ alignItems: "flex-end", gap: 2, mt: 2, flexDirection: "row", mx: 1 }}
        >
          <ClickableTypography
            message="Ir a las asignaturas"
            onClick={() => navigateToPage({ route: "/" })}
            sxProps={{ width: "fit-content" }}
          />
          <span>-</span>
          <ClickableTypography
            message="Ir a PGA"
            onClick={() => navigateToPage({ route: "/pga" })}
            sxProps={{ width: "fit-content" }}
          />
        </Stack>
      ) : (
        <Stack sx={{ pt: 2, pb: 4, gap: 2, mt: 4 }}>
          <Button color="primary" onClick={() => navigateToPage({ route: "/" })}>
            {intl.formatMessage({ id: "#card.goToSubjects" })}
          </Button>
          <Button color="secondary" onClick={() => navigateToPage({ route: "/pga" })}>
            {intl.formatMessage({ id: "#card.goToPGA" })}
          </Button>
        </Stack>
      )}
    </>
  );
}
