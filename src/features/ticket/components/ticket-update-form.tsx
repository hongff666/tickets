import { Ticket } from "@prisma/client";
import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { updateTicket } from "../actions/update-ticket";

export const TicketUpdateForm = ({ ticket }: { ticket: Ticket }) => {
  return (
    <Form action={updateTicket} className="flex flex-col gap-y-4">
      <input type="hidden" name="id" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        className="w-full"
        defaultValue={ticket.title}
      />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        className="w-full"
        defaultValue={ticket.content}
      />
      <Button type="submit">Update Ticket</Button>
    </Form>
  );
};
