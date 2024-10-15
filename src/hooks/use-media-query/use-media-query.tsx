import { useMediaQuery as useMediaQueryMUI } from "@mui/material";

export const useMediaQuery = (selectedMediaQuery: string) => {
    const matches = useMediaQueryMUI(`(min-width: ${selectedMediaQuery})`)
    return matches
}