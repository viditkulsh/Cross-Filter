import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface MultiSelectProps {
    options: (string | number)[];
    selectedValues: (string | number)[];
    onChange: (values: (string | number)[]) => void;
    placeholder?: string;
}

const MultiSelect = ({ options, selectedValues, onChange, placeholder = "Select..." }: MultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        String(option).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleOption = (option: string | number) => {
        const newValues = selectedValues.includes(option)
            ? selectedValues.filter(val => val !== option)
            : [...selectedValues, option];
        onChange(newValues);
    };

    const handleClearAll = () => {
        onChange([]);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            >
                <span className="block truncate">
                    {selectedValues.length === 0
                        ? placeholder
                        : `${selectedValues.length} selected`
                    }
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {/* Search input */}
                    <div className="px-3 py-2 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>

                    {/* Clear all button */}
                    {selectedValues.length > 0 && (
                        <div className="px-3 py-2 border-b border-gray-200">
                            <button
                                onClick={handleClearAll}
                                className="flex items-center text-sm text-red-600 hover:text-red-800"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Options */}
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleToggleOption(option)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-orange-50"
                        >
                            <span className="block truncate">{String(option)}</span>
                            {selectedValues.includes(option) && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <Check className="h-5 w-5 text-orange-600" />
                                </span>
                            )}
                        </div>
                    ))}

                    {filteredOptions.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No options found
                        </div>
                    )}
                </div>
            )}

            {/* Selected values display */}
            {selectedValues.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {selectedValues.slice(0, 3).map((value) => (
                        <span
                            key={value}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800"
                        >
                            {String(value)}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleOption(value);
                                }}
                                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-orange-400 hover:bg-orange-200 hover:text-orange-500"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                    {selectedValues.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            +{selectedValues.length - 3} more
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
