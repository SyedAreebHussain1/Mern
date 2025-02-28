import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, DatePicker } from "antd";
import { AppDispatch, RootState } from "../../../store/store";
import { getTodoApi, updateTodoApi } from "../../../services/api/todo";

interface AddTodoModalProps {
  open?: any | undefined;
  onClose?: any;
}

type OnFinishType = {
  title: string;
  deadline: string;
  description: string;
};

const { TextArea } = Input;

const UpdateTodoModal = ({ open, onClose }: AddTodoModalProps) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const updateTodo = useSelector((state: RootState) => state?.updateTodo);

  const getTodo = useSelector((state: RootState) => state?.getTodo);

  useEffect(() => {
    if (open) {
      //filter the todo by id
      const filterById = getTodo?.data?.filter(
        (item: any) => item._id === open
      )?.[0];
      form.setFieldsValue({
        title: filterById.title,
        deadline: filterById.deadline ? moment(filterById.deadline) : null,
        description: filterById.description,
      });
    }
  }, [open]);
  const onFinish = (values: OnFinishType) => {
    if (open) {
      const body: {
        title: string;
        deadline: string | null;
        description: string;
      } = {
        ...values,
        deadline: values.deadline
          ? moment(values.deadline).format("YYYY-MM-DD HH:mm:ss") //"2025-02-28 14:30:45"
          : null,
      };
      updateTodoApi(dispatch, body, open, onSuccess); // Call the updateTodoApi function
    }
  };
  function onSuccess() {
    onClose();
    getTodoApi(dispatch); //success, get the updated todo list
  }
  return (
    <Modal
      title={"Update Todo"}
      centered
      width={"500px"}
      footer={null}
      open={open ? true : false}
      onCancel={onClose}
    >
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a title!",
            },
          ]}
        >
          <Input
            className="w-full p-2 border rounded"
            placeholder="Enter your title"
          />
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: "Please select a deadline!" }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <TextArea
            maxLength={1000}
            placeholder="disable resize"
            style={{ height: 100, resize: "none" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={updateTodo.loading}
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTodoModal;
