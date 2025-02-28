import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const Card = ({
  id,
  title,
  deadline,
  description,
  updateTodo,
  deleteTodo,
}: any) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-extralight  mt-2">
            {moment(deadline).format("lll")}
          </p>
          <div className="flex space-x-2">
            <EditOutlined
              className="cursor-pointer text-[20px]"
              onClick={() => updateTodo()}
            />
            <DeleteOutlined
              className="cursor-pointer text-[20px]"
              onClick={() => deleteTodo()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
