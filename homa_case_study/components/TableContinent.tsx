import { Geoname, GeonamesRootObject } from "../utils/GeonameInterface";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import ChartComponent from "./Chart";

type LazyProps = {
  data: GeonamesRootObject;
  continent: string;
  metrics: string;
  total: number;
};

export default function TableContinent(props: LazyProps) {
  const { data, continent, total, metrics } = props;

  const columnHelper = createColumnHelper<Geoname>();

  const columns =
    metrics === "population" || metrics === "ALL"
      ? [
          columnHelper.accessor("continentName", {
            cell: (info) => info.getValue(),
            header: "Continent Name",
          }),
          columnHelper.accessor("countryName", {
            cell: (info) => info.getValue(),
            header: "Country Name",
          }),
          columnHelper.accessor("areaInSqKm", {
            cell: (info) => info.getValue(),
            header: "Area in Square KM",
            meta: {
              isNumeric: true,
            },
          }),
          columnHelper.accessor("population", {
            cell: (info) => info.getValue(),
            header: "Population",
            meta: {
              isNumeric: true,
            },
          }),
        ]
      : [
          columnHelper.accessor("continentName", {
            cell: (info) => info.getValue(),
            header: "Continent Name",
          }),
          columnHelper.accessor("countryName", {
            cell: (info) => info.getValue(),
            header: "Country Name",
          }),
          columnHelper.accessor("areaInSqKm", {
            cell: (info) => info.getValue(),
            header: "Area in Square KM",
            meta: {
              isNumeric: true,
            },
          }),
        ];

  return (
    <>
      <DataTable columns={columns} data={data.geonames} total={total} />
    </>
  );
}
