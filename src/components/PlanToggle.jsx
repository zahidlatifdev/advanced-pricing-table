// components/PlanToggle.tsx
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PlanToggle({ isYearly, setIsYearly, isEditing }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-12"
        >
            <span className="mr-3 text-sm font-medium">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Monthly"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Monthly'
                )}
            </span>
            <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-blue-600"
            />
            <span className="ml-3 text-sm font-medium">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Yearly"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Yearly'
                )}
            </span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 ml-2 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    defaultValue="Save up to 20% with yearly billing"
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                'Save up to 20% with yearly billing'
                            )}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    )
}