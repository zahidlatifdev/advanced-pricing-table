// components/CurrencySelector.tsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { motion } from 'framer-motion'

export default function CurrencySelector({ currency, currencies, handleCurrencyChange, isEditing, addCurrency, removeCurrency, handleCurrencyEdit }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-end mb-4"
        >
            <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(currencies).map((currencyCode) => (
                        <SelectItem key={currencyCode} value={currencyCode}>
                            {currencyCode} ({currencies[currencyCode].symbol})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isEditing && (
                <>
                    <Button variant="outline" className="ml-2" onClick={addCurrency}>
                        Add Currency
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="ml-2">
                                Remove Currency
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            {Object.keys(currencies).map((currencyCode) => (
                                <Button
                                    key={currencyCode}
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => removeCurrency(currencyCode)}
                                >
                                    {currencyCode}
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </>
            )}
            {isEditing && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Currency Exchange Rates</h3>
                    {Object.entries(currencies).map(([code, { symbol, rate }]) => (
                        <div key={code} className="flex items-center space-x-2 mb-2">
                            <span>{code}:</span>
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => handleCurrencyEdit(code, 'rate', parseFloat(e.target.value))}
                                className="w-24 p-1 border border-gray-300 rounded"
                                step="0.01"
                            />
                            <input
                                type="text"
                                value={symbol}
                                onChange={(e) => handleCurrencyEdit(code, 'symbol', e.target.value)}
                                className="w-12 p-1 border border-gray-300 rounded"
                            />
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}