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
}

export const DatePicker = ({ id, name, defaultValue }: DataPickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : ''

  return (
    <Popover>
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
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
