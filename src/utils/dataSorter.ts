import { GridComparatorFn } from "@mui/x-data-grid";

export const dataGridDataSorter: GridComparatorFn<Date> = (v1, v2) => {
    const date1 = new Date(v1).getTime();
    const date2 = new Date(v2).getTime();
    if (date1 < date2) {
        return -1;
      } if (date1 > date2) {
        return 1;
      } 
        return 0;
}