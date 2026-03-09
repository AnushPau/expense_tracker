'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function CreateBudget() {
  const [emoji, setEmojiIcon] = useState('📦');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
            <h2 className="text-3xl">+</h2>
            <p className="text-sm">Create New Budget</p>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Add a new budget to track your spending.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-5 relative'>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emoji}
            </Button>

            {openEmojiPicker && (
              <div className="absolute z-50 mt-2">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}

            <div className="mt-4">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input placeholder="e.g. Groceries" />
            </div>

            <div className="mt-4">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input type="number" placeholder="e.g. 5000" />
            </div>

            <Button className="mt-5 w-full">
              Create Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget