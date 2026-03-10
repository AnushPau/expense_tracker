'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { toast } from 'sonner'

function CreateBudget({ refreshData }) {
  const [emoji, setEmojiIcon] = useState('📦')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const { user } = useUser()

  const onCreateBudget = async () => {
    const result = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      icon: emoji
    }).returning({ insertedId: Budgets.id })

    if (result) {
      refreshData?.()
      toast('New Budget Created!')
      setName('')
      setAmount('')
      setEmojiIcon('📦')
    }
  }

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
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)
                  }}
                />
              </div>
            )}

            <div className="mt-4">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g. Groceries"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setAmount(value)
                }}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateBudget}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget