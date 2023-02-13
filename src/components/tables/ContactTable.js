import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

import deleteAxios from "services/deleteAxios ";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import useLocalStorage from "hooks/useLocalStorage";
import { setContact } from "redux/contactSlice";

export const ContacTable = ({ contact, setFlag, flag }) => {
  let { token } = useSelector((state) => state.login);

  const [localtoken] = useLocalStorage("token", "");
  if (!token) {
    token = localtoken;
  }

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Eliminara ${contact.name}, no podrás revertir esto!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { contact } = await deleteAxios(`/contacts/${id}`, token);

        if (contact) {
          setFlag(!flag);
          dispatch(setContact(null));
          Swal.fire(
            "Eliminado!",
            `Usuario ${contact.name} ha sido eliminado.`,
            "success"
          );
          return;
        }
        Swal.fire("Error!", "No pudimos elimar contacto", "error");
      }
    });
  };

  return (
    <tr>
      <th>
        <span className="mb-0 text-sm">{contact.name}</span>
      </th>
      <th>
        <span className="mb-0 text-sm">{contact.last_name}</span>
      </th>
      <td className={!contact.email ? "no-found" : ""}>{contact.email}</td>
      <td className={!contact.country ? "no-found" : ""}>{contact.country}</td>
      <td>{contact.type_id}</td>
      <td className={!contact.cell_phone ? "no-found" : ""}>
        {contact.cell_phone ? contact.cell_phone : null}
      </td>
      <td className={!contact.address ? "no-found" : ""}>{contact.address}</td>
      <td className="actions-contact">
        <Button color="primary" onClick={() => dispatch(setContact(contact))}>
          <i class="fas fa-trash-alt"></i>
          <span>Actualizar</span>
        </Button>
      </td>
      <td className="actions-contact">
        <Button color="danger" onClick={() => handleDelete(contact.id)}>
          <i class="fas fa-trash-alt"></i>
          <span>Eliminar</span>
        </Button>
      </td>
    </tr>
  );
};
