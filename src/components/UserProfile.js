import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import { Button, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../action/auth.action";
import { configure } from "../config/configure";
import swal from "sweetalert";

export default function UserProfile() {

  const authState = useSelector((state) => state.auth.userinfo);
  console.log("Auth State in Profile => ", authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const Logout = () => {
    localStorage.clear();
    dispatch(updateUserInfo());
    swal({ title: "Logout Successfully!!!", icon: "success" })
    navigate('/login');
  }

  return (
    <>
      <Card
        style={{
          borderRadius: "15px"
        }}
      >
        <Card.Body className="text-center">
          <div className="mt-3 mb-4">
            <Card.Img
              src={configure.IMAGE_BASE_URL + "" + authState.photos}
              className="rounded-circle"
              fluid
              style={{ width: "100px" }}
            />
          </div>
          <MDBTypography tag="h4">{authState.firstName} {authState.lastName}</MDBTypography>
          <Card.Text className="text-muted mb-4">
            {authState.email} <span className="mx-2">|</span>{" "}
            <p  class="text-primary">{authState.role}</p>
          </Card.Text>
          
          <Button rounded size="lg"
            onClick={() => Logout()}
          >
            Log Out
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}