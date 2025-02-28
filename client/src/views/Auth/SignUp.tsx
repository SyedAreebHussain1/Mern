import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card } from "antd";
import { signUpApi } from "../../services/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { errorMessage } from "../../utils/message";

type OnFinishType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.user);
  const onFinish = (values: OnFinishType) => {
    if (values.password !== values.confirmPassword) {
      errorMessage("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...body } = values;
    signUpApi(dispatch, body, onSuccess); // Call the signUpApi function
  };

  function onSuccess() {
    navigate("/signin"); //user is successfully signed up, navigate to the sign in page
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card
        title="Sign Up"
        className="w-96 text-center shadow-lg p-2 rounded-lg"
      >
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </Form.Item>
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
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
          >
            <Input.Password
              className="w-full p-2 border rounded"
              placeholder="Confirm your password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
            >
              Sign Up
            </Button>
          </Form.Item>
          {!loading && (
            <Link to={"/"} className="block mt-2 text-blue-500 hover:underline">
              Sign in
            </Link>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
