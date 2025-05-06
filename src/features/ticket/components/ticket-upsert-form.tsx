"use client";

import { Ticket } from "@prisma/client";
import { LucideCircle } from "lucide-react";
import Form from "next/form";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertProps = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket(ticket?.id, formData);
    });
  };

  return (
    <Form action={handleSubmit} className="flex flex-col gap-y-4">
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
      <Button type="submit" disabled={isPending}>
        {isPending ? <LucideCircle className="animate-spin" /> : null}
        {ticket ? "Update Ticket" : "Create Ticket"}
      </Button>
    </Form>
  );
};
