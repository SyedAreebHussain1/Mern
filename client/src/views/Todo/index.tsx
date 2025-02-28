import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { PageContainer } from "../../utils/helpers/PageContainer/PageContainer";
import TodoList from "./helpers/TodoList";
import { getTodoApi } from "../../services/api/todo";

const Todo = () => {
  const dispatch: AppDispatch = useDispatch();
  const deleteTodo = useSelector((state: RootState) => state?.deleteTodo);

  useEffect(() => {
    getTodoApi(dispatch); // Call the getTodoApi function
  }, [deleteTodo.data]);

  return (
    <React.Fragment>
      <PageContainer>
        <TodoList />
      </PageContainer>
    </React.Fragment>
  );
};

export default Todo;
