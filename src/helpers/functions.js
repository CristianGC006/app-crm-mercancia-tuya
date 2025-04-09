import Swal from "sweetalert2";
export function GenerateToken(){
   return "Token_ " + Math.random().toString(36).substring(2, 15).substring(0,10);
}
export function RedirectionAlert(fn, titulo, mensaje, icono, url){
    let timerInterval;
    Swal.fire({
      title:titulo,
      html: mensaje,
      timer: 2000,
      icon: icono,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        fn(url);
      }
    })
}

export function GenericAlert(titulo,mensaje,icono,){
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono
      });
}