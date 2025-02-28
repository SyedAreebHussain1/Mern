import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, DatePicker } from "antd";

import moment from "moment";
import { getTodoApi, postTodoApi } from "../../../services/api/todo";
import { AppDispatch, RootState } from "../../../store/store";

interface AddTodoModalProps {
  open?: any | undefined;
  onClose: any;
}

type OnFinishType = {
  title: string;
  deadline: string;
  description: string;
};

const { TextArea } = Input;

const AddTodoModal = ({ open, onClose }: AddTodoModalProps) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const postTodo = useSelector((state: RootState) => state?.postTodo);

  const onFinish = (values: OnFinishType) => {
    const dateFromDB = moment(values.deadline);
    const body = {
      ...values,
      deadline: dateFromDB.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };
    postTodoApi(dispatch, body, onSuccess);
  };
  function onSuccess() {
    onClose();
    getTodoApi(dispatch);
  }
  return (
    <Modal
      title={"Add Todo"}
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
            type="primary"
            htmlType="submit"
            loading={postTodo.loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
