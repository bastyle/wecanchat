export const genericToastOptions = {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    onClose: () => {
      console.log("options");
    }
  };

export const successToastOptions = {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    onClose: () => {
      console.log("on close toast options");
     // navigate("/announcements");
    }
  };