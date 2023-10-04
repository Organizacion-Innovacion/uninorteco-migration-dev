import { arrayCategorias, categoria } from "./const";

export const sendEmail = (
  fName: string,
  sName: string,
  optionCategoria: string,
  segundaCategoria: string,
  textArea:string,
) => {
  const fullName: string = `${fName} ${sName}`;
  const domainEmail: string = "@uninorte.edu.co";
  let toEmail: string | string[] = `csu${domainEmail}`;
  let toEmailCC: string[] = [
    `arellanaa${domainEmail}`,
    `ldmonten${domainEmail}`,
    `cduarte${domainEmail}`,
  ];

  if (optionCategoria !== "") {
    let categoria: string = optionCategoria;
    if (
      optionCategoria === arrayCategorias[2] ||
      optionCategoria === arrayCategorias[5]
    ) {
      toEmail = [
        `jcbernal${domainEmail}`,
        `agalera${domainEmail}`,
        `ppina${domainEmail}`,
        `ogeronimo${domainEmail}`,
        `lcnino${domainEmail}`,
        `csu${domainEmail}`,
        `coordinadormttolab${domainEmail}`,
      ];
      toEmailCC = [
        `arellanaa${domainEmail}`,
        `ldmonten${domainEmail}`,
        `cduarte${domainEmail}`,
      ];
    }
  }

  let email_subject = `REPORTE DESDE UNINORTE.CO - ${categoria}`;
  let mensaje ="<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> ";

  if (optionCategoria !== "") {
    mensaje += `${segundaCategoria}<br/>`;
  }else{
    mensaje += "<strong>SIN CATEGORÍA</strong><br/>";
  }
  mensaje += "<br/>";

  if (textArea!=="") {
    
  }


};
