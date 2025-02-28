import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { Todo } from "../../../types/todos";
import { AppDispatch, RootState } from "../../../store/store";
import { Paginate } from "../../../utils/utils";
import { Card } from "../../../components";
import AddTodoModal from "./AddTodoModal";
import { Button } from "antd";
import UpdateTodoModal from "./UpdateTodoModal";
import { deleteTodoApi } from "../../../services/api/todo";
import { signOutUser } from "../../../services/api/auth";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );
  const getTodo = useSelector((state: RootState) => state?.getTodo);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (getTodo?.data?.length > 0) {
      const paginatedData = Paginate(
        getTodo.data,
        pagination.page,
        pagination.limit
      );
      setDatasource(paginatedData);
    } else {
      setDatasource([]);
    }
  }, [getTodo?.data, pagination]);

  const handleDelete = (id: string | undefined) => {
    if (id) deleteTodoApi(dispatch, id);
  };

  return (
    <div>
      {open && <AddTodoModal open={open} onClose={() => setOpen(false)} />}
      {openUpdate && (
        <UpdateTodoModal
          open={openUpdate}
          onClose={() => setOpenUpdate(null)}
        />
      )}
      <div className="!fixed sm:!flex block justify-between items-center !text-center !w-full !top-0 !left-0 bg-white">
        <h1 className="text-2xl ml-3 font-bold mt-2 mb-2 text-gray-700 ">
          Todo List
        </h1>
        <div className="mr-1 flex gap-1 justify-center sm:p-2 p-4">
          <Button onClick={() => setOpen(true)}>Add Todo</Button>
          <Button onClick={() => signOutUser(dispatch)}>Log out</Button>
        </div>
      </div>
      <div className="grid grid-cols-1  sm:!pt-24 pt-16 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {getTodo.loading && (
          <div className="flex justify-center items-center col-span-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500 border-solid"></div>
          </div>
        )}
        {datasource?.length > 0 &&
          !getTodo.loading &&
          datasource?.map((item: Todo) => (
            <div key={item?._id}>
              <Card
                id={item?._id}
                title={item?.title}
                description={item?.description}
                deadline={item?.deadline}
                updateTodo={() => setOpenUpdate(item?._id)}
                deleteTodo={() => handleDelete(item?._id)}
              />
            </div>
          ))}
      </div>
      <div className="fixed right-3 bottom-3">
        <div className="flex justify-end space-x-4 mt-4  ">
          <button
            onClick={() =>
              setPagination((previous: { page: number; limit: number }) => {
                return {
                  ...previous,
                  page: previous.page - 1,
                };
              })
            }
            disabled={pagination.page === 1}
            className={`px-4  py-1 w-[100px] text-white   rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 ${
              pagination.page === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-800 cursor-pointer"
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => {
              setPagination((previous: { page: number; limit: number }) => {
                return {
                  ...previous,
                  page: previous.page + 1,
                };
              });
            }}
            disabled={
              getTodo?.data?.length <= pagination.limit * pagination.page - 1
            }
            className={`px-4 py-1 w-[100px] text-white   rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105  ${
              getTodo?.data?.length <= pagination.limit * pagination.page - 1
                ? "bg-gray-600  cursor-not-allowed"
                : "bg-gray-800 cursor-pointer "
            } `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
