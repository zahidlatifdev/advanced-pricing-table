import React from 'react'
import { Progress } from "@/components/ui/progress"

export default function GrowthIndicator({ progress, isEditing }) {
    return (
        <div className="mt-16">
            <h3 className="text-lg font-semibold mb-2">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Our Growth"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Our Growth'
                )}
            </h3>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Over 10,000 businesses trust our platform"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Over 10,000 businesses trust our platform'
                )}
            </p>
        </div>
    )
}