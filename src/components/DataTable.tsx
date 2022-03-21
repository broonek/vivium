import { useCallback, useState } from "react";
import {
  GridRowSpacingParams,
  gridClasses,
  GridValueFormatterParams,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { images } from "../utils/F1Teams";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
const DataTable: React.FC<{ drivers: {}[] }> = ({ drivers }) => {
  const [pageSize, setpageSize] = useState<number>(10);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1.2,
      editable: true,
    },
    {
      field: "position",
      headerName: "Position",
      minWidth: 80,
      flex: 0.8,
      editable: true,
      align: "center",
    },
    {
      field: "constructorName",
      headerName: "Team",
      editable: true,
      width: 80,
      renderCell: (params: GridRenderCellParams<string>) => (
        <img height={"40px"} width={"40px"} src={images[params.value]} />
      ),
    },

    {
      field: "driverNumber",
      headerName: "Driver number",
      minWidth: 80,
      flex: 1,
      editable: true,
      align: "center",
    },
    {
      field: "points",
      headerName: "Points",
      minWidth: 60,
      flex: 1,
      editable: true,
    },
    {
      field: "wins",
      headerName: "Wins",
      minWidth: 60,
      flex: 0.8,
    },
    {
      field: "dateOfBirth",
      headerName: "Birth Date",
      flex: 1.5,
      minWidth: 150,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        return new Date(params.value as string).toLocaleDateString("en-GB");
      },
    },
    {
      field: "nationality",
      headerName: "Country",
      minWidth: 130,
      flex: 1.2,
      editable: true,
    },
  ];
  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 7,
      bottom: params.isLastVisible ? 0 : 7,
    };
  }, []);
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          height: "80vh",
          maxWidth: "1150px",
        }}
      >
        <DataGrid
          getRowSpacing={getRowSpacing}
          rows={drivers}
          rowHeight={60}
          columns={columns}
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          onPageSizeChange={(pageSize: number, details: GridCallbackDetails) =>
            setpageSize(pageSize)
          }
          pageSize={pageSize}
          columnBuffer={0}
          columnThreshold={0}
          disableSelectionOnClick
          disableVirtualization
          disableExtendRowFullWidth
          disableColumnMenu={true}
          sx={{
            [`&`]: { border: "none" },
            [`& .${gridClasses.columnSeparator}`]: {
              display: "none",
            },
            [`& .${gridClasses.columnHeaderTitle}`]: {
              fontWeight: "700",
              color: "#555555",
            },
            [`& .${gridClasses.virtualScrollerRenderZone}`]: {
              marginTop: "10px",
            },
            [`& .${gridClasses.columnHeader}`]: {
              padding: "0 0 0 5px",
            },
            [`& .${gridClasses.columnHeaders}`]: {
              margin: "0 10px 0 10px",
              alignSelf: "center",
              borderBottom: "none",
              fontWeight: "bold",
            },
            [`& .${gridClasses.cell}`]: {
              textAlign: "center",
              paddingRight: "28px",
              width: "0",
              borderBottom: "none",
              borderRight: "none",
              padding: "none",
              paddingLeft: "5px",
            },
            [`& .${gridClasses.row}`]: {
              border: "none",
              borderRadius: "5px",
              width: "calc(100% - 20px)",
              alignSelf: "center",
              boxShadow: "0px 0px 8px 1px rgba(0, 0, 0, 0.33);",
            },
          }}
        />
      </div>
    </>
  );
};

export default DataTable;
