import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const pageSize = !searchParams.get("pageSize")
    ? PAGE_SIZE
    : Number(searchParams.get("pageSize"));
  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page, pageSize],
    //Add filter to this array makes React Query refetch data when filter change
    queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / pageSize);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1, pageSize],
      //Add filter to this array makes React Query refetch data when filter change
      queryFn: () => getBookings({ filter, sortBy, page: page + 1, pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1, pageSize],
      //Add filter to this array makes React Query refetch data when filter change
      queryFn: () => getBookings({ filter, sortBy, page: page - 1, pageSize }),
    });

  return { isLoading, error, bookings, count };
}
