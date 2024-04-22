import { Badge } from "components/common";
import { Button, Table } from "components/common/forms";
import Pagination from "components/common/forms/Pagination";
import {
  CustomizedTabs,
  Layout,
  LoadingWrapper,
  PageTitle,
} from "components/common/layouts";
import { CompleteIcon, DownloadIcon, UndoIcon } from "components/icons";
import NoOrder from "components/order/NoOrder";
import { DEFAULT_PAGINATED_LIST_REQUEST } from "constants/common";
import { PAGE_PATHS } from "constants/page-paths";
import { OrderStatus } from "enums/order-enum";
import { useError, useHttpMutationService, useHttpQueryService } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { GetPaginatedListResponse } from "responses/common";
import { OrderItem } from "responses/order-response";
import OrderService from "services/order.service";
import {
  GetPaginatedOrderListRequest,
  UpdateOrderStatusRequest,
} from "types/order.type";
import { toastSuccess } from "utils/toast";

const OrderList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [paginatedListRequest, setPaginatedListRequest] =
    useState<GetPaginatedOrderListRequest>({
      ...DEFAULT_PAGINATED_LIST_REQUEST,
      status: OrderStatus.TO_DO,
    });

  const {
    result: paginatedList,
    isLoading,
    refetch,
    error,
  } = useHttpQueryService<GetPaginatedListResponse<OrderItem>>({
    request: undefined,
  });

  const { mutate } = useHttpMutationService({
    request: (request?: UpdateOrderStatusRequest) =>
      OrderService.updateStatus(request!),
  });

  useError(error, true);

  useEffect(() => {
    let currentOrderStatus: OrderStatus = OrderStatus.TO_DO;
    if (tabIndex === 1) {
      currentOrderStatus = OrderStatus.PRODUCT_COMPLETED;
    } else if (tabIndex === 2) {
      currentOrderStatus = OrderStatus.DONE;
    }
    setPaginatedListRequest({
      ...paginatedListRequest,
      currentPage: 1,
      status: currentOrderStatus,
    });
  }, [tabIndex]);

  const fetchOrders = () => {
    refetch(() => OrderService.getList(paginatedListRequest));
  };
  useEffect(() => {
    fetchOrders();
  }, [paginatedListRequest]);

  const handleUpdateStatus = (orderItem: OrderItem) => {
    let updatedStatus: OrderStatus;
    if (orderItem.orderStatus === OrderStatus.TO_DO) {
      updatedStatus = OrderStatus.PRODUCT_COMPLETED;
    } else if (orderItem.orderStatus === OrderStatus.PRODUCT_COMPLETED) {
      updatedStatus = OrderStatus.DONE;
    } else {
      return;
    }

    updateStatus(orderItem.id, updatedStatus);
  };

  const updateStatus = async (id: number, updatedStatus: OrderStatus) => {
    const response = await mutate({
      id,
      status: updatedStatus,
    });

    if (response) {
      toastSuccess("Update order successfully!");
      fetchOrders();
    }
  };

  const handleBackToTodo = async (orderItem: OrderItem) => {
    if (orderItem.orderStatus === OrderStatus.PRODUCT_COMPLETED) {
      updateStatus(orderItem.id, OrderStatus.TO_DO);
    }
  };
  const columns: Column<OrderItem>[] = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        id: "id",
        width: 10,
      },
      {
        Header: "Detail",
        id: "detail",
        Cell: ({ row }: { row: { original: OrderItem } }) => (
          <div className="flex flex-col gap-4">
            {row.original.details.map((detail) => {
              return (
                <div className="flex" key={detail.id}>
                  <img
                    className="w-[100px] h-[100px]"
                    src={detail.photos[0]}
                    alt=""
                  />
                  <div className="ml-4 flex flex-col justify-between ">
                    <Link
                      to={`${PAGE_PATHS.KEYCAP_VIEW.replace(
                        ":id",
                        detail.keycapId.toString()
                      )}`}
                    >
                      <p className="body-16-semibold text-neutral-200">
                        {detail.name}
                      </p>
                    </Link>

                    <p className="flex">
                      <span className="font-bold">Style: </span>
                      <span className="ml-1">
                        {detail.profile} {detail.size}U
                      </span>

                      {detail.fileUrl && (
                        <Link to={detail.fileUrl} className="ml-4">
                          <DownloadIcon className="w-[20x] h-[20px] text-neutral-100" />
                        </Link>
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Quantity: </span>
                      <span>{detail.quantity}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ),
        width: "max-content",
      },
      {
        Header: "Status",
        id: "status",
        Cell: ({ row }: { row: { original: OrderItem } }) => (
          <Badge
            label={row.original.orderStatus}
            size="medium"
            variant="warning"
          />
        ),
        width: 20,
      },
      {
        Header: () => null,
        id: "buttons",
        Cell: ({ row }: { row: { original: OrderItem } }) => (
          <div className="flex items-center justify-end gap-4 cursor-pointer">
            {row.original.orderStatus === OrderStatus.PRODUCT_COMPLETED && (
              <UndoIcon
                onClick={() => handleBackToTodo(row.original)}
                className="w-[24px] h-[24px] text-neutral-100"
              />
            )}

            {row.original.orderStatus !== OrderStatus.DONE && (
              <CompleteIcon
                onClick={() => handleUpdateStatus(row.original)}
                className="w-[24px] h-[24px] text-neutral-100 cursor-pointer"
              />
            )}
          </div>
        ),
        width: "max-content",
      },
    ],
    []
  );

  const paginationOnChange = (currentPage: number, itemsPerPage: number) => {
    setPaginatedListRequest({
      ...paginatedListRequest,
      currentPage,
      itemsPerPage,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between mb-10">
        <PageTitle>Order</PageTitle>
        <Link to={"create"}>
          <Button label="Create a new order" />
        </Link>
      </div>
      <CustomizedTabs
        titles={["To Do", "Product Completed", "Done"]}
        panels={[<></>, <></>, <></>]}
        tabIndex={tabIndex}
        onSelect={setTabIndex}
      />
      <LoadingWrapper isLoading={isLoading}>
        {paginatedList && paginatedList.items.length > 0 ? (
          <>
            <Pagination
              className="mb-4"
              itemsPerPage={paginatedList.itemsPerPage}
              totalPages={paginatedList.totalPages}
              currentPage={paginatedList.currentPage}
              onChange={paginationOnChange}
            />
            <Table columns={columns} data={paginatedList.items} />
          </>
        ) : (
          <NoOrder />
        )}

      </LoadingWrapper>
    </Layout>
  );
};

export default OrderList;
