import React from 'react';

interface SizeCardProps {
    quantity: number;
    orginalQuantity: number;
    onQuantityChange: (quantity: number) => void; // Handler to notify parent
    isSelected: boolean; // Prop to check if the current quantity is selected
}

export default function SizeCard({ quantity, orginalQuantity, onQuantityChange, isSelected }: SizeCardProps) {
    return (
        <label className="radio">
            <input 
                type="radio" 
                name="radio" 
                checked={isSelected} // Set checked state
                onChange={() => onQuantityChange(quantity)} // Notify parent on change
            />
            <span className="name">{quantity}ml</span>
        </label>
    );
}

