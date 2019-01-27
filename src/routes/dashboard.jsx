import RegularForms from "../views/Forms/RegularForms"
import GridOn from "@material-ui/icons/GridOn";

export function createDashRoutes(tableArray){
  let dashRoutes = [];
  tableArray.forEach((table, i) => {
    let tableRoute = {
      collapse: true,
      name: "",
      icon: GridOn,
      views: [
      ]
    };
    tableRoute.path = `/${table.name}`;
    tableRoute.name = table.name;
    table.forms.forEach((form, i) => {
      var formRoute = {
        mini: "RF",
        component: RegularForms,
        icon: "content_paste"
      }
      formRoute['path'] = tableRoute.path + `/${form.name}`;
      formRoute['name'] = form.name;
      tableRoute.views.push(formRoute);
    });
    dashRoutes.push(tableRoute);
  });
  return dashRoutes
}

