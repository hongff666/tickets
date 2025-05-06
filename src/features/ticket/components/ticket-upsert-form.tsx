"use client";

import { Ticket } from "@prisma/client";
import Form from "next/form";

import { SubmitButton } from "@/components/form/submmit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertProps = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  return (
    <Form
      action={upsertTicket.bind(null, ticket?.id)}
      className="flex flex-col gap-y-4"
    >
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        className="w-full"
        defaultValue={ticket?.title}
      />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        className="w-full"
        defaultValue={ticket?.content}
      />
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};
