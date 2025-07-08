import { BellRingingIcon } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Panel } from "@/components/ui/panel.tsx"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

const meta = {
  title: "UI/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => (
    <Panel className="mx-auto max-w-xs">
      <p className="text-center">Panel</p>
    </Panel>
  ),
}

export const WithContent: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Panel className="mx-auto max-w-lg">
      <h3 className="font-semibold">
        The greatest of all time <span className="text-cnt-secondary text-sm">(in tennis)</span>
      </h3>
      <p className="mt-2 text-sm leading-6 ">
        Roger Federer's unparalleled combination of skill, longevity, and versatility has led him to
        hold numerous records, including the most Grand Slam singles titles.
      </p>
      <p className="mt-2 hidden text-sm leading-6  sm:block">
        His graceful and effortless style of play, combined with his sportsmanship and impact on the
        global tennis community, solidify his legacy as the greatest tennis player of all time.
      </p>
    </Panel>
  ),
}

export const WithAsChildProp: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <ul role="list" className="flex list-none flex-col gap-4">
      <Panel asChild>
        <li className="text-gray-900 dark:text-gray-50">
          This Panel will be turned into a {`<li>`} element
        </li>
      </Panel>
      <Panel asChild>
        <li className="text-gray-900 dark:text-gray-50">
          This Panel will also be turned into a {`<li>`} element
        </li>
      </Panel>
    </ul>
  ),
}

export const NotificationList: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Panel {...args}>
      <header>
        <h2>Notifications</h2>
        <p>You have 3 unread messages.</p>
      </header>
      <div className="grid gap-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center gap-4">
            <BellRingingIcon weight="duotone" className="size-6" />
            <div>
              <p>{notification.title}</p>
              <p className="text-foreground/60">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <Button variant="ghost">Close</Button>
      </footer>
    </Panel>
  ),
}

export const Comparison: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="grid grid-cols-2 gap-x-8 p-3 ring-1 ring-brd-line rounded-md">
      <div className="space-y-2">
        <p className="text-xs text-cnt-tertiary flex justify-center">Tremor UI</p>
        <Panel {...args}>
          <header>
            <h2>Notifications</h2>
            <p>You have 3 unread messages.</p>
          </header>
          <div className="grid gap-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center gap-4">
                <BellRingingIcon weight="duotone" className="size-6" />
                <div>
                  <p>{notification.title}</p>
                  <p className="text-cnt-tertiary">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
          <footer>
            <Button variant="ghost">Close</Button>
          </footer>
        </Panel>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-cnt-tertiary flex justify-center">Shadcn UI</p>
        <Card {...args}>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center gap-4">
                <BellRingingIcon weight="duotone" className="size-6 text-cnt-primary" />
                <div>
                  <p>{notification.title}</p>
                  <p className="text-cnt-tertiary">{notification.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
}
