import { useMemo } from "react";

export function useUniqueYears(listData: Array<{ date: string }>) {
  return useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        label: year,
        value: year,
      };
    });
  }, [listData]);
}
