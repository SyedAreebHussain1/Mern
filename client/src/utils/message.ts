import { notification } from "antd";
//success message
export const successMessage = (data: string) => {
  notification.success({
    message: "Success",
    description: data,
    duration: 5,
  });
};
//error message
export const errorMessage = (data: string) => {
  notification.error({
    message: "Error",
    description: data,
    duration: 5,
  });
};

//info message
export const infoMessage = (data: string) => {
  notification.info({
    message: "Information",
    description: data,
    duration: 5,
  });
};
