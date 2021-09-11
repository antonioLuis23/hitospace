import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ComponentWithAs,
  InputProps,
  TextareaProps,
} from "@chakra-ui/react";
import React from "react";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = FieldHookConfig<any> & {
  label: string;
  placeholder: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea = false,
  ...props
}) => {
  let InputOrTextarea:
    | ComponentWithAs<"input", InputProps>
    | ComponentWithAs<"textarea", TextareaProps> = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        placeholder={props.placeholder}
        type={props.type}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
