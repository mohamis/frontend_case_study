import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Tfoot,
  TableContainer,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  HStack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import ChartComponent from "./Chart";

// NOTE TO HOMA developers: Most of the logic and code on this file
// was supplied by (Chakra UI) based of https://chakra-ui.com/getting-started/with-react-table
// I followed it to build a sortable data table with Chakra UI's table components, and the React Table library.

export type DataTableProps<Geoname extends object> = {
  data: Geoname[];
  columns: ColumnDef<Geoname, any>[];
  total: number;
};

export interface Population {
  name: string;
  y: number;
}

export function DataTable<Geoname extends object>({
  data,
  columns,
  total,
}: DataTableProps<Geoname>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [population, setPopulation] = React.useState(0);
  const [area, setArea] = React.useState(0);
  const [size, setSize] = React.useState(5);

  const computeSum = (arr: { [x: string]: any }[], totalFieldName: string) => {
    const { length } = arr;
    let count = 0;
    for (let i = 0; i < length; i += 1) {
      count += Number(
        typeof arr[i][totalFieldName] === "object"
          ? arr[i][totalFieldName].name
          : arr[i][totalFieldName] || 0
      );
    }
    return count;
  };

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  React.useEffect(() => {
    if (data) {
      setPopulation(
        computeSum(
          data.slice(0, table.getState().pagination.pageSize),
          "population"
        )
      );
      setArea(
        computeSum(
          data.slice(0, table.getState().pagination.pageSize),
          "areaInSqKm"
        )
      );
    }
    table.setPageSize(Number(size));
  }, [data, table.getState().pagination.pageSize]);

  let myArray: Population[] = [];
  data.slice(0, size).map((header) => {
    var per: number = 0;
    function addNumbers(a: number, b: number, c: number) {
      return (a / b) * c;
    }
    // @ts-ignore: Unreachable code error
    per += addNumbers(+header?.population, population, 100);
    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
    // @ts-ignore: Unreachable code error
    return myArray.push({ name: header.countryName, y: +per.toFixed(1) });
  });
  const options = {
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>",
        },
      },
    },
    chart: {
      type: "pie",
    },
    series: [
      {
        data: myArray,
      },
    ],
  };

  return (
    <>
      <TableContainer>
        <HStack>
          <Box pt={5} pb={5}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Max Results
              </MenuButton>
              <MenuList>
                <MenuOptionGroup title="Show">
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                      setSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 15, 20, 200].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
        </HStack>

        <Table variant="striped" colorScheme="green">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td key={cell.id} isNumeric={meta?.isNumeric}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total %? (population)</Th>
              <Th isNumeric>
                <span>
                  <strong>{100}</strong>
                </span>
              </Th>
            </Tr>
            <Tr>
              <Th>Total view (area)</Th>
              <Th isNumeric>
                <span>
                  <strong>{area.toFixed(0)}</strong>
                </span>
              </Th>
            </Tr>
            <Tr>
              <Th>Total view (population)</Th>
              <Th isNumeric>
                <span>
                  <strong>{population.toFixed(0)}</strong>
                </span>
              </Th>
            </Tr>
            <Tr>
              <Th>Total json (population)</Th>
              <Th isNumeric>
                <span>
                  <strong>{total.toFixed(0)}</strong>
                </span>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <ChartComponent
        // isNumeric={meta?.isNumeric}
        options={options}
      />
    </>
  );
}
