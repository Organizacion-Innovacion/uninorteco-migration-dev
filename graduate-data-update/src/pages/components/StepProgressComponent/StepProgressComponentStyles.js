import { spacing40, spacing50 } from "@ellucian/react-design-system/core/styles/tokens";


export const stylesStepProgress = (theme) => ({
  sectionHeaders: {
    paddingTop: theme.spacing(7.5),
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: spacing40,
  },
  stepProgressContent: {
    marginTop: spacing40,
    marginBottom: spacing40,
  },
  stepProgressContentContainer: {
    padding: `0 ${spacing50} ${spacing50}`,
  },
});
