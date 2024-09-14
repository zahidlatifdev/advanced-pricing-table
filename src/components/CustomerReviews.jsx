import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

export default function CustomerReviews({ reviews, isEditing }) {
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="What Our Customers Say"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'What Our Customers Say'
                )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                            <CardContent className="pt-6">
                                <p className="italic">
                                    {isEditing ? (
                                        <textarea
                                            value={review.text}
                                            onChange={(e) => {/* Handle review text change */ }}
                                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                            rows={3}
                                        />
                                    ) : (
                                        review.text
                                    )}
                                </p>
                                <p className="font-semibold mt-4">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={review.author}
                                            onChange={(e) => {/* Handle review author change */ }}
                                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                        />
                                    ) : (
                                        `- ${review.author}`
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}