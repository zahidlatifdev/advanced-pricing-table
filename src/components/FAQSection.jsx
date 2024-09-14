import React from 'react'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection({ faqs, isEditing, handleFaqEdit, addFaq, removeFaq }) {
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Frequently Asked Questions"
                        onChange={(e) => handleFaqEdit(-1, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Frequently Asked Questions'
                )}
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => handleFaqEdit(index, 'question', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                faq.question
                            )}
                        </AccordionTrigger>
                        <AccordionContent>
                            {isEditing ? (
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => handleFaqEdit(index, 'answer', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    rows={3}
                                />
                            ) : (
                                faq.answer
                            )}
                        </AccordionContent>
                        {isEditing && (
                            <Button variant="destructive" onClick={() => removeFaq(index)}>
                                Remove FAQ
                            </Button>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
            {isEditing && (
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={addFaq}>
                    Add FAQ
                </Button>
            )}
        </div>
    )
}