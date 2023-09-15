import React from "react";
import {
  useWidth,
  isWidthDown,
  Typography,
  Button,
} from "@ellucian/react-design-system/core";
import { useCardControl } from "@ellucian/experience-extension-utils";
import { Stack } from "../../components/Stack";
import { ClickableTypography } from "../../components/ClickableTypography";

export function MainCardContent() {
  const { navigateToPage } = useCardControl();

  const isMobile: boolean = isWidthDown("md", useWidth());

  return (
    <>
      <Typography variant="body1" sx={{ my: 2, mx: 1 }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore possimus
        laboriosam illo ipsam quia non expedita eveniet dolore totam sint amet, ad
        quaerat nesciunt exercitationem. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptate, doloremque.
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
            Ir a la página principal
          </Button>
          <Button color="secondary" onClick={() => navigateToPage({ route: "/pga" })}>
            Ir a PGA
          </Button>
        </Stack>
      )}
    </>
  );
}
