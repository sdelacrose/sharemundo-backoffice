import colors from "@/app/theme/colors";
import { Toaster, ToastOptions } from "react-hot-toast";
const baseToastOptions: ToastOptions = {
  style: {
    background: "#202332",
    color: "#fff",
    padding: "16px",
    borderRadius: "8px",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    zIndex: 9999,
    fontFamily: "Mulish",
  },
  duration: 3000,
};

const successToastOptions: ToastOptions = {
  ...baseToastOptions,
  style: {
    ...baseToastOptions.style,
    background: colors.success,
  },
};

const errorToastOptions: ToastOptions = {
  ...baseToastOptions,
  style: {
    ...baseToastOptions.style,
    background: colors.error,
  },
};

const CustomToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        marginTop: "96px",
      }}
      toastOptions={baseToastOptions}
    />
  );
};

export { successToastOptions, errorToastOptions };
export default CustomToaster;
