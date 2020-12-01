import Swal from "sweetalert2";

export default async (cohorte) =>
  Swal.fire({
    html: `<h5>¿Desea migrar a ${cohorte}?<h5/>`,
    width: "30%",
    icon: "warning",
    showCancelButton: true,
    customClass: {
      icon: "w-25",
      confirmButton: "btn btn-sm btn-primary",
      cancelButton: "btn btn-sm btn-default border",
    },
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, Migrar!",
  });
