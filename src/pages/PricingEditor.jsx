import React, { useState, useEffect } from 'react'
import plansData from '../data/plans'
import additionalFeaturesData from '../data/additionalFeatures'
import currenciesData from '../data/currenciesData'
import faqsData from '../data/faqsData'
import exportPricingPage from '@/components/exports/pricingDownloadHandler'
import { Check, HelpCircle, Info, Zap, X, ArrowRight, Shield, Clock, Users, BarChart, Edit3, Save, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
    Shield,
    Clock,
    Users,
    BarChart,
    Zap,
    Check,
    Info,
    HelpCircle,
    ArrowRight,
}

export default function PricingEditor() {
    const [isEditing, setIsEditing] = useState(false)
    const [isYearly, setIsYearly] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [showComparison, setShowComparison] = useState(false)
    const [currency, setCurrency] = useState('USD')
    const [progress, setProgress] = useState(0)
    const [pageTitle, setPageTitle] = useState('Choose Your Perfect Plan')
    const [plans, setPlans] = useState(plansData)
    const [additionalFeatures, setAdditionalFeatures] = useState(additionalFeaturesData)
    const [currencies, setCurrencies] = useState(currenciesData)
    const [faqs, setFaqs] = useState(faqsData)

    const [buttons, setButtons] = useState({
        confirmSubscription: { text: 'Confirm Subscription', href: '#' },
        apply: { text: 'Apply', href: '#' },
        startFreeTrial: { text: 'Start Your Free Trial', href: '#' },
    })

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    const handleCurrencyChange = (value) => {
        setCurrency(value)
    }

    const formatPrice = (price) => {
        const convertedPrice = price * currencies[currency].rate
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, currencyDisplay: 'narrowSymbol' }).format(convertedPrice)
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }

    const handlePlanEdit = (index, field, value) => {
        const newPlans = [...plans]
        newPlans[index][field] = value
        setPlans(newPlans)
    }

    const handleFeatureEdit = (planIndex, featureIndex, field, value) => {
        const newPlans = [...plans]
        newPlans[planIndex].features[featureIndex][field] = value
        setPlans(newPlans)
    }

    const handleAdditionalFeatureEdit = (index, field, value) => {
        const newFeatures = [...additionalFeatures]
        newFeatures[index][field] = value
        setAdditionalFeatures(newFeatures)
    }

    const handleCurrencyEdit = (currencyCode, field, value) => {
        const newCurrencies = { ...currencies }
        newCurrencies[currencyCode][field] = value
        setCurrencies(newCurrencies)
    }

    const addCurrency = () => {
        const newCurrencyCode = prompt('Enter new currency code (e.g., CAD):')
        if (newCurrencyCode && !currencies[newCurrencyCode]) {
            const newCurrencies = { ...currencies }
            newCurrencies[newCurrencyCode] = { symbol: '$', rate: 1 }
            setCurrencies(newCurrencies)
        }
    }

    const removeCurrency = (currencyCode) => {
        const newCurrencies = { ...currencies }
        delete newCurrencies[currencyCode]
        setCurrencies(newCurrencies)
        if (currency === currencyCode) {
            setCurrency('USD')
        }
    }

    const addPlan = () => {
        const newPlan = {
            name: 'New Plan',
            description: 'Description for the new plan',
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [],
            color: '#000000',
            maxUsers: 1,
            trialDays: 0,
        }
        setPlans([...plans, newPlan])
    }

    const removePlan = (index) => {
        const newPlans = plans.filter((_, i) => i !== index)
        setPlans(newPlans)
    }

    const addFeature = (planIndex) => {
        const newPlans = [...plans]
        newPlans[planIndex].features.push({ name: 'New Feature', description: 'Description for the new feature' })
        setPlans(newPlans)
    }

    const removeFeature = (planIndex, featureIndex) => {
        const newPlans = [...plans]
        newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex)
        setPlans(newPlans)
    }

    const addAdditionalFeature = () => {
        setAdditionalFeatures([...additionalFeatures, { name: 'New Feature', description: 'Description for the new feature', icon: 'Check' }])
    }

    const removeAdditionalFeature = (index) => {
        const newFeatures = additionalFeatures.filter((_, i) => i !== index)
        setAdditionalFeatures(newFeatures)
    }

    const addFaq = () => {
        setFaqs([...faqs, { question: 'New Question', answer: 'Answer to the new question' }])
    }

    const removeFaq = (index) => {
        const newFaqs = faqs.filter((_, i) => i !== index)
        setFaqs(newFaqs)
    }

    const handleFaqEdit = (index, field, value) => {
        const newFaqs = [...faqs]
        newFaqs[index][field] = value
        setFaqs(newFaqs)
    }

    const handleButtonEdit = (buttonKey, field, value) => {
        setButtons(prevButtons => ({
            ...prevButtons,
            [buttonKey]: {
                ...prevButtons[buttonKey],
                [field]: value
            }
        }))
    }

    const renderEditableText = (text, onChange, multiline = false) => {
        return isEditing ? (
            multiline ? (
                <textarea
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded resize-y bg-white text-gray-900"
                    style={{ minHeight: '100px' }}
                />
            ) : (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                />
            )
        ) : (
            <span>{text}</span>
        )
    }
    const renderEditableFooterLink = (text, href, onChange) => {
        return isEditing ? (
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange('text', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    placeholder="Link text"
                />
                <input
                    type="text"
                    value={href}
                    onChange={(e) => onChange('href', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    placeholder="Link URL"
                />
            </div>
        ) : (
            <a href={href} className="text-blue-600 mx-2 hover:underline">
                {text}
            </a>
        )
    }

    const renderEditableLink = (buttonKey) => {
        const button = buttons[buttonKey];
        if (!button) {
            return null;
        }
        return isEditing ? (
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    value={button.text}
                    onChange={(e) => handleButtonEdit(buttonKey, 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Button text"
                />
                <input
                    type="text"
                    value={button.href}
                    onChange={(e) => handleButtonEdit(buttonKey, 'href', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Button URL"
                />
            </div>
        ) : (
            <a href={button.href} className="">
                {button.text}
            </a>
        );
    };

    return (
        <div className="container mx-auto px-20 py-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center mb-12"
            >
                <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {renderEditableText(pageTitle, setPageTitle)}
                </h1>
            </motion.div>
            <div className="flex justify-end mb-8 space-x-4">
                {!isEditing && (
                    <Button
                        onClick={exportPricingPage}
                        className="transition-all duration-300 hover:scale-105"
                    >
                        <Download className="mr-2" />
                        Export
                    </Button>
                )}
                <Button
                    onClick={toggleEditing}
                    className="transition-all duration-300 hover:scale-105"
                >
                    {isEditing ? <Save className="mr-2" /> : <Edit3 className="mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
            </div>

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
            </motion.div>

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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center mb-12"
            >
                <span className="mr-3 text-sm font-medium">
                    {renderEditableText('Monthly', () => { })}
                </span>
                <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-blue-600"
                />
                <span className="ml-3 text-sm font-medium">
                    {renderEditableText('Yearly', () => { })}
                </span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-gray-500 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{renderEditableText('Save up to 20% with yearly billing', () => { })}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <Card className={`flex flex-col ${plan.popular ? 'border-blue-600 shadow-lg' : ''} transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}>
                            <CardHeader style={{ backgroundColor: isEditing ? 'transparent' : plan.color }} className={`${isEditing ? 'bg-white' : 'text-white'} rounded-t-lg`}>
                                <CardTitle className="flex items-center justify-between">
                                    {renderEditableText(plan.name, (value) => handlePlanEdit(index, 'name', value))}
                                    {isEditing && (
                                        <Switch
                                            checked={plan.popular}
                                            onCheckedChange={(checked) => handlePlanEdit(index, 'popular', checked)}
                                        />
                                    )}
                                    {plan.popular && (
                                        <Badge variant="secondary" className="bg-white text-blue-600">
                                            {renderEditableText('Popular', () => { })}
                                        </Badge>
                                    )}
                                </CardTitle>
                                <CardDescription className={isEditing ? 'text-gray-600' : 'text-white/90'}>
                                    {renderEditableText(plan.description, (value) => handlePlanEdit(index, 'description', value))}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-4xl font-bold mt-4 mb-4 text-center">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                            onChange={(e) => handlePlanEdit(index, isYearly ? 'yearlyPrice' : 'monthlyPrice', parseFloat(e.target.value))}
                                            className="w-24 p-1 border border-gray-300 rounded text-center"
                                        />
                                    ) : (
                                        formatPrice(isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)
                                    )}
                                    <span className="text-sm font-normal text-gray-500">
                                        /{isYearly ? 'mo' : 'month'}
                                    </span>
                                </div>
                                {isYearly && (
                                    <div className="mb-4 text-sm">
                                        <span className="line-through text-gray-500">
                                            {formatPrice(plan.monthlyPrice * 12)}/year
                                        </span>
                                        <span className="ml-2 text-blue-600 font-semibold">
                                            {formatPrice(plan.yearlyPrice)}/year
                                        </span>
                                    </div>
                                )}
                                <ul className="space-y-2 mb-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <Check className="h-4 w-4 text-blue-600 mr-2" />
                                            <span>
                                                {renderEditableText(feature.name, (value) => handleFeatureEdit(index, featureIndex, 'name', value))}
                                            </span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 ml-2 text-gray-500 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {renderEditableText(feature.description, (value) => handleFeatureEdit(index, featureIndex, 'description', value))}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            {isEditing && (
                                                <Button variant="ghost" size="sm" onClick={() => removeFeature(index, featureIndex)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {isEditing && (
                                    <Button variant="outline" onClick={() => addFeature(index)}>
                                        Add Feature
                                    </Button>
                                )}
                                <div className="text-sm text-gray-500 mb-4">
                                    <span className="font-semibold">
                                        {renderEditableText(plan.maxUsers, (value) => handlePlanEdit(index, 'maxUsers', value))}</span>
                                </div>
                                <div className="text-sm text-gray-500 mb-4">
                                    <span className="font-semibold">
                                        {renderEditableText(plan.trialDays, (value) => handlePlanEdit(index, 'trialDays', value))}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full transition-all duration-300 ease-in-out hover:scale-105"
                                    variant={plan.popular ? 'default' : 'outline'}
                                    onClick={() => !isEditing && setSelectedPlan(plan)}
                                >
                                    {renderEditableText(`Choose ${plan.name}`, (value) => handlePlanEdit(index, 'chooseButtonText', value))}
                                </Button>
                                {isEditing && (
                                    <Button
                                        className="w-full transition-all duration-300 ease-in-out hover:scale-105"
                                        variant={'outline'}
                                        onClick={() => setSelectedPlan(plan)}
                                    >
                                        Edit Popup
                                    </Button>
                                )}

                            </CardFooter>
                            {isEditing && (
                                <Button variant="destructive" onClick={() => removePlan(index)}>
                                    Remove Plan
                                </Button>
                            )}
                        </Card>

                    </motion.div>
                ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-12">
                {renderEditableText('All plans come with a 30-day money-back guarantee.', () => { })}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="inline-block h-4 w-4 ml-1 mb-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {renderEditableText("If you're not satisfied, get a full refund within 30 days", () => { })}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </p>

            {isEditing && (
                <Button className="mt-4" onClick={addPlan}>
                    Add New Plan
                </Button>
            )}

            <div className="flex justify-center mt-12">
                <Button
                    variant="outline"
                    onClick={() => setShowComparison(!showComparison)}
                    className="transition-all duration-300 hover:scale-105"
                >
                    {showComparison ? 'Hide' : 'Show'} Feature Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <AnimatePresence>
                {showComparison && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 overflow-x-auto"
                    >
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Feature</th>
                                    {plans.map((plan, index) => (
                                        <th key={index} className="p-2 text-center">
                                            {renderEditableText(plan.name, (value) => handlePlanEdit(index, 'name', value))}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plans[plans.length - 1].features.map((feature, featureIndex) => (
                                    <tr key={featureIndex} className="border-b">
                                        <td className="p-2">
                                            {renderEditableText(feature.name, (value) => handleFeatureEdit(plans.length - 1, featureIndex, 'name', value))}
                                        </td>
                                        {plans.map((plan, planIndex) => (
                                            <td key={planIndex} className="p-2 text-center">
                                                {isEditing ? (
                                                    <Switch
                                                        checked={plan.features.some(f => f.name === feature.name)}
                                                        onCheckedChange={(checked) => {
                                                            const newPlans = [...plans]
                                                            if (checked) {
                                                                newPlans[planIndex].features.push({ ...feature })
                                                            } else {
                                                                newPlans[planIndex].features = newPlans[planIndex].features.filter(f => f.name !== feature.name)
                                                            }
                                                            setPlans(newPlans)
                                                        }}
                                                    />
                                                ) : plan.features.some(f => f.name === feature.name) ? (
                                                    <Check className="h-4 w-4 mx-auto text-green-500" />
                                                ) : (
                                                    <X className="h-4 w-4 mx-auto text-red-500" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('Additional Features', () => { })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {additionalFeatures.map((feature, index) => (
                        <Card key={index} className="transition-all duration-300 ease-in-out hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {isEditing ? (
                                        <Select
                                            value={feature.icon}
                                            onValueChange={(value) => handleAdditionalFeatureEdit(index, 'icon', value)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select icon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(iconMap).map((iconName) => (
                                                    <SelectItem key={iconName} value={iconName}>
                                                        {iconName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        React.createElement(iconMap[feature.icon], { className: "h-6 w-6 mr-2" })
                                    )}
                                    <span className="ml-2">
                                        {renderEditableText(feature.name, (value) => handleAdditionalFeatureEdit(index, 'name', value))}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {renderEditableText(feature.description, (value) => handleAdditionalFeatureEdit(index, 'description', value))}
                                </p>
                            </CardContent>
                            {isEditing && (
                                <CardFooter>
                                    <Button variant="destructive" onClick={() => removeAdditionalFeature(index)}>
                                        Remove Feature
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                </div>
                {isEditing && (
                    <Button className="mt-4" onClick={addAdditionalFeature}>
                        Add Additional Feature
                    </Button>
                )}
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('Frequently Asked Questions', () => { })}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>
                                {renderEditableText(faq.question, (value) => handleFaqEdit(index, 'question', value))}
                            </AccordionTrigger>
                            <AccordionContent>
                                {renderEditableText(faq.answer, (value) => handleFaqEdit(index, 'answer', value), true)}
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
                    <Button className="mt-4" onClick={addFaq}>
                        Add FAQ
                    </Button>
                )}
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('Have a Promo Code?', () => { })}
                </h2>
                <div className="flex justify-center">
                    <Input
                        type="text"
                        placeholder="Enter promo code"
                        className="max-w-xs mr-2"
                    />
                    <Button>
                        {renderEditableLink('apply')}
                    </Button>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('What Our Customers Say', () => { })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"This platform has revolutionized our workflow. Highly recommended!"', () => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- John Doe, CEO of TechCorp', () => { })}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"The features and customer support are unmatched. A game-changer for our team."', () => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- Jane Smith, CTO of InnovateCo', () => { })}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"Scalable, reliable, and user-friendly. Everything we needed in one place."', () => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- Mike Johnson, Project Manager at BuildIt', () => { })}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    {renderEditableText('Ready to Get Started?', () => { })}
                </h2>
                <p className="mb-8">
                    {renderEditableText('Join thousands of satisfied customers and take your project to the next level.', () => { })}
                </p>
                <Button size="lg" className="transition-all duration-300 ease-in-out hover:scale-105">
                    {renderEditableLink('startFreeTrial')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>

            {selectedPlan && (
                <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {renderEditableText(`Subscribe to ${selectedPlan.name} Plan`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'subscribeDialogTitle', value))}
                            </DialogTitle>
                            <DialogDescription>
                                {renderEditableText(`You've selected the ${selectedPlan.name} plan. Please review the details below.`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'subscribeDialogDescription', value))}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <h3 className="font-semibold mb-2">
                                {renderEditableText('Plan Details:', (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'planDetailsTitle', value))}
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    {renderEditableText(`Price: ${formatPrice(isYearly ? selectedPlan.yearlyPrice / 12 : selectedPlan.monthlyPrice)}/${isYearly ? 'month (billed annually)' : 'month'}`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'priceDetails', value))}
                                </li>
                                <li>
                                    {renderEditableText(`Billing Cycle: ${isYearly ? 'Annual' : 'Monthly'}`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'billingCycleDetails', value))}
                                </li>
                                <li>
                                    {renderEditableText(`Max Users: ${selectedPlan.maxUsers}`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'maxUsersDetails', value))}
                                </li>
                                <li>
                                    {renderEditableText(`Trial Period: ${selectedPlan.trialDays} days`, (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'trialPeriodDetails', value))}
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => !isEditing && setSelectedPlan(null)}>
                                {renderEditableText('Cancel', (value) => handlePlanEdit(plans.indexOf(selectedPlan), 'cancelButtonText', value))}
                            </Button>
                            <Button onClick={() => {
                                !isEditing && window.location.href == buttons.confirmSubscription.href
                            }}>
                                {renderEditableLink('confirmSubscription')}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <div className="mt-16">
                <h3 className="text-lg font-semibold mb-2">
                    {renderEditableText('Our Growth', () => { })}
                </h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-500 mt-2">
                    {renderEditableText('Over 10,000 businesses trust our platform', () => { })}
                </p>
            </div>



            <footer className="mt-16 text-center text-sm text-muted-foreground">
                <p>
                    {renderEditableText('© 2023 Your Company Name. All rights reserved.', (value) => { })}
                </p>
                <div className="mt-2">
                    {renderEditableFooterLink('Terms of Service', '#', (field, value) => { })} |
                    {renderEditableFooterLink('Privacy Policy', '#', (field, value) => { })} |
                    {renderEditableFooterLink('Contact Us', '#', (field, value) => { })}
                </div>
            </footer>
        </div>
    )
}