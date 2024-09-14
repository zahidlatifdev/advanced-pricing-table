import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PromoCodeSection({ buttons, isEditing, handleButtonEdit }) {
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Have a Promo Code?"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Have a Promo Code?'
                )}
            </h2>
            <div className="flex justify-center">
                <Input
                    type="text"
                    placeholder="Enter promo code"
                    className="max-w-xs mr-2"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isEditing ? (
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                value={buttons.apply.text}
                                onChange={(e) => handleButtonEdit('apply', 'text', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                placeholder="Button text"
                            />
                            <input
                                type="text"
                                value={buttons.apply.href}
                                onChange={(e) => handleButtonEdit('apply', 'href', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                placeholder="Button URL"
                            />
                        </div>
                    ) : (
                        <a href={buttons.apply.href} className="">
                            {buttons.apply.text}
                        </a>
                    )}
                </Button>
            </div>
        </div>
    )
}