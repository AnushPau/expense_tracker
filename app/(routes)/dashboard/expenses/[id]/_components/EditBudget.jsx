"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

function EditBudget({ budgetInfo, refreshData }) {
  const [emoji, setEmojiIcon] = useState(budgetInfo?.icon || '📦')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState(budgetInfo?.name || '')
  const [amount, setAmount] = useState(budgetInfo?.amount || '')
    const params = useParams();
  const { user } = useUser()

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon || '📦')
    setName(budgetInfo?.name || '')
    setAmount(budgetInfo?.amount || '')
  } , [budgetInfo])

  const onUpdateBudget = async () => {
    const result=await db.update(Budgets).set({
      name:name,
      amount:amount,
      icon:emoji
    }).where(eq(Budgets.id,Number(params.id)))
    .returning();

    if(result)
    {
        refreshData();
        toast("Budget updated!")
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <PenBox size={18} />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              Update your budget details.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-5 relative'>
            <Button
              type="button"
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
                defaultValue={budgetInfo?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 5000"
                defaultValue={budgetInfo?.amount}
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
                onClick={onUpdateBudget}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget