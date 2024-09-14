import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import CurrencySelector from '@/components/CurrencySelector'
import PlanToggle from '@/components/PlanToggle'
import PlanCards from '@/components/PlanCards'
import FeatureComparison from '@/components/FeatureComparison'
import AdditionalFeatures from '@/components/AdditionalFeatures'
import FAQSection from '@/components/FAQSection'
import PromoCodeSection from '@/components/PromoCodeSection'
import CustomerReviews from '@/components/CustomerReviews'
import CallToAction from '@/components/CallToAction'
import SubscriptionDialog from '@/components/SubscriptionDialog'
import GrowthIndicator from '@/components/GrowthIndicator'
import Footer from '@/components/Footer'

import plansData from '../data/plans'
import additionalFeaturesData from '../data/additionalFeatures'
import currenciesData from '../data/currenciesData'
import faqsData from '../data/faqsData'
import reviewsData from '../data/reviewsData.js'

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
    const [reviews, setReviews] = useState(reviewsData)

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            <Header pageTitle={pageTitle} setPageTitle={setPageTitle} isEditing={isEditing} setIsEditing={setIsEditing} />
            <CurrencySelector currency={currency} currencies={currencies} handleCurrencyChange={handleCurrencyChange} isEditing={isEditing} addCurrency={addCurrency} removeCurrency={removeCurrency} handleCurrencyEdit={handleCurrencyEdit} />
            <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} isEditing={isEditing} />
            <PlanCards plans={plans} isYearly={isYearly} currency={currency} isEditing={isEditing} handlePlanEdit={handlePlanEdit} handleFeatureEdit={handleFeatureEdit} setSelectedPlan={setSelectedPlan} addPlan={addPlan} removePlan={removePlan} addFeature={addFeature} removeFeature={removeFeature} />
            <FeatureComparison showComparison={showComparison} setShowComparison={setShowComparison} plans={plans} isEditing={isEditing} handleFeatureEdit={handleFeatureEdit} />
            <AdditionalFeatures additionalFeatures={additionalFeatures} isEditing={isEditing} handleAdditionalFeatureEdit={handleAdditionalFeatureEdit} addAdditionalFeature={addAdditionalFeature} removeAdditionalFeature={removeAdditionalFeature} />
            <FAQSection faqs={faqs} isEditing={isEditing} handleFaqEdit={handleFaqEdit} addFaq={addFaq} removeFaq={removeFaq} />
            <PromoCodeSection buttons={buttons} isEditing={isEditing} handleButtonEdit={handleButtonEdit} />
            <CustomerReviews reviews={reviews} isEditing={isEditing} />
            <CallToAction buttons={buttons} isEditing={isEditing} handleButtonEdit={handleButtonEdit} />
            <SubscriptionDialog selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} isYearly={isYearly} isEditing={isEditing} handlePlanEdit={handlePlanEdit} buttons={buttons} handleButtonEdit={handleButtonEdit} />
            <GrowthIndicator progress={progress} isEditing={isEditing} />
            <Footer isEditing={isEditing} />
        </div>
    )
}