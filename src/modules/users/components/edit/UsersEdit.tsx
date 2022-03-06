import {
  Alert,
  notification,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { editUser, selectUsers } from "../..";
import { useAppDispatch, useAppSelector } from "../../../../common";
import { UserForm } from "../form";

export const UsersEdit = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userID = new URLSearchParams(search).get("id");
  const { data } = useAppSelector(selectUsers);
  const user = data.find((item) => item.id === Number(userID));

  if (!user) {
    return <Alert type="error" message={"user does not exist"} />;
  }

  const handleSubmit = (values: any) => {
    dispatch(editUser({ ...values, id: user.id }));
    notification.open({
      message: "User edited successfully",
      type: "success",
    });
    navigate("/users");
  };

  return (
    <UserForm
      formSubmit={handleSubmit}
      title={`Edit User with ID ${user.id}`}
    />
  );
};
