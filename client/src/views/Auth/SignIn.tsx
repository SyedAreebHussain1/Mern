import { Form, Input, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { signInApi } from "../../services/api/auth";

type OnFinishType = { email: string; password: string };

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const onFinish = (values: OnFinishType) => {
    signInApi(dispatch, values); // Call the signInApi function
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card
        title="Sign In"
        className="w-96 text-center shadow-lg p-6 rounded-lg"
      >
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        {!loading && (
          <Link
            to={"/signup"}
            className="block mt-2 text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        )}
      </Card>
    </div>
  );
};

export default SignIn;
