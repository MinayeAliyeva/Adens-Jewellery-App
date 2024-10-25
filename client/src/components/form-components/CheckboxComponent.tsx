import { Checkbox } from "antd";
import { Controller, useForm } from "react-hook-form";

interface IFormInputs {
  highToLow: boolean;
  lowToHigh: boolean;
  newProducts: boolean;
}

const CheckboxComponent = () => {
  const { control } = useForm<IFormInputs>({
    defaultValues: {
      highToLow: false,
      lowToHigh: false,
      newProducts: false,
    },
  });

  return (
    <>
      <Controller
        name="newProducts"
        control={control}
        render={({ field }) => (
          <Checkbox {...field}>Test</Checkbox>
        )}
      />
    </>
  );
};

export default CheckboxComponent;
