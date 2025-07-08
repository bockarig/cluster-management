import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"

const data = [
  {
    value: "dress-shirt-striped",
    label: "Striped Dress Shirt",
  },
  {
    value: "relaxed-button-down",
    label: "Relaxed Fit Button Down",
  },
  {
    value: "slim-button-down",
    label: "Slim Fit Button Down",
  },
  {
    value: "dress-shirt-solid",
    label: "Solid Dress Shirt",
  },
  {
    value: "dress-shirt-check",
    label: "Check Dress Shirt",
  },
]

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    // layout: "centered",
  },
  args: {
    className: "max-w-84",
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}
