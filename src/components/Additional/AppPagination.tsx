import { Box, Pagination } from "@mui/material";
import { MetaData } from "../../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { CurrentPage, TotalPages } = metaData;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 3 }}
    >
      <Pagination
        color="secondary"
        size="large"
        count={TotalPages}
        page={CurrentPage}
        onChange={(_e, page) => onPageChange(page)}
      />
    </Box>
  );
}
