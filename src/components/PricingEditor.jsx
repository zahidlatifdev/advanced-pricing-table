'use client'

import React, { useState, useEffect } from 'react'
import { Check, HelpCircle, Info, Zap, X, ArrowRight, Shield, Clock, Users, BarChart, Edit3, Plus, Minus, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'

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

export default function AdvancedEditablePricingPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isYearly, setIsYearly] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [showComparison, setShowComparison] = useState(false)
    const [currency, setCurrency] = useState('USD')
    const [promoCode, setPromoCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [progress, setProgress] = useState(0)
    const [pageTitle, setPageTitle] = useState('Choose Your Perfect Plan')
    const [primaryColor, setPrimaryColor] = useState('#3b82f6')
    const [secondaryColor, setSecondaryColor] = useState('#6b7280')
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1)

    const [plans, setPlans] = useState([
        {
            name: 'Basic',
            description: 'Essential features for small projects',
            monthlyPrice: 19,
            yearlyPrice: 190,
            features: [
                { name: 'Up to 5 projects', description: 'Create and manage up to 5 different projects' },
                { name: '5GB storage', description: 'Store up to 5GB of files and assets' },
                { name: 'Basic support', description: 'Email support with 48-hour response time' },
                { name: 'Limited API access', description: 'Access to basic API endpoints' },
                { name: 'Community forums', description: 'Access to our community support forums' },
            ],
            color: '#3b82f6',
            maxUsers: 5,
            trialDays: 14,
        },
        {
            name: 'Pro',
            description: 'Advanced features for growing teams',
            monthlyPrice: 49,
            yearlyPrice: 490,
            features: [
                { name: 'Unlimited projects', description: 'Create and manage an unlimited number of projects' },
                { name: '50GB storage', description: 'Store up to 50GB of files and assets' },
                { name: 'Priority support', description: 'Email and chat support with 24-hour response time' },
                { name: 'Advanced analytics', description: 'Gain insights with detailed project and team analytics' },
                { name: 'Full API access', description: 'Unrestricted access to all API endpoints' },
                { name: 'Custom integrations', description: 'Connect with your favorite tools' },
                { name: 'Team collaboration', description: 'Advanced team management and collaboration features' },
            ],
            color: '#8b5cf6',
            popular: true,
            maxUsers: 20,
            trialDays: 30,
        },
        {
            name: 'Enterprise',
            description: 'Custom solutions for large organizations',
            monthlyPrice: 99,
            yearlyPrice: 990,
            features: [
                { name: 'Unlimited everything', description: 'No limits on projects, storage, or team members' },
                { name: 'Dedicated support', description: '24/7 phone, email, and chat support with dedicated account manager' },
                { name: 'Custom integrations', description: 'Build and maintain custom integrations for your workflow' },
                { name: 'SLA', description: 'Guaranteed uptime and performance with custom SLA' },
                { name: 'Advanced security', description: 'Enhanced security features and compliance support' },
                { name: 'Custom training', description: 'Personalized onboarding and training sessions' },
                { name: 'White-labeling', description: 'Ability to white-label the platform with your branding' },
            ],
            color: '#10b981',
            maxUsers: 'Unlimited',
            trialDays: 60,
        },
    ])

    const [additionalFeatures, setAdditionalFeatures] = useState([
        { name: 'Single Sign-On (SSO)', description: 'Secure and streamlined authentication', icon: 'Shield' },
        { name: 'Audit Logs', description: 'Detailed logs of all account activities', icon: 'Clock' },
        { name: 'User Roles & Permissions', description: 'Granular control over user access', icon: 'Users' },
        { name: 'Advanced Reporting', description: 'Generate and export custom reports', icon: 'BarChart' },
    ])

    const [currencies, setCurrencies] = useState({
        USD: { symbol: '$', rate: 1 },
        EUR: { symbol: '€', rate: 0.85 },
        GBP: { symbol: '£', rate: 0.75 },
        JPY: { symbol: '¥', rate: 110 },
    })

    const [faqs, setFaqs] = useState([
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.',
        },
        {
            question: 'Can I change my plan later?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
        },
        {
            question: 'Is there a long-term commitment?',
            answer: 'No, all plans are billed monthly or annually with no long-term commitment. You can cancel at any time.',
        },
        {
            question: 'Do you offer custom enterprise solutions?',
            answer: 'Yes, we offer tailored solutions for large enterprises. Please contact our sales team for more information.',
        },
    ])

    const [promoForm, setPromoForm] = useState({
        placeholder: 'Enter promo code',
        method: 'POST',
        action: '/api/apply-promo',
        target: '_self',
    })

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    const handleCurrencyChange = (value) => {
        setCurrency(value)
    }

    const handlePromoCodeSubmit = (e) => {
        e.preventDefault()
        if (promoCode.toLowerCase() === 'discount10') {
            setDiscountApplied(true)
        }
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

    const renderEditableText = (text, onChange, multiline = false) => {
        return isEditing ? (
            multiline ? (
                <textarea
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded resize-y"
                    style={{ minHeight: '100px' }}
                />
            ) : (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            )
        ) : (
            <span className="editable-text">{text}</span>
        )
    }

    const renderEditableColor = (color, onChange) => {
        return isEditing ? (
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
            />
        ) : null
    }

    const renderEditableLink = (text, href, onChange) => {
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
            <a href={href} className="text-blue-600 hover:underline">
                {text}
            </a>
        )
    }

    return (
        <div
            className="container mx-auto px-4 py-16 transition-all duration-300 ease-in-out"
            style={{
                '--primary-color': primaryColor,
                '--secondary-color': secondaryColor,
                fontSize: `${fontSizeMultiplier}rem`
            }}
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center">
                    {renderEditableText(pageTitle, setPageTitle)}
                </h1>
                <Button onClick={toggleEditing}>
                    {isEditing ? <Save className="mr-2" /> : <Edit3 className="mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
            </div>

            {isEditing && (
                <div className="mb-4 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Label>Primary Color</Label>
                        {renderEditableColor(primaryColor, setPrimaryColor)}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Label>Secondary Color</Label>
                        {renderEditableColor(secondaryColor, setSecondaryColor)}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Label>Font Size</Label>
                        <Slider
                            min={0.5}
                            max={2}
                            step={0.1}
                            value={[fontSizeMultiplier]}
                            onValueChange={([value]) => setFontSizeMultiplier(value)}
                        />
                        <span>{fontSizeMultiplier.toFixed(1)}x</span>
                    </div>
                </div>
            )}

            <div className="flex justify-end mb-4">
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
                            <Plus className="h-4 w-4 mr-2" /> Add Currency
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="ml-2">
                                    <Minus className="h-4 w-4 mr-2" /> Remove Currency
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
            </div>

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

            <div className="flex items-center justify-center mb-12">
                <span className="mr-3 text-sm font-medium">
                    {renderEditableText('Monthly', (value) => { })}
                </span>
                <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-primary"
                />
                <span className="ml-3 text-sm font-medium">
                    {renderEditableText('Yearly', (value) => { })}
                </span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{renderEditableText('Save up to 20% with yearly billing', (value) => { })}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <Card key={index} className={`flex flex-col ${plan.popular ? 'border-primary' : ''} transition-all duration-300 ease-in-out hover:shadow-lg`}>
                        <CardHeader style={{ backgroundColor: plan.color }} className="text-white">
                            <CardTitle className="flex items-center justify-between">
                                {renderEditableText(plan.name, (value) => handlePlanEdit(index, 'name', value))}
                                {isEditing && (
                                    <Switch
                                        checked={plan.popular}
                                        onCheckedChange={(checked) => handlePlanEdit(index, 'popular', checked)}
                                    />
                                )}
                                {plan.popular && (
                                    <Badge variant="secondary" className="bg-white text-primary">
                                        {renderEditableText('Popular', (value) => { })}
                                    </Badge>
                                )}
                            </CardTitle>
                            <CardDescription className="text-white/90">
                                {renderEditableText(plan.description, (value) => handlePlanEdit(index, 'description', value))}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="text-3xl font-bold mb-4">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                        onChange={(e) => handlePlanEdit(index, isYearly ? 'yearlyPrice' : 'monthlyPrice', parseFloat(e.target.value))}
                                        className="w-24 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    formatPrice(isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)
                                )}
                                <span className="text-sm font-normal text-muted-foreground">
                                    /{isYearly ? 'mo' : 'month'}
                                </span>
                            </div>
                            {isYearly && (
                                <div className="mb-4 text-sm">
                                    <span className="line-through text-muted-foreground">
                                        {formatPrice(plan.monthlyPrice * 12)}/year
                                    </span>
                                    <span className="ml-2 text-primary font-semibold">
                                        {formatPrice(plan.yearlyPrice)}/year
                                    </span>
                                </div>
                            )}
                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <Check className="h-4 w-4 text-primary mr-2" />
                                        <span>
                                            {renderEditableText(feature.name, (value) => handleFeatureEdit(index, featureIndex, 'name', value))}
                                        </span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
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
                            <div className="text-sm text-muted-foreground mb-4">
                                <span className="font-semibold">Max Users:</span>{' '}
                                {renderEditableText(plan.maxUsers, (value) => handlePlanEdit(index, 'maxUsers', value))}
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                                <span className="font-semibold">Trial Period:</span>{' '}
                                {renderEditableText(plan.trialDays, (value) => handlePlanEdit(index, 'trialDays', value))} days
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full transition-all duration-300 ease-in-out hover:scale-105"
                                variant={plan.popular ? 'default' : 'outline'}
                                onClick={() => setSelectedPlan(plan)}
                            >
                                {renderEditableText(`Choose ${plan.name}`, (value) => { })}
                            </Button>
                        </CardFooter>
                        {isEditing && (
                            <Button variant="destructive" onClick={() => removePlan(index)}>
                                Remove Plan
                            </Button>
                        )}
                    </Card>
                ))}
            </div>

            {isEditing && (
                <Button className="mt-4" onClick={addPlan}>
                    Add New Plan
                </Button>
            )}

            <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={() => setShowComparison(!showComparison)}>
                    {showComparison ? 'Hide' : 'Show'} Feature Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {showComparison && (
                <div className="mt-8 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted">
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
                </div>
            )}

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('Additional Features', (value) => { })}
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
                    {renderEditableText('Frequently Asked Questions', (value) => { })}
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
                    {renderEditableText('Have a Promo Code?', (value) => { })}
                </h2>
                <form onSubmit={handlePromoCodeSubmit} className="flex justify-center" method={promoForm.method} action={promoForm.action} target={promoForm.target}>
                    <Input
                        type="text"
                        placeholder={promoForm.placeholder}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="max-w-xs mr-2"
                    />
                    <Button type="submit">Apply</Button>
                </form>
                {isEditing && (
                    <div className="mt-4 space-y-2">
                        <Input
                            type="text"
                            placeholder="Placeholder text"
                            value={promoForm.placeholder}
                            onChange={(e) => setPromoForm({ ...promoForm, placeholder: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="Form method"
                            value={promoForm.method}
                            onChange={(e) => setPromoForm({ ...promoForm, method: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="Form action"
                            value={promoForm.action}
                            onChange={(e) => setPromoForm({ ...promoForm, action: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="Form target"
                            value={promoForm.target}
                            onChange={(e) => setPromoForm({ ...promoForm, target: e.target.value })}
                        />
                    </div>
                )}
                {discountApplied && (
                    <p className="text-center text-green-500 mt-2">
                        {renderEditableText('10% discount applied!', (value) => { })}
                    </p>
                )}
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {renderEditableText('What Our Customers Say', (value) => { })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"This platform has revolutionized our workflow. Highly recommended!"', (value) => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- John Doe, CEO of TechCorp', (value) => { })}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"The features and customer support are unmatched. A game-changer for our team."', (value) => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- Jane Smith, CTO of InnovateCo', (value) => { })}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                        <CardContent className="pt-6">
                            <p className="italic">
                                {renderEditableText('"Scalable, reliable, and user-friendly. Everything we needed in one place."', (value) => { })}
                            </p>
                            <p className="font-semibold mt-4">
                                {renderEditableText('- Mike Johnson, Project Manager at BuildIt', (value) => { })}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    {renderEditableText('Ready to Get Started?', (value) => { })}
                </h2>
                <p className="mb-8">
                    {renderEditableText('Join thousands of satisfied customers and take your project to the next level.', (value) => { })}
                </p>
                <Button size="lg" className="transition-all duration-300 ease-in-out hover:scale-105">
                    {renderEditableText('Start Your Free Trial', (value) => { })}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>

            {selectedPlan && (
                <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {renderEditableText(`Subscribe to ${selectedPlan.name} Plan`, (value) => { })}
                            </DialogTitle>
                            <DialogDescription>
                                {renderEditableText(`You've selected the ${selectedPlan.name} plan. Please review the details below.`, (value) => { })}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <h3 className="font-semibold mb-2">
                                {renderEditableText('Plan Details:', (value) => { })}
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    {renderEditableText(`Price: ${formatPrice(isYearly ? selectedPlan.yearlyPrice / 12 : selectedPlan.monthlyPrice)}/${isYearly ? 'month (billed annually)' : 'month'}`, (value) => { })}
                                </li>
                                <li>
                                    {renderEditableText(`Billing Cycle: ${isYearly ? 'Annual' : 'Monthly'}`, (value) => { })}
                                </li>
                                <li>
                                    {renderEditableText(`Max Users: ${selectedPlan.maxUsers}`, (value) => { })}
                                </li>
                                <li>
                                    {renderEditableText(`Trial Period: ${selectedPlan.trialDays} days`, (value) => { })}
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                                {renderEditableText('Cancel', (value) => { })}
                            </Button>
                            <Button onClick={() => {
                                alert(`Thank you for subscribing to the ${selectedPlan.name} plan!`)
                                setSelectedPlan(null)
                            }}>
                                {renderEditableText('Confirm Subscription', (value) => { })}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <div className="mt-16">
                <h3 className="text-lg font-semibold mb-2">
                    {renderEditableText('Our Growth', (value) => { })}
                </h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                    {renderEditableText('Over 10,000 businesses trust our platform', (value) => { })}
                </p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-12">
                {renderEditableText('All plans come with a 30-day money-back guarantee.', (value) => { })}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="inline-block h-4 w-4 ml-1 mb-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {renderEditableText("If you're not satisfied, get a full refund within 30 days", (value) => { })}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </p>

            <footer className="mt-16 text-center text-sm text-muted-foreground">
                <p>
                    {renderEditableText('© 2023 Your Company Name. All rights reserved.', (value) => { })}
                </p>
                <div className="mt-2">
                    {renderEditableLink('Terms of Service', '#', (field, value) => { })} |
                    {renderEditableLink('Privacy Policy', '#', (field, value) => { })} |
                    {renderEditableLink('Contact Us', '#', (field, value) => { })}
                </div>
            </footer>
        </div>
    )
}