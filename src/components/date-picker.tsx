'use client'

import { format } from 'date-fns'
import { LucideCalendar } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DataPickerProps = {
  id: string
  name?: string
  defaultValue?: string
  ref?: React.RefObject<{
    reset: () => void
  } | null>
}

export const DatePicker = ({
  id,
  name,
  defaultValue,
  ref,
}: DataPickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )

  React.useImperativeHandle(ref, () => ({
    reset: () => setDate(new Date()),
  }))

  const [open, setOpen] = React.useState(false)

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : ''

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} asChild>
        <Button
          variant={'outline'}
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formattedStringDate}
          <input name={name} type="hidden" value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
