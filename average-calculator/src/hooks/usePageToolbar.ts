import { useHistory } from "react-router-dom";
import { usePageControl } from "@ellucian/experience-extension-utils";

export interface PrimaryCommand {
  icon: string;
  label: string;
  callback: () => void;
}

export interface MenuCommand {
  label: string;
  callback: () => void;
  hintText: string;
}

export interface UsePageToolbarHook {
  primaryCommands?: PrimaryCommand[];
  menuCommands?: MenuCommand[];
}

export function usePageToolbar(
  { primaryCommands = [], menuCommands = [] }: UsePageToolbarHook = {
    primaryCommands: [],
    menuCommands: [],
  }
) {
  const { setPageToolbar } = usePageControl();

  const history = useHistory();

  setPageToolbar({
    primaryCommands: [
      {
        icon: "arrow-left",
        label: "Regresar a las asignaturas",
        callback: () => {
          history.push("/");
        },
      },
      {
        icon: "graduation",
        label: "PGA",
        callback: () => {
          history.push("/pga");
        },
      },
      ...primaryCommands,
    ],
    menuCommands,
  });
}
