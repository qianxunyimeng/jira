import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

// Omit的作用就是将 从第一个参数类型身上删除 第二个参数属性， 如果要删除多个属性，可以使用 ｜
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};
