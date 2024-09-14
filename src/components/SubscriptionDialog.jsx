import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function SubscriptionDialog({ selectedPlan, setSelectedPlan, isYearly, isEditing, handlePlanEdit, buttons, handleButtonEdit }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(price)
    }

    if (!selectedPlan) return null

    return (
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? (
                            <input
                                type="text"
                                value={`Subscribe to ${selectedPlan.name} Plan`}
                                onChange={(e) => handlePlanEdit(selectedPlan.id, 'subscribeDialogTitle', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            />
                        ) : (
                            `Subscribe to ${selectedPlan.name} Plan`
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing ? (
                            <input
                                type="text"
                                value={`You've selected the ${selectedPlan.name} plan. Please review the details below.`}
                                onChange={(e) => handlePlanEdit(selectedPlan.id, 'subscribeDialogDescription', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            />
                        ) : (
                            `You've selected the ${selectedPlan.name} plan. Please review the details below.`
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <h3 className="font-semibold mb-2">
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue="Plan Details:"
                                onChange={(e) => handlePlanEdit(selectedPlan.id, 'planDetailsTitle', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            />
                        ) : (
                            'Plan Details:'
                        )}
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={`Price: ${formatPrice(isYearly ? selectedPlan.yearlyPrice / 12 : selectedPlan.monthlyPrice)}/${isYearly ? 'month (billed annually)' : 'month'}`}
                                    onChange={(e) => handlePlanEdit(selectedPlan.id, 'priceDetails', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                `Price: ${formatPrice(isYearly ? selectedPlan.yearlyPrice / 12 : selectedPlan.monthlyPrice)}/${isYearly ? 'month (billed annually)' : 'month'}`
                            )}
                        </li>
                        <li>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={`Billing Cycle: ${isYearly ? 'Annual' : 'Monthly'}`}
                                    onChange={(e) => handlePlanEdit(selectedPlan.id, 'billingCycleDetails', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                `Billing Cycle: ${isYearly ? 'Annual' : 'Monthly'}`
                            )}
                        </li>
                        <li>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={`Max Users: ${selectedPlan.maxUsers}`}
                                    onChange={(e) => handlePlanEdit(selectedPlan.id, 'maxUsersDetails', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                `Max Users: ${selectedPlan.maxUsers}`
                            )}
                        </li>
                        <li>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={`Trial Period: ${selectedPlan.trialDays} days`}
                                    onChange={(e) => handlePlanEdit(selectedPlan.id, 'trialPeriodDetails', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                />
                            ) : (
                                `Trial Period: ${selectedPlan.trialDays} days`
                            )}
                        </li>
                    </ul>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => !isEditing && setSelectedPlan(null)}>
                        {isEditing ? (
                            <input
                                type="text"
                                value="Cancel"
                                onChange={(e) => handlePlanEdit(selectedPlan.id, 'cancelButtonText', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            />
                        ) : (
                            'Cancel'
                        )}
                    </Button>
                    <Button onClick={() => {
                        !isEditing && window.location.href == buttons.confirmSubscription.href
                    }} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {isEditing ? (
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    value={buttons.confirmSubscription.text}
                                    onChange={(e) => handleButtonEdit('confirmSubscription', 'text', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    placeholder="Button text"
                                />
                                <input
                                    type="text"
                                    value={buttons.confirmSubscription.href}
                                    onChange={(e) => handleButtonEdit('confirmSubscription', 'href', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    placeholder="Button URL"
                                />
                            </div>
                        ) : (
                            buttons.confirmSubscription.text
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}